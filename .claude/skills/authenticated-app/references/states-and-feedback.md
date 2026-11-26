# Signed-in UX states

Every data-driven page needs: initial loading, empty with next action, data loaded, recoverable API/network error, unauthorized/expired, forbidden, and not found where applicable. Don't show fake toast success.

- Keep visible state distinctions stable across navigation; do not flash personal screens before session resolution.
- If a form modifies remote data, show real server result or clearly state that it is a local demo.
- For DEMO preview, label sample account/order data in header and page, and provide exit to public area.
- Show disabled or integration-pending actions explicitly instead of dead controls.
- Accessibility: `aria-live` for form states, focus management after route changes, visible focus, semantic headings, predictable Back and breadcrumb behavior.
