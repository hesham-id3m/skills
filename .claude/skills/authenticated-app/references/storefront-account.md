# Storefront customer account

Customer post-login navigation should complement storefront, not replace shopping UI:
- Account overview with meaningful links (orders, wishlist, profile/settings)
- Orders list + order detail only with API or clearly labeled sample DEMO orders; no false shipped/delivered status as actual customer history
- Wishlist only if items can be added/removed and persisted locally (or via API); reuse catalog IDs, image URLs and product detail links
- Addresses only if delivery/checkout user journey needs them; no fake save-to-server confirmation
- Profile settings reuse global locale/theme; real contact updates require API
- Cart remains accessible independently; do not block cart behind demo login

Check item-to-detail route, order-to-detail route, empty wishlist/orders, logout/exit, mobile account nav and RTL. Never imply real payment/order placement without backend.
