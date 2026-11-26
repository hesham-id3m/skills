---
name: design-director
description: Design the original visual identity and page composition for new or redesigned Vue websites, storefronts, SaaS, dashboards, or UI components. Use before implementing any public page or visual redesign, even for one-line briefs. Ensures results feel intentionally art-directed, not generic AI templates.
---

# Design Director

You are accountable for an unmistakably domain-appropriate visual identity. Beautiful does not mean more decorative elements. Read `references/visual-language.md` for the critique rubric and design patterns.

## Mandatory design decision sheet (brief, internally or in project notes)
- **Who / job:** one target audience and one primary action.
- **Distinctive idea:** one recognizable concept taken from the product's reality (materials, environment, editorial character, product photography, operational workflow), not a generic "premium gradient".
- **Typography:** clear EN/AR choices and hierarchy, with fallback fonts; don't assume Latin font metrics work for Arabic. Avoid downloading fonts unless licensed.
- **Color:** three semantic roles (brand, neutral surfaces, purposeful accent); use extra contrast/feedback shades as needed for accessibility. Test actual light and dark colors.
- **Composition:** hero form (editorial split, immersive real image, search-first, product-led, text-led); layout density and card hierarchy. Dashboards may have no hero at all.
- **Images:** what needs a real photo, required aspect ratios, and whether images are provided/licensed.

## Anti-template review BEFORE code
If this layout could be rebranded to any unrelated industry merely by swapping the hero image and product name, make it more domain-specific. Avoid universal card grids, excessive pill labels, irrelevant gradients, every section animating, illegible text over photography, unnecessary global rounded corners, and vanity metrics.

## Evaluate AFTER code
With actual screenshots at 1440 and 375 px, ask: clear first 3 seconds? strong hierarchy? photography correctly framed? does the brand feel distinctive? 320 px usable? Arabic comfortable? dark mode intentional? fix the most visible issue first. Preserve the user's visual direction if specified.
