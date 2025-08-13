import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function GET() {
  try {
    const result = await pool.query('SELECT * FROM projets ORDER BY created_at ASC');
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Erreur API /api/projets :', error);
    return NextResponse.json({ error: 'Erreur lors de la récupération des projets' }, { status: 500 });
  }
}
