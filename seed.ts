import 'dotenv/config';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const events = [
  {
    titre: "Rendu projet React",
    date: new Date("2025-06-06T10:00:00"),
    note: "Préparer la démo"
  },
  {
    titre: "Examen Tailwind",
    date: new Date("2025-06-10T14:00:00"),
    note: "Revoir les breakpoints"
  },
  {
    titre: "Oral de fin d’année",
    date: new Date("2025-06-20T09:00:00"),
    note: "Slides à finir"
  }
];

async function seed() {
  try {
    for (const event of events) {
      await pool.query(
        'INSERT INTO evenements (titre, date, note) VALUES ($1, $2, $3)',
        [event.titre, event.date, event.note]
      );
    }
    console.log("✅ Événements insérés !");
  } catch (err) {
    console.error("❌ Erreur d’insertion :", err);
  } finally {
    await pool.end();
  }
}

seed();
