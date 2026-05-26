import { sql } from '../../src/lib/db.js';
import { verifyToken } from '../../src/lib/auth.js';

export default async function handler(req, res) {
  const { id } = req.query;

  const payload = await verifyToken(req);
  if (!payload) return res.status(401).json({ error: 'Unauthorized' });

  if (req.method === 'PUT') {
    const { sort_order, title, year, description, label, image_url } = req.body;
    try {
      await sql(`
        UPDATE projects 
        SET sort_order = $1, title = $2, year = $3, description = $4, label = $5, image_url = $6
        WHERE id = $7
      `, [sort_order || 0, title, year, description, label, image_url, id]);
      return res.status(200).json({ success: true });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      await sql(`DELETE FROM projects WHERE id = $1`, [id]);
      return res.status(200).json({ success: true });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error' });
    }
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
}
