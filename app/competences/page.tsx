import CompetenceWrapper from '@/components/competences/CompetenceWrapper';
import CVSection from './CVSection';


export default async function Competences() {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const competencesRes = await fetch(`${baseUrl}/api/competences`, { cache: 'no-store' });

    if (!competencesRes.ok) {
        console.error("Erreur récupération compétences :", competencesRes.status);
        throw new Error('Erreur chargement des compétences');
    }

    const competences = await competencesRes.json()

    return (
        <div className="flex h-screen gap-6 p-6 text-white">
            {/* Section gauche pleine hauteur */}
            <div className="w-1/2 rounded-3xl bg-white/20 backdrop-blur-md border border-white shadow p-6 flex flex-col pt-18">
                <div className="absolute z-10 top-5 left-5 bg-white/30 backdrop-blur-md border border-white rounded-full px-3 py-1 shadow text-white whitespace-nowrap inline-flex items-center gap-1">
                    <span>🧳</span>
                    <span>Bagage</span>
                </div>
                <CompetenceWrapper competences={competences} />
            </div>

            {/* Colonne droite avec 2 blocs */}
            <div className="w-1/2 flex flex-col gap-6">
                {/* Bloc haut */}
                <div className="relative h-[300px] flex flex-col rounded-3xl bg-white/20 backdrop-blur-md border border-white shadow text-white overflow-hidden">
                    <div className="absolute z-10 top-5 left-5 right-5 flex justify-between items-center">
                        <div className="bg-white/30 backdrop-blur-md border border-white rounded-full px-3 py-1 shadow text-black whitespace-nowrap inline-flex items-center gap-1">
                            <span>📁</span>
                            <span>CV</span>
                        </div>
                        <a href="/CV_Gabin-Guerin.pdf" download title="Télécharger le CV" className="text-white hover:text-gray-300 text-xl">📥</a>
                    </div>

                    <div className="flex-1 h-full w-full">
                        <CVSection />
                    </div>
                </div>

                {/* Bloc bas */}
                <div className="relative h-[300px] flex flex-col rounded-3xl bg-white/20 backdrop-blur-md border border-white shadow text-white overflow-hidden">
                    <div className="absolute z-10 top-5 left-5 bg-white/30 backdrop-blur-md border border-white rounded-full px-3 py-1 shadow text-black whitespace-nowrap inline-flex items-center gap-1">
                        <span>📦</span>
                        <span>LinkedIn</span>
                    </div>
                    <div className="flex-1 overflow-auto">
                        <iframe src="https://www.linkedin.com/embed/feed/update/urn:li:share:7324725355112538112" height="100%" width="100%" title="Post intégré"></iframe>
                    </div>
                </div>
            </div>
        </div>
    )
}