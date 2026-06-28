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

### 3. Tree-shake the Vuetify CSS — investigated, not worth it (2026-06-27)
The build ships ~588 KB raw / ~90 KB gzipped CSS. Investigation found:
- **Component styles are already tree-shaken** by `vite-plugin-vuetify` `autoImport` (unused
  components like `v-data-table`/`v-stepper` are absent from the bundle). No action needed.
- The bulk is Vuetify's base + **utility** classes. The only safely-removable chunk is the
  Material **color palette** (`.bg-red`, `.text-purple`, … — the app uses custom *theme* colors
  like `bg-rainBlue`, not these). Disabling it via `styles: { configFile }` + `$color-pack: false`
  saved only **~4.5 KB gzipped (~5%)**, made the build ~8× slower (SASS compile, ~1s → ~8s), and
  removed `.text-white`/`.text-black` (which the app *does* use). Net negative — **reverted**.

Conclusion: leave as-is. Revisit only if a much smaller bundle becomes a hard requirement (would
mean a full custom SASS utilities config, not just the plugin flag).

### 4. Typography utility classes are no-ops (low priority)
Vuetify 4's precompiled `vuetify/styles` does **not** ship the typography utilities
(`text-h4/h5/h6`, `text-caption`, `text-body-*`, `text-subtitle-*`). Several of these are used
in templates (e.g. "Present Day" `text-h4`, card titles / dates `text-h5`, footer `text-caption`)
and currently render at default/inherited sizes — the approved look relies on that. The timeline
heading already sizes itself via scoped CSS in [Timeline.vue](src/components/Timeline/Timeline.vue).
If exact typographic intent matters later, either add a small global stylesheet defining just the
used classes, or switch to the SASS build (which generates them). Cosmetic only.
