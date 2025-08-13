import ProjetWrapper from '@/components/projet/ProjetWrapper';

type Projet = {
  id: number;
  nom: string;
  description: string;
  lien?: string;
  image?: string;
  created_at?: string;
  team?: boolean;
};

async function getProjets(): Promise<Projet[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/projets`, {
      cache: 'no-store',
    });

    if (!res.ok) throw new Error('Erreur récupération projets');
    return res.json();
  } catch (error) {
    console.error('Erreur dans getProjets:', error);
    return [];
  }
}

export default async function ProjetsPage() {
  const projets = await getProjets();

  const projetsEquipe = projets.filter((p) => p.team);
  const projetsSolo = projets.filter((p) => !p.team);

  return (
    <div>
      <div className="relative h-[400px] flex flex-col flex-1 rounded-3xl bg-white/20 backdrop-blur-md border border-white shadow text-white p-6 pt-10 mb-5">
        {/* Titre */}
        <div className="absolute z-10 top-5 left-5 bg-white/30 backdrop-blur-md border border-white rounded-full px-3 py-1 shadow text-white whitespace-nowrap inline-flex items-center gap-1">
          <span>👥</span>
          <span>Projets en équipe</span>
        </div>

        {/* Scroll horizontal si trop de projets */}
        <div className="flex w-full h-full space-x-4 overflow-x-auto px-4 py-2 mt-5">
          {projetsEquipe.map((projet) => (
            <div
              key={projet.id}
              className="max-w-xs h-full bg-white/10 rounded-xl backdrop-blur-md shadow-lg border border-white flex-shrink-0"
            >
              <ProjetWrapper projets={[projet]} />
            </div>
          ))}
        </div>
      </div>


      <div className="relative h-[400px] flex flex-col flex-1 rounded-3xl bg-white/20 backdrop-blur-md border border-white shadow text-white p-6 pt-10">
        {/* Titre */}
        <div className="absolute z-10 top-5 left-5 bg-white/30 backdrop-blur-md border border-white rounded-full px-3 py-1 shadow text-white whitespace-nowrap inline-flex items-center gap-1">
          <span>👤</span>
          <span>Projets en solo</span>
        </div>

        {/* Scroll horizontal */}
        <div className="flex w-full h-full space-x-4 overflow-x-auto px-4 py-2 mt-5">
          {projetsSolo.map((projet) => (
            <div
              key={projet.id}
              className="max-w-xs h-full bg-white/10 rounded-xl backdrop-blur-md shadow-lg border border-white flex-shrink-0"
            >
              <ProjetWrapper projets={[projet]} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
