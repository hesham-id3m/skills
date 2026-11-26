# Signup page — independent spec

- Include only when self-registration is permitted or when user requested a storefront account UI prototype. Use starter view/validation instead of re-implementing shared form state.
- Field set derived from actual backend contract; for demo keep it minimal (name/email/password/confirmation where appropriate), accessible labels and consent only if meaningful.
- Validate password rules and confirmation without displaying or logging secrets. Show honest backend-unavailable status; no fake account creation.
- Link to real login route, support EN/AR and mobile/dark.

## After signup
- If backend signup exists: navigate only after the actual API outcome and any required verification. Do not invent automatic sign-in.
- If backend absent: show honest unavailable message and a separate demo preview entry where useful; no false account creation.
