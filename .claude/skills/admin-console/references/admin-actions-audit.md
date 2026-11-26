# Privileged actions, audit and feedback

- Action menus group safe View/Edit before destructive Disable/Delete. Confirmation dialog identifies target and impact. Sensitive operations often require server-side reauthorization or stronger verification if backend specifies it.
- Permissions should be checked on backend per request; UI handles 401 (expired), 403 (denied), 409 (conflict), 422 (validation), 5xx retry. Handle optimistic update rollback if used.
- Real audit history must come from server-generated immutable records. Frontend cannot manufacture an audit trail; DEMO event samples are labeled as such.
- Activity entry should contain event type, actor ID/display if authorized, target, timestamp and outcome when API provides them. Controls for filter by event/date where helpful.
- Feedback is precise: `Role changed` only after server ack; preview says `Demo role changed locally; not saved to server`.
- Explicit cancel/close, data refresh, stale data and permission-change mid-session handling. Tests should include denied action and failure feedback, not only happy path.
