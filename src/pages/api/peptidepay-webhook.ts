import type { APIRoute } from 'astro';
import { verifyWebhookSignature, hasWebhookSecret } from '../../lib/peptidepay';
import { sendOrderConfirmation } from '../../lib/email';

export const prerender = false;

interface WebhookBody {
  event?: string;
  session_id?: string;
  order_id?: string;
  status?: string;
  amount?: number;
  currency?: string;
  txid?: string | null;
  paid_at?: string;
  customer_email?: string | null;
  metadata?: {
    site?: string;
    variant_id?: string;
    variant_label?: string;
    product_slug?: string;
    first_name?: string | null;
    last_name?: string | null;
    address?: string | null;
    postal_code?: string | null;
    city?: string | null;
    country?: string | null;
    price_eur?: number | null;
    [key: string]: unknown;
  } | null;
}

export const POST: APIRoute = async ({ request }) => {
  const rawBody = await request.text();

  if (hasWebhookSecret()) {
    const sig = request.headers.get('X-PeptidePay-Signature');
    if (!verifyWebhookSignature(rawBody, sig)) {
      console.warn('[webhook] Invalid signature — rejecting');
      return new Response('Unauthorized', { status: 401 });
    }
  }

  let body: WebhookBody;
  try {
    body = JSON.parse(rawBody) as WebhookBody;
  } catch {
    return new Response(JSON.stringify({ ok: false, error: 'bad json' }), { status: 400 });
  }

  const event = body.event ?? 'unknown';
  const orderId = body.order_id ?? '?';
  console.log(`[peptide-pay webhook] event=${event} order=${orderId} status=${body.status}`);

  if (body.status !== 'paid' || body.event !== 'order.paid') {
    return new Response(JSON.stringify({ ok: true, ignored: event }), { status: 200 });
  }

  const meta = body.metadata ?? {};
  const customerEmail = body.customer_email ?? (meta.customer_email as string | undefined) ?? null;

  if (!customerEmail || !body.order_id) {
    console.warn('[webhook] order.paid but no customer_email — skipping confirmation email');
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  }

  // Send confirmation email using customer data from metadata (no local orders DB).
  try {
    await sendOrderConfirmation({
      orderId: body.order_id,
      email: customerEmail,
      firstName: meta.first_name ?? null,
      lastName: meta.last_name ?? null,
      productLabel: meta.variant_label ?? null,
      productSlug: meta.product_slug ?? null,
      finalPriceEur: meta.price_eur ?? (body.amount ? body.amount / 100 : null),
      currency: body.currency,
      amount: body.amount,
      address: meta.address ?? null,
      postalCode: meta.postal_code ?? null,
      city: meta.city ?? null,
      country: meta.country ?? null,
    });
  } catch (err) {
    console.error('[webhook] confirmation email failed:', (err as Error).message);
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
