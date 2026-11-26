---
name: business-site
description: Build visually distinctive public websites, company pages, service landing pages, agency sites and portfolios using Vue Vuetify. Use for marketing/public websites that are not e-commerce or internal dashboards.
---

# Public Website Archetype

- First identify credible service, audience, primary action. Design a substantial above-the-fold composition specific to the service, not a universal gradient + cards.
- Usually one Home route with 2–4 meaningful anchored sections, optional true Services/About views where brief warrants. Header and footer populated with real links.
- Relevant licensed photos only where useful; some products are better showcased through original typography or real interactive UI than stock photos. Do not invent real testimonials, certifications, statistics, clients, socials or addresses.
- Contact action only if a genuine route/channel is configured; otherwise a valid on-page CTA. No false form submission.
- Auth is NOT automatic for corporate sites. UI bilingual and responsive with intentional dark mode.

## Accounts and client portals (v10.1)
Do NOT add Login/Signup or a post-login area to ordinary informational company websites. If the user actually asks for a member/client portal, activate `authenticated-app` and build only portal workflows relevant to the brief; use explicit demo preview in the absence of APIs.
