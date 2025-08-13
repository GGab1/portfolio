import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';
import { writeFile } from 'fs/promises';
import path from 'path';
import { v4 as uuid } from 'uuid';

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

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const nom = formData.get('nom') as string;
    const description = formData.get('description') as string;
    const lien = formData.get('lien') as string;
    const team = formData.get('team') === 'true';
    const type = formData.get('type') as string;

    const file = formData.get('image') as File | null;
    let imagePath: string | null = null;

    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const filename = `${uuid()}-${file.name}`;
      const uploadPath = path.join(process.cwd(), 'public/upload', filename);

      await writeFile(uploadPath, buffer);
      imagePath = `/upload/${filename}`;
    }

    const result = await pool.query(
      `INSERT INTO projets (nom, description, lien, image, team, type)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [nom, description, lien, imagePath, team, type]
    );

    return NextResponse.json({
      message: 'Projet ajouté',
      data: result.rows[0],
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error('Erreur POST /api/projets :', error.message);
      return new NextResponse(`Erreur serveur : ${error.message}`, { status: 500 });
    } else {
      console.error('Erreur inconnue POST /api/projets :', error);
      return new NextResponse('Erreur serveur inconnue', { status: 500 });
    }
  }

}
