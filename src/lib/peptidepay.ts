// Peptide-Pay API client for uk-peptides.eu (Astro / Vercel runtime).
//
// Smart checkout = POST to /api/v1/checkout/init and redirect the customer
// to session.checkoutUrl. That URL is a hosted multi-provider picker on
// peptide-pay.com (Apple Pay, Google Pay, card, direct crypto).
//
// IMPORTANT: default MUST include the `www.` subdomain. The apex
// (https://peptide-pay.com) 307-redirects to https://www.peptide-pay.com/
// and `fetch` loses the POST body on that redirect.

import { createHmac, timingSafeEqual } from 'node:crypto';

const API_URL = (
  import.meta.env.PEPTIDEPAY_API_URL ??
  process.env.PEPTIDEPAY_API_URL ??
  'https://www.peptide-pay.com'
).replace(/\/+$/, '');

const API_KEY = import.meta.env.PEPTIDEPAY_API_KEY ?? process.env.PEPTIDEPAY_API_KEY ?? '';
const WEBHOOK_SECRET = import.meta.env.PEPTIDEPAY_WEBHOOK_SECRET ?? process.env.PEPTIDEPAY_WEBHOOK_SECRET ?? '';

// Treasury wallet — hardcoded fallback so prod keeps working even if env var is missing.
const TREASURY_WALLET = '0x436c0c0d27be0f8ccf18ca7564534b1a50f59969';
const WALLET = import.meta.env.PEPTIDEPAY_WALLET ?? process.env.PEPTIDEPAY_WALLET ?? TREASURY_WALLET;

export interface CreateSessionInput {
  amountCents: number;
  currency: string;
  email: string;
  orderId: string;
  productName?: string;
  webhookUrl: string;
  successUrl: string;
  cancelUrl?: string;
  wallet?: string;
  metadata?: Record<string, unknown>;
}

export interface Session {
  id: string;
  checkoutUrl: string;
  status: 'pending' | 'paid' | 'expired' | 'failed';
  amount: number;
  currency: string;
  expiresAt?: string;
}

/**
 * Create a Smart checkout session.
 * On success the customer should be redirected to `session.checkoutUrl`.
 */
export async function createSession(input: CreateSessionInput): Promise<Session> {
  const wallet = input.wallet || WALLET;
  if (!wallet) {
    throw new Error('peptidepay: no wallet configured');
  }

  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (API_KEY) headers['Authorization'] = `Bearer ${API_KEY}`;
  headers['Idempotency-Key'] = input.orderId;

  const body = {
    wallet,
    amount: input.amountCents,
    currency: input.currency,
    email: input.email,
    order_id: input.orderId,
    product_name: input.productName,
    webhook_url: input.webhookUrl,
    success_url: input.successUrl,
    cancel_url: input.cancelUrl,
    metadata: input.metadata,
    smart: 1,
  };

  const initUrl = `${API_URL}/api/v1/checkout/init`;
  let res: Response;
  try {
    res = await fetch(initUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
      redirect: 'manual',
    });
  } catch (err) {
    throw new Error(`peptidepay init network error (${initUrl}): ${(err as Error).message}`);
  }

  if (res.status >= 300 && res.status < 400) {
    const location = res.headers.get('location') ?? '(none)';
    throw new Error(
      `peptidepay init got ${res.status} redirect to ${location} — ` +
      `set PEPTIDEPAY_API_URL to the canonical host (with www.) to avoid body loss.`,
    );
  }

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`peptidepay init ${res.status} at ${initUrl}: ${text.slice(0, 200)}`);
  }

  const data = await res.json();
  const checkoutUrl: string = data.checkout_url ?? data.url ?? data.moonpay_url;
  if (!checkoutUrl || typeof data.id !== 'string') {
    throw new Error('peptidepay init: malformed response (missing id or checkout_url)');
  }

  return {
    id: data.id,
    checkoutUrl,
    status: (data.status as Session['status']) ?? 'pending',
    amount: data.amount ?? input.amountCents,
    currency: data.currency ?? input.currency,
    expiresAt: data.expires_at,
  };
}

/**
 * Verify the X-PeptidePay-Signature header on an incoming webhook.
 */
export function verifyWebhookSignature(rawBody: string, signatureHeader: string | null): boolean {
  if (!WEBHOOK_SECRET || !signatureHeader) return false;
  const expected = createHmac('sha256', WEBHOOK_SECRET).update(rawBody).digest('hex');
  const received = signatureHeader.trim();
  if (expected.length !== received.length) return false;
  try {
    return timingSafeEqual(Buffer.from(expected, 'utf8'), Buffer.from(received, 'utf8'));
  } catch {
    return false;
  }
}

export const hasWebhookSecret = () => WEBHOOK_SECRET.length > 0;
