# Actions, forms, dialogs, popovers, feedback

Use the smallest sensible interaction: navigate for lengthy forms, `v-dialog` for short create/edit/confirmation, `v-menu` for row actions, `v-tooltip` only when useful. Don't stack a dialog inside another dialog.

## Standard dialog contract
- Title names entity/action; a concise explanation if a destructive/irreversible effect.
- Body contains labeled fields with required indicators and field-level validation. Pre-fill edit forms, reset on cancel, and don't destroy unsaved changes without warning when it matters.
- Footer has clear Cancel + verb-specific primary CTA (e.g. Save changes / Archive user). Dangerous changes use a visually distinct destructive CTA and explicit confirmation.
- Async: disable repeated submit, show progress and correct server errors (403/409/422/500), preserve input on failure, close only on actual success. Focus lands in dialog; Escape/cancel works; focus returns to trigger.
- Feedback: snackbar/toast with meaningful result, not fake success. For DEMO-only changes, say `Demo change — not saved to a server` instead of `Saved`.
- Permissions: hidden/disabled based on provided capabilities; API still enforces authorization. Explain denied actions rather than allowing click to lead to a fake success.

## Action vocabulary
- Row primary action is View when a real detail route exists; edit in menu/modal; destructive Archive/Delete requires confirmation; bulk actions show selection count and confirmation where needed.
- Never add action buttons to satisfy a checklist if no behavior exists. Confirm routes, labels, effects, test keyboard and mobile placements.
