# Profile

- User identity comes only from a verified current-user API; if absent, use an unmistakable DEMO profile and never reuse fake identity as real authenticated user.
- Display only fields relevant to the brief or API (name, email, phone, avatar, etc.); no mandatory address/DOB/national ID without business need.
- Editing uses inline validation, dirty-state/cancel/reset, save progress, success only when API confirms persistence. In preview mode use an explicitly local-only editor or read-only example with 'DEMO — changes not saved to server'.
- Treat avatar and personal data with care; accessible controls and clear error feedback. Adapt labels and formatting for AR/EN and RTL/LTR.
