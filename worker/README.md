# portfolio-contact (Cloudflare Worker)

Backend for the portfolio contact form. The static GitHub Pages frontend POSTs
`{ name, email, message, token }`; this Worker verifies the Cloudflare Turnstile
token and sends the message via Resend. Deployed **separately** from the frontend.

## One-time setup
1. **Resend**: create an API key (account on `heavyt12@gmail.com` so no-domain test
   sending to that address is allowed). `from` stays `onboarding@resend.dev` until a
   custom domain is verified.
2. **Turnstile**: create a widget in the Cloudflare dashboard with hostname
   `heavyt12.github.io`. Note the **site key** (public → frontend `.env.production`)
   and **secret key** (→ Worker secret).

## Local dev
```bash
cd worker
npm install
cp .dev.vars.example .dev.vars   # fill RESEND_API_KEY; Turnstile test secret is preset
npm run dev                      # wrangler dev on http://localhost:8787
```
Point the frontend at it via `VITE_CONTACT_ENDPOINT=http://localhost:8787` (already in
`.env.development`) and use the Turnstile test site key.

## Deploy
```bash
cd worker
npm install
npx wrangler login
npx wrangler secret put TURNSTILE_SECRET_KEY
npx wrangler secret put RESEND_API_KEY
npm run deploy                   # prints the https://portfolio-contact.<acct>.workers.dev URL
```
Put that URL in the frontend `.env.production` as `VITE_CONTACT_ENDPOINT`.

Recipient/sender are non-secret vars in `wrangler.jsonc` (`CONTACT_TO`, `CONTACT_FROM`).
