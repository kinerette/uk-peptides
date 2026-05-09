import type { APIRoute } from 'astro';
import { verifyWebhookSignature, hasWebhookSecret } from '../../lib/peptidepay';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const rawBody = await request.text();
  const signature = request.headers.get('X-PeptidePay-Signature');

  // Verify signature when secret is configured
  if (hasWebhookSecret()) {
    const valid = verifyWebhookSignature(rawBody, signature);
    if (!valid) {
      console.warn('[webhook] Invalid signature — rejecting');
      return new Response('Unauthorized', { status: 401 });
    }
  }

  let payload: Record<string, unknown>;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return new Response('Bad JSON', { status: 400 });
  }

  const event = payload.event ?? payload.type ?? 'unknown';
  const orderId = payload.order_id ?? payload.metadata?.order_id ?? '?';
  const status = payload.status ?? '?';

  console.log(`[peptide-pay webhook] event=${event} order=${orderId} status=${status}`);
  console.log('[peptide-pay webhook] payload:', JSON.stringify(payload).slice(0, 500));

  // Handle paid event
  if (status === 'paid' || event === 'payment.completed') {
    const meta = payload.metadata as Record<string, unknown> ?? {};
    console.log(`[peptide-pay webhook] ORDER PAID — site=${meta.site} product=${meta.product_slug} variant=${meta.variant_label} amount=${payload.amount} ${payload.currency}`);
    // TODO: send confirmation email, update database, etc.
  }

  return new Response(JSON.stringify({ received: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
