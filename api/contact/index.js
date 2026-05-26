import { sql } from '../../src/lib/db.js';
import { verifyToken } from '../../src/lib/auth.js';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const rows = await sql('SELECT * FROM contact WHERE id = 1');
      const contact = rows[0] || {};
      return res.status(200).json(contact);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error' });
    }
  }

  if (req.method === 'PUT') {
    const payload = await verifyToken(req);
    if (!payload) return res.status(401).json({ error: 'Unauthorized' });

    const { email, address, city } = req.body;
    try {
      await sql(`
        UPDATE contact 
        SET email = $1, address = $2, city = $3
        WHERE id = 1
      `, [email, address, city]);
      return res.status(200).json({ success: true });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error' });
    }
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
}
