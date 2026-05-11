// Order confirmation email for uk-peptides.eu.
// Sent via Resend when peptide-pay fires an order.paid webhook.

import { Resend } from 'resend';

const resend = new Resend(
  import.meta.env.RESEND_API_KEY ?? process.env.RESEND_API_KEY ?? '',
);

const FROM = 'UK Peptides <pedidos@peptide-pay.com>';
const TRUSTPILOT_URL = 'https://www.trustpilot.com/review/uk-peptides.eu';
const SITE_URL = 'https://uk-peptides.eu';

export interface OrderConfirmationData {
  orderId: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  productLabel?: string | null;
  productSlug?: string | null;
  finalPriceEur?: number | null;
  currency?: string;
  amount?: number;
  address?: string | null;
  postalCode?: string | null;
  city?: string | null;
  country?: string | null;
  productImageUrl?: string | null;
}

function buildEmailHtml(d: OrderConfirmationData): string {
  const priceDisplay = d.finalPriceEur
    ? `£${d.finalPriceEur.toFixed(2)}`
    : d.amount
      ? `${(d.amount / 100).toFixed(2)} ${d.currency ?? 'GBP'}`
      : '—';

  const productLine = d.productLabel ?? 'Peptide (research)';
  const greeting = d.firstName ? `Hi ${d.firstName},` : 'Hi,';
  const imgSrc =
    d.productImageUrl ??
    (d.productSlug ? `${SITE_URL}/images/products/${d.productSlug}.webp` : null) ??
    `${SITE_URL}/images/products/retatrutide.webp`;

  const hasAddress = d.address || d.city;
  const fullName = [d.firstName, d.lastName].filter(Boolean).join(' ');
  const addressBlock = hasAddress ? `
        <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e2e8f0;border-radius:8px;margin-bottom:20px;">
          <tr>
            <td style="padding:14px 20px;">
              <p style="margin:0 0 8px;color:#64748b;font-size:11px;font-weight:600;letter-spacing:1px;text-transform:uppercase;">Delivery address</p>
              <p style="margin:0;color:#1e293b;font-size:14px;line-height:1.7;">
                ${fullName ? `${fullName}<br/>` : ''}
                ${d.address ? `${d.address}<br/>` : ''}
                ${d.postalCode || d.city ? `${[d.city, d.postalCode].filter(Boolean).join(' ')}<br/>` : ''}
                ${d.country ?? ''}
              </p>
            </td>
          </tr>
        </table>` : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>Order confirmed</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f7;padding:40px 0;">
<tr><td align="center">

  <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">

    <tr>
      <td style="background:#0f172a;padding:28px 40px;text-align:center;">
        <p style="margin:0;color:#94a3b8;font-size:12px;letter-spacing:2px;text-transform:uppercase;font-weight:600;">UK Peptides</p>
        <h1 style="margin:8px 0 0;color:#ffffff;font-size:24px;font-weight:700;letter-spacing:-0.3px;">✓ Order confirmed</h1>
      </td>
    </tr>

    <tr>
      <td style="background:#f8fafc;text-align:center;padding:28px 40px;">
        <img src="${imgSrc}" alt="${productLine}" width="160" height="160"
             style="display:block;margin:0 auto;object-fit:contain;max-width:160px;max-height:160px;border-radius:8px;"/>
      </td>
    </tr>

    <tr>
      <td style="padding:32px 40px 0;">

        <p style="margin:0 0 28px;color:#374151;font-size:15px;line-height:1.65;">
          ${greeting}<br/><br/>
          Your payment has been <strong>received and confirmed</strong>. We're preparing your order and will dispatch within <strong>24&nbsp;h</strong>.
        </p>

        <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;margin-bottom:20px;">
          <tr>
            <td style="padding:14px 20px;">
              <p style="margin:0 0 3px;color:#64748b;font-size:11px;font-weight:600;letter-spacing:1px;text-transform:uppercase;">Order number</p>
              <p style="margin:0;color:#0f172a;font-size:14px;font-weight:700;font-family:monospace,monospace;">${d.orderId}</p>
            </td>
          </tr>
        </table>

        <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;margin-bottom:20px;">
          <tr style="background:#f8fafc;">
            <td style="padding:10px 16px;color:#64748b;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.8px;">Product</td>
            <td style="padding:10px 16px;color:#64748b;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.8px;text-align:right;">Amount</td>
          </tr>
          <tr>
            <td style="padding:14px 16px;color:#1e293b;font-size:15px;font-weight:500;">${productLine}</td>
            <td style="padding:14px 16px;color:#0f172a;font-size:16px;font-weight:700;text-align:right;">${priceDisplay}</td>
          </tr>
        </table>

        ${addressBlock}

        <table width="100%" cellpadding="0" cellspacing="0" style="background:#ecfdf5;border:1px solid #6ee7b7;border-radius:8px;margin-bottom:20px;">
          <tr>
            <td style="padding:16px 20px;">
              <p style="margin:0 0 4px;color:#065f46;font-size:14px;font-weight:700;">📦 Shipped from Europe — 3 to 5 business days</p>
              <p style="margin:0;color:#047857;font-size:13px;line-height:1.5;">You'll receive a tracking number by email once your parcel is dispatched.</p>
            </td>
          </tr>
        </table>

        <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
          <tr>
            <td style="background:#fafdf0;border:1px solid #d1fae5;border-radius:8px;padding:16px 20px;">
              <p style="margin:0 0 4px;color:#166534;font-size:14px;font-weight:700;">⭐ Happy with your order?</p>
              <p style="margin:0 0 8px;color:#374151;font-size:13px;line-height:1.5;">Leave a review on Trustpilot — we'll give you <strong>10% off</strong> your next order with the code:</p>
              <p style="margin:0 0 10px;font-family:monospace,monospace;font-size:18px;font-weight:700;color:#0f172a;letter-spacing:3px;">REVIEW10</p>
              <a href="${TRUSTPILOT_URL}" style="display:inline-block;background:#00b67a;color:#ffffff;font-size:13px;font-weight:700;padding:9px 16px;border-radius:6px;text-decoration:none;">Write a review →</a>
            </td>
          </tr>
        </table>

        <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
          <tr>
            <td style="border-top:1px solid #e2e8f0;padding-top:20px;">
              <p style="margin:0 0 4px;color:#374151;font-size:14px;font-weight:600;">Questions?</p>
              <p style="margin:0;color:#64748b;font-size:13px;line-height:1.6;">
                Message us directly on Telegram:<br/>
                <a href="https://t.me/ox_fr" style="color:#2563eb;font-weight:600;text-decoration:none;">@ox_fr</a>
                — we reply within 15 minutes.
              </p>
            </td>
          </tr>
        </table>

      </td>
    </tr>

    <tr>
      <td style="background:#f8fafc;padding:20px 40px;border-top:1px solid #e2e8f0;text-align:center;">
        <p style="margin:0;color:#94a3b8;font-size:11px;line-height:1.6;">
          UK Peptides — uk-peptides.eu<br/>
          This is an automated message, please do not reply.<br/>
          Contact: <a href="https://t.me/ox_fr" style="color:#94a3b8;">t.me/ox_fr</a>
        </p>
      </td>
    </tr>

  </table>

</td></tr>
</table>

</body>
</html>`;
}

export async function sendOrderConfirmation(data: OrderConfirmationData): Promise<void> {
  if (!data.email) {
    console.warn('[email] sendOrderConfirmation: no email, skipping');
    return;
  }

  const apiKey = import.meta.env.RESEND_API_KEY ?? process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn('[email] RESEND_API_KEY not set, skipping confirmation email');
    return;
  }

  const { error } = await resend.emails.send({
    from: FROM,
    to: data.email,
    subject: `✅ Order confirmed — ${data.orderId}`,
    html: buildEmailHtml(data),
  });

  if (error) {
    console.error('[email] Resend error:', error);
  } else {
    console.log('[email] Confirmation sent to', data.email, 'for order', data.orderId);
  }
}
