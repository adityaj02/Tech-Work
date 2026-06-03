export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  return res.status(200).json({
    status: 'healthy',
    service: 'Tech@Work API',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    endpoints: {
      'POST /api/contact': 'Submit a contact form lead',
      'GET /api/health': 'This endpoint'
    },
    config: {
      emailConfigured: !!process.env.RESEND_API_KEY,
      notifyEmail: process.env.NOTIFY_EMAIL ? '✓ Set' : '⚠ Using default'
    }
  });
}
