---
name: ui-system
description: Build or modify the shared Vue 3 Vuetify application UI system including brand tokens, app header, footer, navigation, fields, cards, forms, light/dark, Arabic RTL, English LTR, and auth screens. Use on every new frontend and all UI component work.
---

# Reusable UI System

Reuse installed Vue 3 `<script setup lang="ts">`, TypeScript, Vuetify 3, and Vue Router conventions. **Don't add React, Tailwind, Bootstrap or another design library.** Prefer semantic HTML within Vuetify layouts.

## Read references selectively
- Always when building shared shell: `references/header.md` and `references/footer.md`.
- Shared UI forms, cards, color tokens: `references/components.md`.
- Read `references/auth-login.md`, `references/auth-signup.md`, or `references/auth-forgot.md` separately only for pages in scope. Auth layout remains independently editable.

## Single source of truth
- One brand config for brand/name/logo, actual nav items and feature flags.
- One typed EN/AR dictionary with equal keys; changing locale updates content and HTML `lang`/`dir` consistently.
- One theme setting/toggler and Vuetify theme with persistent light/dark; avoid duplicate watchers or separate state per page.
- Design Director chooses the project visual identity. The starter offers logic and working structure, **not** the final look.

## Fail conditions
Empty shell, false links, untranslated text, theme change that doesn't work, dead drawer, horizontal scroll at 320px, logo/name on wrong physical side of header, fabricated backend result, images substituted with SVG product sketches, or claim of passed checks without running them.

## Post-login handoff (v10.1)
When a project has meaningful accounts, a member area, signed-in tools or profile/orders pages, read `.claude/skills/authenticated-app/SKILL.md` and the applicable references. `ui-system` owns reusable Login/Signup/Forgot form styling; `authenticated-app` owns actual destination routes, signed-in shell, navigation and access states. A UI-only Login/Signup **must not** silently create fake signed-in sessions. Preview flows must be distinctly labeled DEMO.
