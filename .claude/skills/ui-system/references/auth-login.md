# Login page — independent spec

- Use existing starter login view and shared auth shell. Show brand, localized welcome, email/username as required, password with visibility toggle, inline validation, loading/error states and working routes.
- Password `autocomplete=current-password`; email `autocomplete=username`. Don't store password in localStorage or querystrings. Keyboard submit works.
- Only show signup or recovery links when the corresponding feature/route exists.
- If backend missing, validate fields then clearly say "Sign-in is not connected" instead of creating fake sessions or reporting success.
- At 320px, AR/EN, dark/light ensure the form remains readable and navigable.

## After submit
- If auth API exists: route only after verified success, to the role/domain-appropriate internal destination. Respect only safe internal return URLs.
- If no auth API: retain honest unavailable response. Offer a **separate** “Preview account area (DEMO)” action if `.claude/skills/authenticated-app` supplied sample internal pages; never make the sign-in button simulate success.
- Show route back and recovery; after actual session expiry allow safe re-authentication.
