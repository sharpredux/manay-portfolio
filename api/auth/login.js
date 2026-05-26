import { signToken } from '../../src/lib/auth.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { password } = req.body || {};
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'elara2024';

  if (password === ADMIN_PASSWORD) {
    const token = await signToken({ admin: true });
    return res.status(200).json({ token });
  }

  return res.status(401).json({ error: 'Invalid password' });
}
