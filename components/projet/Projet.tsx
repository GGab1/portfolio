import Image from "next/image"
import Link from "next/link"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight as faChevronSolid } from '@fortawesome/free-solid-svg-icons'

type Projet = {
  id: number
  nom: string
  description: string
  lien?: string
  image?: string
  created_at?: string
  team?: boolean
  type?: string
}

export default function Projets({ projets }: { projets: Projet[] }) {
  if (!projets || projets.length === 0) {
    return (
      <div>
        Aucun projet à afficher.
      </div>
    )
  }

  const projet = projets[projets.length - 1];

  const getPictoSrc = (type?: Projet["type"]) => {
    switch (type) {
      case 'dev': return '/pictoDev.png';
      case 'crea': return '/pictoCrea.png';
      case 'com': return '/pictoCom.png';
      default: return null;
    }
  }

  const pictoSrc = getPictoSrc(projet.type);

  return (
    <div className="relative flex flex-col h-full justify-between p-4 text-white">
      {/* Picto en haut à droite */}
      {pictoSrc && (
        <div className="absolute top-3 right-3 w-8 h-8">
          <Image src={pictoSrc} alt={`Type: ${projet.type}`} fill className="object-contain" />
        </div>
      )}

      <div className="flex items-center gap-4">
        {typeof projet.image === 'string' && projet.image.trim() !== '' ? (
          <div className="relative w-[80px] h-[80px]">
            <Image src={projet.image} alt={projet.nom} fill className="object-cover rounded-xl" />
          </div>
        ) : (
          <div className="w-[80px] h-[80px] bg-white/10 rounded-xl flex items-center justify-center text-sm text-white/60">
            Pas d’image
          </div>
        )}

        <h3 className="font-semibold text-lg">{projet.nom}</h3>
      </div>

      <p className="mt-4 text-sm text-white/80 line-clamp-3">
        {projet.description}
      </p>

      {projet.lien && (
        <div className="mt-4 text-right">
          <Link href={projet.lien} target="_blank" rel="noopener noreferrer" className="text-ms ml-auto inline-flex items-center gap-2 rounded-3xl bg-white/20 backdrop-blur-md border border-white shadow p-2">
            Voir le projet
            <FontAwesomeIcon icon={faChevronSolid} className="relative z-10" style={{ width: '1.5rem', height: '1.5rem' }} />
          </Link>
        </div>
      )}
    </div>
  )
}
