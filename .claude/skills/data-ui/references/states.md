# Loading, empty, error, denied and partial states

- Every data widget has explicit `loading | ready | empty | error` behavior, and partial or stale state where relevant.
- Skeletons mirror table/card geometry; do not show invented metrics as loading stand-ins.
- Empty-new: explain why empty and the useful next action; empty-filtered: Clear filters; error: concise reason + Retry; forbidden: no access + contextual return route; expired: reauthenticate; preview: clearly say SAMPLE/DEMO.
- Toast severity matches result, includes human-readable next step. No silent success, no generic `Something happened`.
- A destructive dialog cannot close with success feedback until mutation genuinely succeeds; on 403 keep context and show access denied.
- Test keyboard, screen readers, mobile RTL and color-blind friendly status labels.
