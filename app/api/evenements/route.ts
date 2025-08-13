import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function GET() {
  try {
    const result = await pool.query('SELECT * FROM evenements ORDER BY date ASC');
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Erreur API /api/evenement :', error);
    return NextResponse.json({ error: 'Erreur lors de la récupération des événements' }, { status: 500 });
  }
}
