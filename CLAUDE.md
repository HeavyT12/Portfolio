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

## Deployment (GitHub Pages)

The site is served from the `gh-pages` branch via the `git subtree push` technique
(per https://gist.github.com/cobyism/4730490). **`dist/` is committed to the repo and is
exactly what gets served** — it is *not* a throwaway artifact (only `node_modules` is
gitignored). `base: './'` in [vite.config.js](vite.config.js) keeps built asset URLs
relative so they resolve under the `/Portfolio/` project subpath. Deploy flow:

1. `npm run build` — regenerate `dist/`.
2. Commit the updated `dist/` alongside the source changes.
3. Push the subtree:
   ```bash
   git push origin :gh-pages && git subtree push --prefix dist origin gh-pages
   ```
   (deletes the stale remote branch first, then republishes `dist/` as a fresh tree).

Consequence: after any source change, a stale `dist/` keeps serving the old build. Always
rebuild + commit `dist/` before deploying. Verify with `npm run preview` first.

## Architecture

- **Entry & bootstrap**: [src/main.js](src/main.js) is the Vite entry referenced by the
  static [index.html](index.html). It `createApp(Home)`, registers Pinia + the Vuetify
  plugin, sets `app.config.errorHandler` (+ `window.onerror`), and mounts `#app`. The GA
  (gtag) snippet lives directly in `index.html`. Static assets live in
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

- **Page composition**: [Home.vue](src/pages/Home/Home.vue) → `TyApp` (app-bar / footer /
  notification slots) → `SystemNotificationHub` + `PersonalHistory`.

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

## Not yet migrated / deferred

The **contact form** (ContactMe + Form/FormGroup/TextField/Recaptcha) and its deps
(Vuelidate, vue-recaptcha) were **removed** during the Vue 3 migration — they had no Vue 3
support and the form was dead (unrendered, no submit). To be rebuilt later with a modern
validator + a Cloudflare Turnstile–style check + a real submit handler. `Loading/Mask` +
`Loading/Logo` are migrated but currently unused (candidates for removal).

## Conventions

- `.editorconfig` is authoritative: **tabs, indent size 4, LF, UTF-8, final newline, trim
  trailing whitespace.** Match this in all files.
- Component options use `name: 'Ty…'` + `inheritAttrs: false` + `v-bind="$attrs"`.

## Definition of done (per change)

Before committing/deploying: `npm run lint`, `npm test`, and `npm run build` all green; for
UI changes, eyeball via `npm run dev`; for anything shipping live, rebuild `dist/` and
`npm run preview` before the `gh-pages` subtree push.
