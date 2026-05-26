import { sql } from '../../src/lib/db.js';
import { verifyToken } from '../../src/lib/auth.js';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const rows = await sql('SELECT * FROM experience ORDER BY sort_order');
      return res.status(200).json(rows);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error' });
    }
  }

  if (req.method === 'POST') {
    const payload = await verifyToken(req);
    if (!payload) return res.status(401).json({ error: 'Unauthorized' });

    const { id, sort_order, period, title, company, description } = req.body;
    try {
      await sql(`
        INSERT INTO experience (id, sort_order, period, title, company, description)
        VALUES ($1, $2, $3, $4, $5, $6)
      `, [id, sort_order || 0, period, title, company, description]);
      return res.status(201).json({ success: true });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error' });
    }
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
}
