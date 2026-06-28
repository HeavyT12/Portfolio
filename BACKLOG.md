# Backlog

Persistent follow-ups that should outlast any single working session. Newest context at top.

## Deferred during the Vue 3 / Vuetify 4 migration (2026-06-27)

### 1. Rebuild the contact form
The old ContactMe form (+ Form/FormGroup/TextField/Recaptcha) and its deps (Vuelidate,
vue-recaptcha) were **removed** during the migration — they had no Vue 3 support and the form
was dead (unrendered, no submit handler). Rebuild it on the modern stack:

- **Validation**: `@vuelidate/core` (composition API). Rebuild a lean FormGroup that derives
  errors from `v$.$errors`; re-add Ty wrappers for the inputs as needed.
- **Bot protection**: Cloudflare **Turnstile** (the reCAPTCHA-like check discussed) — widget +
  server-side verification.
- **Submit handler**: GitHub Pages is **static**, so the form needs an external endpoint. Options:
  a Cloudflare Worker / Pages Function that verifies Turnstile and emails (a Resend integration
  is available), or a form service (Formspree / Web3Forms). **Decide hosting approach first** —
  it may imply adding a Worker.
- Then render ContactMe on [Home.vue](src/pages/Home/Home.vue).

Scope this as its own feature before starting.

### 2. Remove or wire up `Loading/Mask` + `Loading/Logo`
Both were migrated to Vue 3 but are **unused** (nothing imports `Mask`; `Logo` only feeds `Mask`).
Either delete them or put them to use (e.g. a real loading state). Low priority.

### 3. Tree-shake the Vuetify CSS
The build ships the full Vuetify stylesheet (~588 KB raw / ~90 KB gzipped). Acceptable for a
portfolio, but `vite-plugin-vuetify` style auto-import could trim it. Optimization only.
