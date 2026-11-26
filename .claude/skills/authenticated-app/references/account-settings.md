# Account settings

Only create functional settings: locale, theme, notification preferences if a real/local implementation exists, password change only with supported auth endpoint; avoid dead toggles.

- Theme and locale MUST reuse existing shared settings/state; do not invent parallel account-only storage.
- Security controls (change password, revoke sessions, MFA) are API-dependent; if not wired, explicitly identify as unavailable integration, not a saved setting.
- Give clear save/cancel behavior; persistent settings should actually persist in the intended boundary (e.g. locale/theme locally).
- Include keyboard focus, state feedback, mobile and RTL review.
