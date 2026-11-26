# Tables, list toolbars and filters

- Default desktop layout: panel heading + optional count + one contextual primary action; toolbar search, 1–3 highest-value filters, optional sort/columns; table of essential columns, row status chips and an actions menu; pagination or virtual list as data size warrants.
- `v-data-table` for client-side small collections, `v-data-table-server` for backend pagination. Ensure stable `item-value`, real `items-length`, deterministic sorting and page reset when query changes. No hidden fake data.
- Show filters currently applied and clear-filter action. Search matches meaningful fields, not every arbitrary property. Debounce remote calls; cancel stale queries. Preserve query state in URL for pages expected to be revisited/shared.
- Prefer action menu (View, Edit, Archive) in each row. Destructive actions are not the first/default control; confirmation dialog states entity and effect. Do not show commands user lacks permission for.
- Empty filtered state differs from no records and from failed network request. Provide distinct copy/actions for all three.
- Responsive: hide low-priority columns at <=600px or switch to structured row cards; keep row's most important ID/status/action visible. Avoid body horizontal overflow and tiny unclickable action icons.
- Left/right align numeric cells consistently, prevent awkward wraps for IDs/currency, preserve RTL context but use `dir=ltr` for code/IDs when needed. Color is not sole status indicator.
- Keyboard focus, table caption/accessible labels, action menu accessible; tests cover filtering, pagination, sort, details, no results and a permissions-hidden action.
