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
    ? `€${d.finalPriceEur.toFixed(0)}`
    : d.amount
      ? `${(d.amount / 100).toFixed(0)} ${d.currency ?? 'EUR'}`
      : '—';

  const productLine = d.productLabel ?? 'Peptide (research)';
  const imgSrc =
    d.productImageUrl ??
    (d.productSlug ? `${SITE_URL}/images/products/${d.productSlug}.webp` : null) ??
    `${SITE_URL}/images/products/retatrutide.webp`;

  const fullName = [d.firstName, d.lastName].filter(Boolean).join(' ');
  const addressLines = [
    d.address,
    [d.city, d.postalCode].filter(Boolean).join(' '),
    d.country,
  ].filter(Boolean).join('<br/>');

  const today = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });

  // colours — UK Peptides: dark navy + gold
  const accent   = '#c8a030';
  const brand    = '#0f172a';
  const bgOuter  = '#eef0f4';
  const bgSect   = '#f6f7fa';
  const border   = '#e2e6eb';
  const textMain = '#0f172a';
  const muted    = '#64748b';

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>Order confirmed</title>
</head>
<body style="margin:0;padding:0;background:${bgOuter};font-family:-apple-system,BlinkMacSystemFont,'Helvetica Neue',Arial,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="background:${bgOuter};padding:48px 16px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:6px;overflow:hidden;box-shadow:0 4px 28px rgba(0,0,0,0.10);">

  <!-- accent bar -->
  <tr><td style="height:4px;background:${accent};font-size:0;line-height:0;">&nbsp;</td></tr>

  <!-- brand -->
  <tr>
    <td align="center" style="padding:28px 40px 22px;border-bottom:1px solid ${border};">
      <div style="font-size:26px;font-weight:800;color:${brand};letter-spacing:-0.8px;font-family:Georgia,'Times New Roman',serif;">UK Peptides</div>
    </td>
  </tr>

  <!-- hero + status tracker -->
  <tr>
    <td align="center" style="background:${bgSect};padding:36px 40px 32px;">
      <h1 style="color:${textMain};font-size:19px;font-weight:700;margin:0 0 6px;letter-spacing:-0.3px;">Thank you for your order, ${d.firstName ?? ''}!</h1>
      <p style="color:${muted};font-size:13px;margin:0 0 28px;line-height:1.6;">Your order is being carefully prepared.</p>
      <table cellpadding="0" cellspacing="0" style="margin:0 auto;">
        <tr>
          <td align="center" style="width:68px;vertical-align:top;">
            <div style="width:30px;height:30px;border-radius:50%;background:${accent};margin:0 auto 6px;line-height:30px;text-align:center;font-size:14px;color:#fff;font-weight:700;">&#10003;</div>
            <div style="font-size:11px;font-weight:600;color:${textMain};white-space:nowrap;">Confirmed</div>
          </td>
          <td style="border-top:2px dashed ${border};vertical-align:top;padding-top:15px;" width="40"></td>
          <td align="center" style="width:68px;vertical-align:top;">
            <div style="width:30px;height:30px;border-radius:50%;border:2px solid ${border};margin:0 auto 6px;"></div>
            <div style="font-size:11px;color:${muted};white-space:nowrap;">Dispatched</div>
          </td>
          <td style="border-top:2px dashed ${border};vertical-align:top;padding-top:15px;" width="40"></td>
          <td align="center" style="width:68px;vertical-align:top;">
            <div style="width:30px;height:30px;border-radius:50%;border:2px solid ${border};margin:0 auto 6px;"></div>
            <div style="font-size:11px;color:${muted};white-space:nowrap;">Delivered</div>
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- order meta 2-col -->
  <tr>
    <td style="padding:24px 40px;border-bottom:1px solid ${border};">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td style="vertical-align:top;width:50%;padding-right:24px;">
            <div style="font-size:10px;font-weight:700;color:${muted};text-transform:uppercase;letter-spacing:1.3px;margin-bottom:6px;">Order number</div>
            <div style="font-size:14px;font-weight:600;color:${textMain};margin-bottom:16px;font-family:monospace,monospace;">${d.orderId}</div>
            <div style="font-size:10px;font-weight:700;color:${muted};text-transform:uppercase;letter-spacing:1.3px;margin-bottom:6px;">Order date</div>
            <div style="font-size:14px;color:${textMain};">${today}</div>
          </td>
          <td style="vertical-align:top;border-left:1px solid ${border};padding-left:24px;">
            <div style="font-size:10px;font-weight:700;color:${muted};text-transform:uppercase;letter-spacing:1.3px;margin-bottom:6px;">Delivery address</div>
            ${fullName ? `<div style="font-size:14px;font-weight:600;color:${textMain};margin-bottom:4px;">${fullName}</div>` : ''}
            <div style="font-size:13px;color:${muted};line-height:1.6;">${addressLines || '—'}</div>
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- product -->
  <tr>
    <td style="padding:28px 40px;border-bottom:1px solid ${border};">
      <div style="font-size:10px;font-weight:700;color:${muted};text-transform:uppercase;letter-spacing:1.3px;margin-bottom:20px;">Product details</div>
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td style="vertical-align:top;width:148px;padding-right:20px;">
            <img src="${imgSrc}" width="128" height="128" alt="${productLine}"
                 style="display:block;width:128px;height:128px;object-fit:cover;border-radius:8px;border:1px solid ${border};"/>
          </td>
          <td style="vertical-align:middle;">
            <div style="font-size:16px;font-weight:700;color:${textMain};margin-bottom:6px;">${productLine}</div>
            <div style="font-size:12px;color:${muted};margin-bottom:18px;line-height:1.5;">Lyophilised &middot; CoA included &middot; Purity &gt;98%</div>
            <table width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid ${border};">
              <tr>
                <td style="font-size:13px;color:${muted};padding-top:12px;">Shipping</td>
                <td align="right" style="font-size:13px;color:#38a169;font-weight:600;padding-top:12px;">Free</td>
              </tr>
              <tr>
                <td style="font-size:14px;font-weight:700;color:${textMain};padding-top:8px;">Total</td>
                <td align="right" style="font-size:20px;font-weight:800;color:${accent};padding-top:8px;letter-spacing:-0.5px;">${priceDisplay}</td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
      <div style="margin-top:20px;background:${bgSect};border-radius:5px;padding:12px 16px;">
        <p style="font-size:13px;color:${muted};margin:0;line-height:1.6;">Your order will be dispatched within 24&ndash;48 hours with full tracking.</p>
      </div>
    </td>
  </tr>

  <!-- Trustpilot -->
  <tr>
    <td align="center" style="padding:36px 40px;border-bottom:1px solid ${border};">
      <div style="margin-bottom:12px;">
        <img src="https://cdn.trustpilot.net/brand-assets/4.3.0/logo-black.png" width="120" alt="Trustpilot"
             style="display:inline-block;height:26px;width:auto;"/>
      </div>
      <div style="margin-bottom:16px;">
        <img src="https://cdn.trustpilot.net/brand-assets/4.3.0/stars/stars-5.png" width="138" height="26" alt="5 stars"
             style="display:inline-block;"/>
      </div>
      <h3 style="color:${textMain};font-size:17px;font-weight:700;margin:0 0 10px;letter-spacing:-0.3px;">Share your experience</h3>
      <p style="color:${muted};font-size:13px;margin:0 0 22px;line-height:1.7;max-width:340px;margin-left:auto;margin-right:auto;">Your feedback helps other researchers make the right choice.</p>
      <a href="${TRUSTPILOT_URL}" style="display:inline-block;background:#00B67A;color:#ffffff;text-decoration:none;font-size:14px;font-weight:600;padding:13px 30px;border-radius:5px;">Write a review on Trustpilot</a>
    </td>
  </tr>

  <!-- footer -->
  <tr>
    <td align="center" style="background:${brand};border-radius:0 0 6px 6px;padding:26px 40px;">
      <p style="color:rgba(255,255,255,0.65);font-size:13px;margin:0 0 8px;">
        Questions? <a href="mailto:contact@uk-peptides.eu" style="color:${accent};text-decoration:none;font-weight:600;">contact@uk-peptides.eu</a>
        &nbsp;&middot;&nbsp; <a href="https://t.me/ox_fr" style="color:${accent};text-decoration:none;font-weight:600;">Telegram @ox_fr</a>
      </p>
      <p style="color:rgba(255,255,255,0.3);font-size:11px;margin:0;line-height:1.7;">
        UK Peptides &mdash; Products exclusively for scientific research purposes.
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
    subject: `Order confirmed — ${data.orderId}`,
    html: buildEmailHtml(data),
  });

  if (error) {
    console.error('[email] Resend error:', error);
  } else {
    console.log('[email] Confirmation sent to', data.email, 'for order', data.orderId);
  }
}
