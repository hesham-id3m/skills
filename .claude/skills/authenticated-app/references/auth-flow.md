# Auth / signup / logout / preview navigation

## Real backend provided
- Map actual login, signup (if supported), current-user (`me`) and logout endpoints only from supplied API docs. Never guess URL/path or cookie/token format.
- Route to appropriate landing after authenticated session is verified. Store pending destination only if same-origin local route and validation permits it. Do not allow arbitrary external redirect targets.
- Protect route UX with router guards and a resolved loading state. The backend MUST still authorize every API resource/action; a client route guard is not security.
- Handle expired sessions and forbidden routes differently. Show a meaningful retry/sign-in/return action.
- Logout should invoke real session invalidation where provided, clear client state appropriately, and prevent displaying private cached account data.

## Frontend without an auth API
- The Login and Signup primary actions show an honest 'Authentication is not connected' message after validation. No fake token/session/account or fabricated signup success.
- Offer an explicitly separate 'Preview account area (DEMO)' button/link if internal pages need to be showcased.
- The preview is NOT a signed-in user. It may use sessionStorage for a short-lived demo-only navigation flag; never store a password, ID token or fake API auth token.
- Display prominent DEMO label on internal screens, use sample data clearly marked DEMO, and provide 'Exit demo preview' that returns to the public site.
- Don't hide/paywall sensitive content behind a preview-only route, and do not label preview guards as secure authentication.

## Required test paths
- Direct deep-link before verified auth/preview, real login failure state, preview entry and exit, refreshing internal page, missing route, logout/expired flow, browser Back, EN/AR and light/dark.
