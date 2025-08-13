import Image from "next/image";
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight as faChevronSolid } from '@fortawesome/free-solid-svg-icons'
import CalendrierWrapper from "@/components/calendrier/CalendrierWrapper";
import ProjetWrapper from "@/components/projet/ProjetWrapper";

export default async function About() {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const eventRes = await fetch(`${baseUrl}/api/evenements`, { cache: 'no-store' });
    const projetsRes = await fetch(`${baseUrl}/api/projets`, { cache: 'no-store' })
    
    
    if (!eventRes.ok) {
        console.error("Erreur récupération événements :", eventRes.status);
        throw new Error('Erreur chargement des événements');
    }
    if (!projetsRes.ok) {
        console.error("Erreur récupération projets :", projetsRes.status);
        throw new Error('Erreur chargement des projets');
    }
    
    const evenements = await eventRes.json();
    const projets = await projetsRes.json()
    
    return (
        <div className="flex flex-col gap-6">
            {/* Première ligne */}
            <div className="flex items-start gap-6">
                {/* Bloc image */}
                <div className="relative w-[20%] top-0 aspect-[3/4] shrink-0">
                    <div className="absolute z-10 top-5 left-5 bg-white/30 backdrop-blur-md border border-white rounded-full px-3 py-1 shadow text-white whitespace-nowrap inline-flex items-center gap-1">
                        <span>👋</span>
                        <span>Hello</span>
                    </div>
                    <Image className="rounded-3xl" src="/autoportraitMdr.jpg" alt="Photo" fill style={{ objectFit: 'cover', borderRadius: '1.5rem' }} priority />
                </div>

                {/* Bloc description */}
                <div className="relative h-[300px] flex flex-col flex-1 rounded-3xl bg-white/20 backdrop-blur-md border border-white shadow text-white p-6 pt-10">
                    <div className="absolute z-10 top-5 left-5 bg-white/30 backdrop-blur-md border border-white rounded-full px-3 py-1 shadow text-white whitespace-nowrap inline-flex items-center gap-1">
                        <span>🗿</span>
                        <span>Description</span>
                    </div>

                    <p className="mt-8 mb-8">
                        Actuellement en formation en développement web à l’IUT de Laval en BUT Métiers du Multimédia et de l’Internet, je me spécialise dans les technologies front-end modernes comme React, Tailwind et Next.js. 
                        Mon cœur de métier est la création d’interfaces dynamiques, réactives et animées, avec une attention particulière à l’expérience utilisateur.
                    </p>

                    <Link href="/competences" className="text-ms ml-auto inline-flex items-center gap-2 rounded-3xl bg-white/20 backdrop-blur-md border border-white shadow p-2">
                        Mes compétences
                        <FontAwesomeIcon icon={faChevronSolid} className="relative z-10" style={{ width: '1.5rem', height: '1.5rem' }}/>
                    </Link>
                </div>
            </div>

            {/* Deuxième ligne */}
            <div className="flex items-start gap-6">
                {/* Bloc projet */}
                <div className="relative w-[300px] h-[300px] rounded-3xl bg-white/20 backdrop-blur-md border border-white shadow text-white p-6 pt-10 flex items-center justify-center">
                    <div className="absolute z-10 top-5 left-5 bg-white/30 backdrop-blur-md border border-white rounded-full px-3 py-1 shadow text-white text-sm inline-flex items-center gap-1">
                        <span>📁</span>
                        <span>Projet</span>
                    </div>
                    <ProjetWrapper projets={projets} />
                </div>

                {/* Bloc news */}
                <div className="relative h-[300px] flex flex-col flex-1 rounded-3xl bg-zinc-900 backdrop-blur-md shadow text-white">
                    <div className="absolute z-10 top-5 left-5 bg-white/30 backdrop-blur-md border border-white rounded-full px-3 py-1 shadow text-white text-sm inline-flex items-center gap-1">
                        <span>🗓️</span>
                        <span>News</span>
                    </div>
                    <CalendrierWrapper evenements={evenements} />
                </div>

            </div>
        </div>
    );
}
