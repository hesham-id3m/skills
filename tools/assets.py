#!/usr/bin/env python3
"""Frontend Studio v10: small, human-reviewed Wikimedia photo procurement.

Usage: assets.py discover PLAN --out DIR
       assets.py select CANDIDATES SELECTIONS --out DIR
       assets.py audit MEDIA_MANIFEST

Uses only Python stdlib. Photos require manual visual/licensing review.
"""
import argparse
import html
import json
import os
from pathlib import Path
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request

API = "https://commons.wikimedia.org/w/api.php"
UA = "FrontendStudio/10.0 (reviewed Wikimedia Commons photo procurement; educational demo)"
MIMES = {"image/jpeg": ".jpg", "image/png": ".png", "image/webp": ".webp"}

def slug(text):
    safe = re.sub(r"[^a-zA-Z0-9_-]", "-", str(text)).strip("-")
    if not safe or safe in (".", ".."):
        raise ValueError("Invalid asset ID: " + repr(text))
    return safe.lower()

def fetch(url, retries=1, maxbytes=10_000_000):
    error = None
    for attempt in range(retries + 1):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "application/json,image/*;q=0.9"})
            with urllib.request.urlopen(req, timeout=18) as response:
                payload = response.read(maxbytes + 1)
                if len(payload) > maxbytes:
                    raise ValueError("response too large")
                return payload
        except (urllib.error.HTTPError, urllib.error.URLError, TimeoutError, OSError) as exc:
            error = exc
            if attempt < retries:
                time.sleep(1.1 * (attempt + 1))
    raise RuntimeError(f"fetch failed: {error}")

def clean(raw):
    return html.unescape(re.sub(r"<[^>]*>", "", str(raw))).strip()

def metadata(info, key):
    return clean((info.get("extmetadata") or {}).get(key, {}).get("value", ""))

def approved(license_name):
    x = license_name.casefold().replace("_", " ").strip()
    if any(x.find(bad) >= 0 for bad in ["-nc", "-nd", "noncommercial", "no derivatives", "all rights reserved"]):
        return False
    return bool(re.search(r"\bcc0\b|\bpublic domain\b|\bpd[- ]|\bcc[- ]by(?:[- ]sa)?\b", x))

def search_commons(query, limit):
    params = {
        "action": "query", "format": "json", "generator": "search",
        "gsrsearch": query, "gsrnamespace": "6", "gsrlimit": str(limit),
        "prop": "imageinfo", "iiprop": "url|mime|size|extmetadata",
        "iiurlwidth": "1100",
    }
    url = API + "?" + urllib.parse.urlencode(params)
    data = json.loads(fetch(url, maxbytes=3_000_000))
    pages = (data.get("query") or {}).get("pages") or {}
    result = []
    for p in pages.values():
        info = (p.get("imageinfo") or [{}])[0]
        mime = info.get("mime")
        lic = metadata(info, "LicenseShortName")
        if mime not in MIMES or not approved(lic):
            continue
        width = int(info.get("width") or 0)
        height = int(info.get("height") or 0)
        if width < 600 or height < 380:
            continue
        url = info.get("thumburl") or info.get("url")
        if not url or not url.startswith("https://"):
            continue
        result.append({
            "title": p.get("title", ""), "url": url,
            "description_url": info.get("descriptionurl", ""), "mime": mime,
            "license": lic, "license_url": metadata(info, "LicenseUrl"),
            "artist": metadata(info, "Artist")[:500],
            "credit": metadata(info, "Credit")[:500],
            "width": width, "height": height,
        })
    # favor sufficient resolution and reasonable landscape/square proportions
    result.sort(key=lambda v: (v["width"] >= 1000, v["width"] * v["height"]), reverse=True)
    return result

def discover(args):
    plan = json.loads(Path(args.plan).read_text(encoding="utf-8"))
    items = plan.get("assets")
    if not isinstance(items, list) or not items or len(items) > args.max_assets:
        raise ValueError(f"plan must contain 1–{args.max_assets} assets")
    seen = set()
    out = {"source": "Wikimedia Commons", "assets": {}}
    for item in items:
        key = slug(item["id"])
        if key in seen:
            raise ValueError("duplicate asset id: " + key)
        seen.add(key)
        query = str(item.get("query", "")).strip()
        if not query:
            raise ValueError("empty query for " + key)
        candidates = []
        try:
            candidates = search_commons(query, args.candidates)
            if not candidates:
                print(f"WARN {key}: no matching licensed photographs; try a more precise query", file=sys.stderr)
        except Exception as exc:
            print(f"WARN {key}: {exc}", file=sys.stderr)
        out["assets"][key] = {"query": query, "role": str(item.get("role", "card")),
                               "alt": str(item.get("alt", key)), "candidates": candidates}
        print(f"{key}: {len(candidates)} candidates")
    output = Path(args.out)
    output.mkdir(parents=True, exist_ok=True)
    (output / "candidates.json").write_text(json.dumps(out, indent=2, ensure_ascii=False), encoding="utf-8")
    parts = ["<!doctype html><html lang='en'><meta charset='utf-8'><title>Photo candidate review</title>",
             "<style>body{font:15px system-ui;margin:2rem;background:#f8faf8;color:#18241b}section{margin:2rem 0}",
             ".grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:16px}",
             "article{background:white;padding:12px;border:1px solid #ddd;border-radius:8px}",
             "img{width:100%;aspect-ratio:4/3;object-fit:cover}small{display:block;overflow-wrap:anywhere}</style>",
             "<h1>Photo review · choose correct subjects before download</h1>"]
    for key, item in out["assets"].items():
        parts.append("<section><h2>" + html.escape(key) + " — " + html.escape(item["query"]) + "</h2><div class='grid'>")
        for i, c in enumerate(item["candidates"]):
            source = html.escape(c["description_url"], quote=True)
            thumb = html.escape(c["url"], quote=True)
            parts.append(f"<article><img src='{thumb}' alt='candidate' loading='lazy'>"
                         f"<strong>index {i}</strong><small>{html.escape(c['title'])}</small>"
                         f"<small>{html.escape(c['license'])} — {c['width']}×{c['height']}</small>"
                         f"<a target='_blank' rel='noopener' href='{source}'>Open source and verify rights</a></article>")
        parts.append("</div></section>")
    parts.append("</html>")
    (output / "contact-sheet.html").write_text("\n".join(parts), encoding="utf-8")
    print("Review:", output / "contact-sheet.html")
    print('Then create selections.json such as {"hero":0,"apples":1} and run select.')

def select(args):
    candidates = json.loads(Path(args.candidates).read_text(encoding="utf-8"))
    choices = json.loads(Path(args.selections).read_text(encoding="utf-8"))
    output = Path(args.out)
    output.mkdir(parents=True, exist_ok=True)
    records = []
    errors = []
    for key, index in choices.items():
        item = candidates.get("assets", {}).get(key)
        if item is None or type(index) is not int or index < 0 or index >= len(item["candidates"]):
            errors.append(f"{key}: invalid selection")
            continue
        c = item["candidates"][index]
        if not approved(c["license"]) or c["mime"] not in MIMES:
            errors.append(f"{key}: license/mime not allowed")
            continue
        ext = MIMES[c["mime"]]
        name = slug(key) + ext
        try:
            content = fetch(c["url"], retries=1, maxbytes=8_000_000)
            if len(content) < 2000 or (ext == ".jpg" and content[:3] != b"\xff\xd8\xff") or (ext == ".png" and content[:8] != b"\x89PNG\r\n\x1a\n") or (ext == ".webp" and content[8:12] != b"WEBP"):
                raise ValueError("download is not a valid raster photograph")
            (output / name).write_bytes(content)
            records.append({"id": key, "file": name, "alt": item["alt"],
                            "description_url": c["description_url"], "image_url": c["url"],
                            "creator": c["artist"], "credit": c["credit"],
                            "license": c["license"], "license_url": c["license_url"],
                            "reviewed_subject": False})
            print("Downloaded", name, "— check visually + credit terms")
        except Exception as exc:
            errors.append(f"{key}: {exc}")
    path = output / "media-manifest.json"
    path.write_text(json.dumps({"assets": records, "human_visual_review_required": True},
                               ensure_ascii=False, indent=2), encoding="utf-8")
    for err in errors:
        print("ERROR", err, file=sys.stderr)
    print("Manifest:", path)
    if errors:
        sys.exit(2)

def audit(args):
    path = Path(args.manifest)
    data = json.loads(path.read_text(encoding="utf-8"))
    records = data.get("assets", [])
    if not records:
        print("FAIL: no selected images in manifest", file=sys.stderr)
        sys.exit(2)
    errors = []
    for record in records:
        f = path.parent / Path(record.get("file", "")).name
        if (not f.exists()) or f.stat().st_size < 2000:
            errors.append(f"missing or empty asset: {f}")
        if not approved(record.get("license", "")) or not record.get("description_url"):
            errors.append(f"missing/unsupported license or source: {f}")
        if not record.get("alt"):
            errors.append(f"missing alt: {f}")
    for err in errors:
        print("FAIL:", err, file=sys.stderr)
    print(f"File/license check: {len(records) - len(errors)}/{len(records)} (human visual review still required)")
    if errors:
        sys.exit(2)

def main():
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = parser.add_subparsers(dest="command", required=True)
    p = sub.add_parser("discover", help="Find licensed raster candidates and create a visual contact sheet")
    p.add_argument("plan")
    p.add_argument("--out", required=True)
    p.add_argument("--candidates", type=int, default=6)
    p.add_argument("--max-assets", type=int, default=9)
    p.set_defaults(func=discover)
    p = sub.add_parser("select", help="Download manually selected candidates + provenance manifest")
    p.add_argument("candidates")
    p.add_argument("selections")
    p.add_argument("--out", required=True)
    p.set_defaults(func=select)
    p = sub.add_parser("audit", help="Verify local asset files/attribution metadata")
    p.add_argument("manifest")
    p.set_defaults(func=audit)
    args = parser.parse_args()
    if getattr(args, "candidates", None) is not None and args.command == "discover" and not 1 <= args.candidates <= 15:
        parser.error("--candidates must be 1–15")
    if args.command == "discover" and not 1 <= args.max_assets <= 60:
        parser.error("--max-assets must be 1–60")
    args.func(args)

if __name__ == "__main__":
    try:
        main()
    except (ValueError, KeyError, OSError, json.JSONDecodeError) as err:
        print("ERROR:", err, file=sys.stderr)
        sys.exit(2)
