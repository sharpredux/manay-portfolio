import { sql } from '../../src/lib/db.js';
import { verifyToken } from '../../src/lib/auth.js';

export default async function handler(req, res) {
  const { id } = req.query;

  const payload = await verifyToken(req);
  if (!payload) return res.status(401).json({ error: 'Unauthorized' });

  if (req.method === 'PUT') {
    const { sort_order, period, title, company, description } = req.body;
    try {
      await sql(`
        UPDATE experience 
        SET sort_order = $1, period = $2, title = $3, company = $4, description = $5
        WHERE id = $6
      `, [sort_order || 0, period, title, company, description, id]);
      return res.status(200).json({ success: true });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      await sql(`DELETE FROM experience WHERE id = $1`, [id]);
      return res.status(200).json({ success: true });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error' });
    }
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
}
