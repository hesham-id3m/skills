# Quiet, organized dashboard visual system

Use project-wide design tokens, not a new palette invented inside the admin area.

- Backgrounds: low-chroma canvas; white or very subtle elevated surface cards in light mode, intentional slate/charcoal variants in dark. Subtle 1px outlines before drop shadows. Avoid primary color as a huge panel fill.
- Density: 8px spacing scale; page outer 24–32px desktop, 16px mobile; panel padding 16–24px; 12–20px gaps. Compact table rows ~44–56px with generous tap targets; rounded 10–14px panel radius unless approved reference differs.
- Typography: readable 14–16px body, 12–13px meta, semibold titles, a small set of headline sizes. Numeric KPI values should align and be scannable. Consistent bilingual font pair suitable for Arabic/Latin.
- One primary action per region; secondary actions quiet (outlined/tonal/text). Semantic colors for state and danger, not decoration. Make dark and light contrast accessible.
- Sidebar 240–280px desktop when navigation depth warrants; mobile uses responsive drawer. Sticky app header optional but must not double-cover content. No marketing hero on internal dashboards.
- Choose consistent alignment for nav, tables, forms and dialogs. Follow user-requested physical logo placement for public header. In Arabic flip appropriate flow/direction but never reverse amounts or IDs incorrectly.
- Motion is for feedback and transitions only; respect reduced motion. Drawers and dialogs should feel crisp, not animated on every card.
