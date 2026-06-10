import { Resend } from 'resend';

// ─── Configuration ───────────────────────────────────────────────
const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL || 'shivskukreja@gmail.com';
const FROM_EMAIL   = process.env.FROM_EMAIL   || 'Tech@Work <onboarding@resend.dev>';

// ─── Helpers ─────────────────────────────────────────────────────
function sanitize(str) {
  if (typeof str !== 'string') return '';
  return str.trim().replace(/</g, '&lt;').replace(/>/g, '&gt;').slice(0, 2000);
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone) {
  if (!phone) return true; // optional
  return /^[+\d\s\-()]{7,20}$/.test(phone);
}

// ─── Beautiful HTML email template ───────────────────────────────
function buildEmailHTML({ name, email, phone, concern, timestamp }) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background:#0f0f0f;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f0f0f;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#1a1a1a;border:1px solid rgba(255,175,214,0.15);border-radius:12px;overflow:hidden;">
          
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#ffafd6 0%,#e38cb8 100%);padding:32px 40px;">
              <h1 style="margin:0;color:#57173e;font-size:24px;font-weight:900;letter-spacing:-0.5px;text-transform:uppercase;">
                🚀 New Lead Received
              </h1>
              <p style="margin:8px 0 0;color:rgba(87,23,62,0.7);font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:2px;">
                Tech@Work Contact Form
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px;">
              
              <!-- Name -->
              <table width="100%" style="margin-bottom:24px;">
                <tr>
                  <td style="color:#888;font-size:11px;text-transform:uppercase;letter-spacing:2px;padding-bottom:6px;font-weight:600;">
                    Full Name
                  </td>
                </tr>
                <tr>
                  <td style="color:#f0f0f0;font-size:18px;font-weight:600;padding:12px 16px;background:rgba(255,255,255,0.04);border-left:3px solid #ffafd6;border-radius:0 8px 8px 0;">
                    ${name}
                  </td>
                </tr>
              </table>

              <!-- Email -->
              <table width="100%" style="margin-bottom:24px;">
                <tr>
                  <td style="color:#888;font-size:11px;text-transform:uppercase;letter-spacing:2px;padding-bottom:6px;font-weight:600;">
                    Email Address
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 16px;background:rgba(255,255,255,0.04);border-left:3px solid #becc9a;border-radius:0 8px 8px 0;">
                    <a href="mailto:${email}" style="color:#becc9a;font-size:16px;text-decoration:none;font-weight:500;">
                      ${email}
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Phone -->
              ${phone ? `
              <table width="100%" style="margin-bottom:24px;">
                <tr>
                  <td style="color:#888;font-size:11px;text-transform:uppercase;letter-spacing:2px;padding-bottom:6px;font-weight:600;">
                    Phone Number
                  </td>
                </tr>
                <tr>
                  <td style="color:#f0f0f0;font-size:16px;font-weight:500;padding:12px 16px;background:rgba(255,255,255,0.04);border-left:3px solid #e38cb8;border-radius:0 8px 8px 0;">
                    <a href="tel:${phone}" style="color:#e38cb8;text-decoration:none;">${phone}</a>
                  </td>
                </tr>
              </table>
              ` : ''}

              <!-- Concern / Message -->
              <table width="100%" style="margin-bottom:24px;">
                <tr>
                  <td style="color:#888;font-size:11px;text-transform:uppercase;letter-spacing:2px;padding-bottom:6px;font-weight:600;">
                    Business Challenge
                  </td>
                </tr>
                <tr>
                  <td style="color:#d6c1c9;font-size:15px;line-height:1.7;padding:16px 20px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,175,214,0.1);border-radius:8px;">
                    ${concern.replace(/\n/g, '<br>')}
                  </td>
                </tr>
              </table>

              <!-- Divider -->
              <hr style="border:none;border-top:1px solid rgba(255,255,255,0.06);margin:32px 0;">

              <!-- Quick Actions -->
              <table width="100%">
                <tr>
                  <td align="center" style="padding-bottom:16px;">
                    <a href="mailto:${email}?subject=Re:%20Your%20Tech@Work%20Inquiry&body=Hi%20${encodeURIComponent(name)},%0A%0AThank%20you%20for%20reaching%20out%20to%20Tech@Work.%0A%0A" 
                       style="display:inline-block;padding:14px 32px;background:linear-gradient(135deg,#ffafd6,#e38cb8);color:#57173e;text-decoration:none;font-weight:700;font-size:14px;text-transform:uppercase;letter-spacing:1px;border-radius:8px;">
                      ✉️ Reply to ${name}
                    </a>
                  </td>
                </tr>
                <tr>
                  <td align="center">
                    <a href="https://api.whatsapp.com/send/?phone=${phone ? phone.replace(/[^\d]/g, '') : '919811797407'}&text=Hi%20${encodeURIComponent(name)},%20this%20is%20Tech@Work.%20We%20received%20your%20inquiry!" 
                       style="display:inline-block;padding:12px 28px;background:rgba(37,211,102,0.15);color:#25D366;text-decoration:none;font-weight:600;font-size:13px;text-transform:uppercase;letter-spacing:1px;border-radius:8px;border:1px solid rgba(37,211,102,0.3);">
                      💬 WhatsApp ${name}
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 40px;background:rgba(0,0,0,0.3);border-top:1px solid rgba(255,255,255,0.05);">
              <p style="margin:0;color:#555;font-size:11px;text-align:center;">
                Submitted on ${timestamp} · Tech@Work Lead Management
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// ─── Main Handler ────────────────────────────────────────────────
export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed. Use POST.'
    });
  }

  try {
    const { name, email, phone, concern } = req.body || {};

    // ── Validation ───────────────────────────────────────────
    const errors = [];

    if (!name || sanitize(name).length < 2) {
      errors.push('Name is required (min 2 characters).');
    }
    if (!email || !validateEmail(email)) {
      errors.push('A valid email address is required.');
    }
    if (phone && !validatePhone(phone)) {
      errors.push('Phone number format is invalid.');
    }
    if (!concern || sanitize(concern).length < 10) {
      errors.push('Please describe your business challenge (min 10 characters).');
    }

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        errors
      });
    }

    // Sanitize all fields
    const cleanData = {
      name: sanitize(name),
      email: sanitize(email),
      phone: sanitize(phone || ''),
      concern: sanitize(concern),
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      submittedAt: new Date().toISOString()
    };

    // ── Send email via Resend ────────────────────────────────
    let emailResult = null;
    const resendKey = process.env.RESEND_API_KEY;

    if (resendKey) {
      const resend = new Resend(resendKey);
      
      emailResult = await resend.emails.send({
        from: FROM_EMAIL,
        to: [NOTIFY_EMAIL],
        subject: `🚀 New Lead: ${cleanData.name} — Tech@Work`,
        html: buildEmailHTML(cleanData),
        reply_to: cleanData.email
      });

      if (emailResult.error) {
        console.error('Resend error:', emailResult.error);
        // Don't fail the request — log the lead anyway
      }
    } else {
      console.log('⚠️  RESEND_API_KEY not set. Logging lead to console.');
      console.log('📧 NEW LEAD:', JSON.stringify(cleanData, null, 2));
    }

    // ── Return success ───────────────────────────────────────
    return res.status(200).json({
      success: true,
      message: 'Your message has been received! We\'ll get back to you within 24 hours.',
      emailSent: !!resendKey && !emailResult?.error,
      id: `lead_${Date.now()}`
    });

  } catch (err) {
    console.error('Contact API error:', err);
    return res.status(500).json({
      success: false,
      error: 'Something went wrong. Please try again or contact us directly.'
    });
  }
}
