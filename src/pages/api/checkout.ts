import type { APIRoute } from 'astro';
import { createSession } from '../../lib/peptidepay';
import { getVariantById } from '../../lib/products';

export const prerender = false;

const SITE_URL = (
  import.meta.env.NEXT_PUBLIC_SITE_URL ??
  process.env.NEXT_PUBLIC_SITE_URL ??
  import.meta.env.PUBLIC_SITE_URL ??
  process.env.PUBLIC_SITE_URL ??
  'https://uk-peptides.eu'
).replace(/\/+$/, '');

interface CheckoutBody {
  variantId?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  address?: string;
  postalCode?: string;
  city?: string;
  country?: string;
  promo?: string;
}

const PROMO_CODES: Record<string, number> = {
  REVIEW10: 0.10,
};

function newOrderId(): string {
  return 'ukp_' + Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

export const POST: APIRoute = async ({ request }) => {
  let body: CheckoutBody;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!body.variantId || !body.email) {
    return new Response(JSON.stringify({ error: 'Missing variantId or email' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email) || body.email.length > 254) {
    return new Response(JSON.stringify({ error: 'Invalid email address' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const MAX_FIELD = 200;
  const tooLong = [body.firstName, body.lastName, body.address, body.postalCode, body.city, body.country]
    .some((v) => typeof v === 'string' && v.length > MAX_FIELD);
  if (tooLong) {
    return new Response(JSON.stringify({ error: 'Field too long' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const variantWithProduct = getVariantById(body.variantId);
  if (!variantWithProduct) {
    return new Response(JSON.stringify({ error: 'Unknown variant' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { product, ...variant } = variantWithProduct;
  const promoCode = body.promo && PROMO_CODES[body.promo] !== undefined ? body.promo : null;
  const discountRate = promoCode ? PROMO_CODES[promoCode] : 0;
  const finalPriceEur = Math.round(variant.priceEur * (1 - discountRate) * 100) / 100;

  const orderId = newOrderId();
  const successUrl = `${SITE_URL}/order-confirmed?order=${orderId}`;
  const cancelUrl = `${SITE_URL}/checkout?variant=${variant.id}&cancelled=1`;

  try {
    const session = await createSession({
      amountCents: Math.round(finalPriceEur * 100),
      currency: 'EUR',
      email: body.email.trim(),
      orderId,
      productName: promoCode
        ? `${product.name} — ${variant.label} (-${Math.round(discountRate * 100)}%)`
        : `${product.name} — ${variant.label}`,
      webhookUrl: `${SITE_URL}/api/peptidepay-webhook`,
      successUrl,
      cancelUrl,
      // Locale hint: render the checkout in English for uk-peptides.eu customers.
      locale: 'en',
      metadata: {
        site: 'uk-peptides.eu',
        variant_id: variant.id,
        variant_label: variant.label,
        product_slug: product.slug,
        customer_email: body.email.trim(),
        first_name: body.firstName ?? null,
        last_name: body.lastName ?? null,
        address: body.address ?? null,
        postal_code: body.postalCode ?? null,
        city: body.city ?? null,
        country: body.country ?? 'GB',
        price_eur: finalPriceEur,
        // Fulfillment hints (home delivery only, no parcelshop widget)
        delivery_method: 'home',
        shipping_cost_cents: 0,
      },
    });

    return new Response(
      JSON.stringify({
        orderId,
        checkoutUrl: session.checkoutUrl,
        sessionId: session.id,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } },
    );
  } catch (err) {
    const message = (err as Error)?.message ?? String(err);
    console.error('[peptide-pay] init failed:', message);
    return new Response(
      JSON.stringify({
        error: 'Payment unavailable right now — please try again in a few minutes or contact us at contact@uk-peptides.eu',
        contactEmail: 'contact@uk-peptides.eu',
        detail: message.slice(0, 240),
      }),
      { status: 502, headers: { 'Content-Type': 'application/json' } },
    );
  }
};
