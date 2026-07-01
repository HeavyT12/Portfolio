# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Single-page personal portfolio for Tyson Farley. A **Vue 3 + Vuetify 4** SPA built with
**Vite**, state via **Pinia**, tested with **Vitest**. The site renders a career timeline;
the most common change is adding new timeline entries to the existing "Period" components.

## Commands

Run `npm` scripts through the **Bash tool** — PowerShell's execution policy blocks the
`.ps1` shims on this machine.

- `npm run dev` — Vite dev server (HMR).
- `npm run build` — production build to `dist/`.
- `npm run preview` — serve the built `dist/` locally (use to verify before deploying).
- `npm test` — Vitest (jsdom) over all `*.test.js`, single run.
- `npm run test:watch` — Vitest in watch mode.
- Single test file: `npx vitest run src/components/App/App.test.js`
- Single test by name: `npx vitest run -t "renders passed content"`
- `npm run lint` — ESLint (flat config, `eslint.config.js`) over `src/**/*.{js,vue}`.

## Imports & path alias

`@` is aliased to `src` (in both [vite.config.js](vite.config.js) `resolve.alias` and
honored by Vitest). **Always import with explicit `@/` paths**, e.g.
`import TyApp from '@/components/App/App.vue'`. (The old Webpack/Jest multi-root bare-path
resolution is gone.) Vuetify `v-*` components and directives are **auto-imported** by
`vite-plugin-vuetify` — never import them manually; only the `Ty*` wrappers are imported.

## Deployment (GitHub Pages via Actions)

Deploys are **automatic** through the [deploy workflow](.github/workflows/deploy.yml): every
push to `master` runs `npm ci` + `npm run build`, uploads `dist/` as a Pages artifact, and
publishes it with `actions/deploy-pages` — an **atomic** swap with no downtime. The repo's
Pages **Source must be set to "GitHub Actions"** (Settings → Pages); the workflow's
`actions/configure-pages` (`enablement: true`) also switches it on the first run.

**`dist/` is a build artifact — gitignored, not committed.** CI rebuilds it from source each
deploy, so there's no stale-`dist/` footgun and nothing to commit. `base: './'` in
[vite.config.js](vite.config.js) keeps built asset URLs relative so they resolve under the
`/Portfolio/` project subpath.

- To ship: merge/push to `master` and watch the run in the **Actions** tab. Manual runs are
  available via **workflow_dispatch** (Run workflow) on the same tab.
- Verify a build locally first with `npm run build && npm run preview`.
- The old `gh-pages` branch and the `git subtree push` technique are **retired** (that
  delete-then-recreate flow caused a brief 404 on every deploy). The `gh-pages` branch is
  now vestigial and can be deleted.

## Architecture

- **Entry & bootstrap**: [src/main.js](src/main.js) is the Vite entry referenced by the
  static [index.html](index.html). It `createApp(App)` ([src/App.vue](src/App.vue), the root
  shell), registers Pinia + the Vuetify plugin + the **Vue Router**
  ([src/router/index.js](src/router/index.js)), sets `app.config.errorHandler`
  (+ `window.onerror`), and mounts `#app`. A cookieless
  **Cloudflare Web Analytics** beacon (privacy-first, no consent banner) lives directly in
  `index.html`; visits are viewed in the Cloudflare dashboard (Web Analytics, site
  `heavyt12.github.io`). Static assets live in
  [public/resource/](public/resource/) and are referenced base-relative (`resource/logo.png`).

- **Vuetify plugin**: [src/plugins/vuetify.js](src/plugins/vuetify.js) calls
  `createVuetify({...})`. Custom light theme keyed to elemental color names (`fireRed`,
  `fireOrange`, `fireYellow`, `windGray`, `rainBlue`, `leafGreen`, `rockBrown`) under
  `theme.themes.light.colors`, which also alias the semantic slots (`primary`, `error`, …).
  Icons use the **MDI font** set (`@mdi/font`); icon names are `mdi-*`.

- **Component wrappers (`Ty*` convention)**: app-owned components wrap Vuetify primitives
  and are prefixed `Ty` (`TyApp`, `TyTimeline`, `TyTimelineItem`, `TyButton`, `TyIcon`,
  `TyImage`, `TyLink`, `TyContainer`, snackbar/dialog/overlay). Build on these wrappers
  rather than using `v-*` directly in pages. Each sets `inheritAttrs: false` and forwards
  with `v-bind="$attrs"` (in Vue 3, `$attrs` includes listeners — there is **no**
  `v-on="$listeners"`).

- **Routing & page composition**: the root [App.vue](src/App.vue) owns the persistent shell
  — `TyApp` (app-bar / footer / notification slots), the app-bar nav (logo + **Home** /
  **About** `TyButton`s with `:to`, which `v-btn` resolves against the router), the Contact
  `TyDialog`, and `SystemNotificationHub` — and renders `<router-view />` for the active
  page. Two routes ([src/router/index.js](src/router/index.js)): `home` (`/` →
  [Home.vue](src/pages/Home/Home.vue), just `PersonalHistory`) and `about` (`/about` →
  [About.vue](src/pages/About/About.vue), the bio page). The router uses
  **`createWebHashHistory`** (routes live under `…/Portfolio/#/about`) *deliberately*:
  GitHub Pages has no SPA fallback, so HTML5-history deep links / reloads would 404 — the
  hash keeps routing client-side with no `404.html` rewrite. New top-level pages = a new
  `pages/<Name>/<Name>.vue` + a route entry; new nav = a `TyButton :to` in `App.vue`.

- **Portfolio content lives in Period components**:
  [src/components/Period/<Employer>/<Employer>.vue](src/components/Period/) (e.g. `Domo`,
  `StateFoodSafety`). Each is a `TyTimeline` (with `title`, `website`, `colors`) containing
  `TyTimelineItem`s:

  ```html
  <TyTimelineItem :date="new Date('May 26, 2022')" title="Short Title">
      Free-text description of the milestone.
  </TyTimelineItem>
  ```

  `TyTimelineItem` auto-formats the date to "Month Year" and auto-collapses cards taller
  than `MAX_CARD_HEIGHT` (180px) behind an expand arrow. **Adding career entries = adding
  `TyTimelineItem`s to the relevant Period component**; register new Period components in
  [PersonalHistory.vue](src/components/PersonalHistory/PersonalHistory.vue).

- **Timeline color/dense propagation (no `$children`)**: [Timeline.vue](src/components/Timeline/Timeline.vue)
  `provide()`s a `timeline` object with `getColors()` / `getDense()` / `register()`. Each
  [TimelineItem.vue](src/components/Timeline/TimelineItem.vue) `inject`s it, claims an index
  via `register()` in `created()`, and computes its own dot color
  (`colors[index % colors.length]`). Do not reintroduce `$children`/`$refs` walking.

- **State (Pinia)**: one store, `useSystemStore` in [src/stores/system.js](src/stores/system.js),
  holding `alerts` / `announcements` / `messages` with parametrized getters
  (`getAlerts({ asText, type })`) and add/decrement/clear actions. Components bind it via
  `mapState`/`mapActions` from `pinia`. (No Vuex, no per-page store modules.)

- **Notifications**: three surfaces — `AlertSnackbar` (timed), `MessageDialog` (modal),
  `AnnouncementBar` (rotating/dismissible). `SystemNotificationHub` reads the store and
  renders one instance per enabled type. Type → icon/title/color maps come from the
  `Notification` mixin factory ([src/mixins/Notification/Notification.js](src/mixins/Notification/Notification.js)).

- **`v-model` mixin**: `Model` ([src/mixins/Model/Model.js](src/mixins/Model/Model.js))
  bridges `modelValue` ↔ `localValue` (emits `update:modelValue`, plus `open`/`close`);
  reuse it for any component exposing `v-model`.

## Testing

- Colocated `<Component>.test.js`, run by Vitest (jsdom). [vitest.setup.js](vitest.setup.js)
  polyfills `ResizeObserver` / `matchMedia` / `visualViewport` for Vuetify.
- Use `createMountFactory(Component)` from [src/util/test-helpers.js](src/util/test-helpers.js),
  which **full-mounts** with a fresh Vuetify instance + Pinia registered (`global.plugins`).
  Import `describe`/`it`/`expect` explicitly from `vitest`.

## Contact form

[ContactMe.vue](src/Forms/ContactMe.vue) is a Vuetify `v-form` (built-in `:rules` validation, no
Vuelidate) with name/email/message + a Cloudflare **Turnstile** widget
([TyTurnstile](src/components/Turnstile/Turnstile.vue), wrapping `vue-turnstile`) and
[TyTextField](src/components/TextField/TextField.vue). It's opened from a "Contact" app-bar button
into a [TyDialog](src/components/Dialog/Dialog.vue) on [Home.vue](src/pages/Home/Home.vue). Submit
posts `{ name, email, message, token }` to the **Cloudflare Worker** in [worker/](worker/), which
verifies the Turnstile token and emails via **Resend**. Success/error surface through the existing
Pinia notification store ([useSystemStore](src/stores/system.js) `addAlert`).

- **Build-time config** (public, in `.env.development` / `.env.production`): `VITE_TURNSTILE_SITE_KEY`,
  `VITE_CONTACT_ENDPOINT`. Dev uses Turnstile test keys + a local `wrangler dev` endpoint.
- **Worker** is deployed *separately* (not via gh-pages): `cd worker && wrangler deploy`, with
  secrets `TURNSTILE_SECRET_KEY` / `RESEND_API_KEY` via `wrangler secret put` — see [worker/README.md](worker/README.md).
- Resend currently sends from `onboarding@resend.dev` to `heavyt12@gmail.com` (no custom domain;
  test-mode delivery to the account's own email).

`Loading/Mask` + `Loading/Logo` remain migrated-but-unused — see [BACKLOG.md](BACKLOG.md).

## Conventions

- `.editorconfig` is authoritative: **tabs, indent size 4, LF, UTF-8, final newline, trim
  trailing whitespace.** Match this in all files.
- Component options use `name: 'Ty…'` + `inheritAttrs: false` + `v-bind="$attrs"`.

## Definition of done (per change)

Before committing/deploying: `npm run lint`, `npm test`, and `npm run build` all green; for
UI changes, eyeball via `npm run dev`; for anything shipping live, rebuild `dist/` and
`npm run preview` before the `gh-pages` subtree push.
