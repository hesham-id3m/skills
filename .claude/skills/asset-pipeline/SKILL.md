---
name: asset-pipeline
description: Source, verify, attribute and download real licensed photographic media for Vue website heroes, product cards, grocery shops, storefronts and image-heavy marketing pages. Use when a frontend needs real photos or an existing project has broken/inappropriate imagery. Never replace photos with SVG product silhouettes.
---

# Real-photo Asset Pipeline

The shared helper `tools/assets.py` lives at **workspace root**. Use it as a black-box utility (`python3 tools/assets.py --help`) and inspect source only when troubleshooting a concrete bug. No fresh bespoke 200-line photo downloader each project.

## Source priority
1. User-supplied authentic photos/product catalog with permission to use.
2. Trusted licensed photo collection, with checked license/creator/URL metadata (Wikimedia Commons photo discovery helper provided).
3. Explicitly labeled photoreal generated photos only when an actual tool is available and appropriate. Do not claim photos exist just because a generator was suggested.

## Focused workflow
1. In project, author `assets-plan.json` with a **small set** of precise queries: typically one hero and 4–8 visible images. Use realistic object descriptions; avoid category queries that yield irrelevant stock shelves/people.
2. From the **workspace root** run `python3 tools/assets.py discover <project>/assets-plan.json --out <project>/.asset-review`.
3. Open `.asset-review/contact-sheet.html` in a browser and VISUALLY inspect subject, crop and brand/people interference. Read candidate summary JSON only for selected entries; don't dump 60 thumbnails to text context.
4. Write `.asset-review/selections.json` mapping `{ "hero": 0, "apples": 2 }` to the candidate index for each item. Then run `python3 tools/assets.py select <project>/.asset-review/candidates.json <project>/.asset-review/selections.json --out <project>/public/images`.
5. Run `python3 tools/assets.py audit <project>/public/images/media-manifest.json`. Use the actual local paths in cards/hero, with alt text and crop. Keep license/creator/source details in manifest and surface credit where required by license.

## Guardrails
- Discovery defaults to at most 9 assets × 6 candidates. One broad pass and at most one targeted retry; avoid endless image search. If no correct, licensed photo is found, report which exact asset failed and move on to other functionality. DO NOT call the image quality gate passed.
- Product image must accurately depict the named product; generic photos labeled DEMO cannot claim an actual SKU. Hero image must be appropriate to the brand, not merely technically raster.
- Never assume all web images have redistribution rights. Never hotlink expired/random URL endpoints or use SVG stand-ins. Honor CC license attribution/share-alike obligations and other legal limits.
- The helper's results are candidates, **not** proof of good design or permission for commercial use; review actual source/license and context before final acceptance.
