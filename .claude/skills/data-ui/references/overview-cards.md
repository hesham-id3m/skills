# Overview and KPI cards

## Purpose before decoration
- Define who is looking at the overview and what decision they make within 10 seconds. Example: customer sees orders requiring attention; operator sees pending requests; admin sees access-review queue. No generic statistics unrelated to work.
- Preferred hierarchy: short page title/description and main action → 2–4 meaningful responsive KPI cards → primary table/queue → secondary information. Sections can change based on archetype.
- Cards: short label, one strong value (or `—` for unavailable), clear date/scope, optional small trend only if comparison interval is real, one useful next action. Use one visual emphasis, not random gradients or icon-filled banners.
- For no real data, choose honest zero/unknown values or a consistently labeled SAMPLE dataset; do not invent revenue or user counts as live facts. Never mix DEMO and real counts without labels.
- Use subtle borders, generous vertical rhythm, alignment of card heights, muted support text, sober semantic color only for status; no floating noisy cards or giant chart for 4 sample records.
- Client account: orders/saved items/recent activity are okay if actually in scope; not administrative KPIs. Admin: actionable operational metrics (e.g. pending approvals) only when domain and data support them.
- Loading: skeleton placeholders matching final card size; unavailable: explicit status, don't render a fake 0 that implies no records.
