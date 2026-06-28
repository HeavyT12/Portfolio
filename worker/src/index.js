// Cloudflare Worker for the portfolio contact form.
// Verifies a Cloudflare Turnstile token, then sends the message via Resend.
// Deployed separately from the GitHub Pages frontend (see worker/README.md).
//
// Secrets (wrangler secret put): TURNSTILE_SECRET_KEY, RESEND_API_KEY
// Vars (wrangler.jsonc):         CONTACT_TO, CONTACT_FROM

const ALLOWED_ORIGINS = new Set([
	'https://heavyt12.github.io',
	'http://localhost:5173'
]);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function corsHeaders(origin) {
	const allow = ALLOWED_ORIGINS.has(origin) ? origin : 'https://heavyt12.github.io';

	return {
		'Access-Control-Allow-Origin': allow,
		'Access-Control-Allow-Methods': 'POST, OPTIONS',
		'Access-Control-Allow-Headers': 'Content-Type',
		'Vary': 'Origin'
	};
}

function json(body, status, origin) {
	return new Response(JSON.stringify(body), {
		status,
		headers: {
			'Content-Type': 'application/json',
			...corsHeaders(origin)
		}
	});
}

function escapeHtml(value) {
	return value.replace(/[&<>"']/g, char => ({
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot;',
		"'": '&#39;'
	}[char]));
}

async function verifyTurnstile(secret, token, ip) {
	const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
		method: 'POST',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		body: new URLSearchParams({ secret, response: token, remoteip: ip })
	});

	const result = await response.json();

	return result.success === true;
}

async function sendEmail(env, { name, email, message }) {
	return fetch('https://api.resend.com/emails', {
		method: 'POST',
		headers: {
			'Authorization': `Bearer ${env.RESEND_API_KEY}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			from: env.CONTACT_FROM || 'Portfolio Contact <onboarding@resend.dev>',
			to: [env.CONTACT_TO || 'heavyt12@gmail.com'],
			reply_to: email,
			subject: `Portfolio contact from ${name}`,
			text: `From: ${name} <${email}>\n\n${message}`,
			html: `<p><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>`
				+ `<p style="white-space:pre-wrap">${escapeHtml(message)}</p>`
		})
	});
}

export default {
	async fetch(request, env) {
		const origin = request.headers.get('Origin') || '';

		if (request.method === 'OPTIONS') {
			return new Response(null, { status: 204, headers: corsHeaders(origin) });
		}

		if (request.method !== 'POST') {
			return json({ error: 'Method not allowed.' }, 405, origin);
		}

		let data;
		try {
			data = await request.json();
		} catch {
			return json({ error: 'Invalid request body.' }, 400, origin);
		}

		const name = String(data.name || '').trim();
		const email = String(data.email || '').trim();
		const message = String(data.message || '').trim();
		const token = String(data.token || '');

		if (!name || !email || !message) {
			return json({ error: 'Name, email, and message are required.' }, 400, origin);
		}

		if (!EMAIL_RE.test(email)) {
			return json({ error: 'Please provide a valid email address.' }, 400, origin);
		}

		if (!token) {
			return json({ error: 'Bot check missing — please retry.' }, 400, origin);
		}

		const ip = request.headers.get('CF-Connecting-IP') || '';
		if (!(await verifyTurnstile(env.TURNSTILE_SECRET_KEY, token, ip))) {
			return json({ error: 'Bot check failed — please try again.' }, 403, origin);
		}

		const sent = await sendEmail(env, { name, email, message });
		if (!sent.ok) {
			console.error('Resend error', sent.status, await sent.text());
			return json({ error: 'Could not send your message. Please try again later.' }, 502, origin);
		}

		return json({ ok: true }, 200, origin);
	}
};
