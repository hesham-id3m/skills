# Frontend Studio — evaluation scorecard

Compare projects with identical brief, model, external capabilities, template version and tool budget. Record every value from actual output; don't estimate elapsed time if not measured.

| Dimension | Score 0–5 | Evidence |
|---|---|---|
| Brand distinctiveness & domain fit | | Screenshot + design sheet |
| Hero / product imagery OR dashboard information hierarchy | | Screenshot, license manifest or data review |
| Typography & visual hierarchy | | Desktop and mobile screenshot |
| UI consistency, spacing & restraint | | Component screenshots |
| Mobile, RTL, dark & accessibility | | 320px/375px/1440px screenshots, interaction tests |
| **Total /25** | | Goal >=20; any <=2 triggers redesign |

## Independent pass/fail checks

- Build: PASS / FAIL / UNVERIFIED
- Browser/flows: PASS / FAIL / UNVERIFIED (which routes, locales, widths, interactions?)
- Images: PASS / FAIL / NOT_APPLICABLE / UNVERIFIED (real imagery, subject, usage rights)
- Fake backend success/claims: NONE / FOUND
- Time measured (start→end): ___
- Rework: __ compile-error loops; __ bespoke helper scripts; __ failed fetch requests
- Context limits, 422, 5xx: ___
- User impression (0–5): ___

Compare the same prompt in isolated output folders; include actual screenshots and logs. Never equate a high design score with working software.

## Signed-in experience extension (v10.1)
Score 0–5 each, separately from the original visual scorecard:
1. **Appropriate scope**: no unnecessary accounts for brochures; right customer vs SaaS vs admin pages.
2. **Auth honesty/security boundary**: no fake successful sign-in; no claims that demo/guards provide server protection.
3. **Post-login task completeness**: account/workspace pages with actual routes and meaningful interactions.
4. **Navigation/states**: direct links, return paths, logout/exit, loading/empty/error and forbidden/expired if relevant.
5. **Responsive/i18n**: 320px, mobile navigation, Arabic RTL and light/dark on internal pages.

Review both with and without backend API; do not score preview as real authentication.

## v10.2 data experience addendum (assess independently)
- **Overview usefulness (0–5):** KPI meaning, source, scope, scannability, actionable queue; no vanity metrics.
- **Data table usability (0–5):** search/sort/filter/page, status semantics, mobile, empty/error.
- **Actions and dialogs (0–5):** correct verbs, validation, cancel, confirmation, accurate success/error feedback.
- **Admin RBAC UX (0–5, N/A if no admin):** distinct admin surface, capabilities and role assignment, 403 state; backend security separately verified.
- **Bilingual design quality (0–5):** screenshot-based spacing/hierarchy, RTL, dark/light and 320px.
Only report scores for visually/behaviorally inspected pages. A passing build is not a visual score.
