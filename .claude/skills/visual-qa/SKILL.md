---
name: visual-qa
description: Run build, browser, RTL/LTR, responsive, theme, link, cart and screenshot quality verification for generated Vue Vuetify frontend projects. Use before delivering any frontend project, after major redesigns, or when diagnosing visual/functional regressions.
---

# Quality Gate — Code + Browser + Eyes

Use workspace root `tools/verify.sh <project-path>` as entrypoint. It runs the copied starter's existing scripts; do NOT generate a new test harness unless actual coverage is demonstrably missing. Check `tools/verify.sh --help`. It fails when build/browser checks fail and labels skipped checks as such.

## Always verify
1. `npm run build` (typecheck included if configured); lint if available.
2. Browser harness (if present), starting preview once. Test 320/375/768/1440 px widths in both locales and themes, real drawer/anchors/routes/form states, console errors, overflow. If the harness covers fewer cases, clearly report missing ones.
3. For public photo-driven pages, `tools/assets.py audit` plus **visual review** of hero/product screenshots. Real photographic assets, relevance, subject crop, no blank cards; correct license/credit tracking.
4. Critical interactions per archetype: product filters, cart, form validation, auth honest responses, service CTA real targets; no fake success.
5. Design review: 0–5 on distinctiveness, media/data hierarchy, typography, spacing, accessible responsive states. Target at least 20/25; any category <=2 is a fix before claiming a wow-quality result. Save evidence/notes with screenshots and scorecard where available.

## Screenshot review workflow
- Inspect the actual screenshot/image (do not assume build success implies visual correctness). Fix top 1–3 visible flaws per iteration, avoid unlimited redesign cycles. Use existing browser tool if screenshots aren't produced by the starter harness.
- Accessibility: keyboard focus, semantic labels, touch targets, reduced motion. Arabic content really RTL, physical logo/actions positions respected.
- `UNVERIFIED` is an acceptable honest label if browser unavailable. Do not claim that missing browser inspection passed.

## Efficient output
Report PASS/FAIL/SKIPPED per gate and relevant log path. Never paste enormous build/browser dumps into context; use summary and tail on error. No commits or pushes.

## Authenticated application QA (v10.1)
When account/internal routes exist, extend existing browser verification instead of reinventing a harness:
- Route from public landing to Login/Signup, valid/invalid form states, correct API failure or explicit DEMO preview entry
- Deep link to internal route unauthenticated: redirect, forbidden or preview-only handling as specified; no private API data leaked
- Internal navigation, profile/settings, domain list→detail, role visibility where supplied; logout (or exit preview) and refresh/back behavior
- Test 320/375/768/1440, EN/AR RTL, light/dark and keyboard navigation; check console and network errors
- Never label DEMO preview as successful authentication or a secure protected area. Report whether checks actually ran.

## Data Experience + Admin QA (v10.2)
- Dashboard Overview: card figures derived from actual or clearly DEMO source; check long names, zero and loading values, focus, layout at 320/375/768/1440 and AR RTL/dark.
- Table: search, column sort, filters, reset, pagination, empty filtered vs empty total, row details, keyboard and mobile alternative.
- Dialogs: view, edit, confirm destructive action, invalid input, cancel, error, no duplicate submit; feedback says local-only in DEMO.
- Admin: test permission matrix for reader/editor/admin as applicable; unauthorized deep link and hidden action, 401/403, role assignment, admin/customer layout separation. Never call frontend-only gating secure RBAC.
- Evidence: screenshot dashboard first paint, table filtered, open action menu, open edit dialog and confirmation in RTL/dark. If unavailable mark UNVERIFIED.
