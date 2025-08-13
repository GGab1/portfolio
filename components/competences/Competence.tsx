import Image from "next/image"

type Competence = {
  id: number
  nom: string
  logo: string
  categorie: string
  type?: 'dev' | 'crea' | 'com'
}

export default function Competence({ competences }: { competences: Competence[] }) {
    if (!competences || competences.length === 0) {
        return (
            <div className="text-white text-center py-6">
                Aucune compétence à afficher.
            </div>
        )
    }

    const getPictoSrc = (type?: Competence["type"]) => {
        switch (type) {
            case 'dev': return '/pictoDev.png';
            case 'crea': return '/pictoCrea.png';
            case 'com': return '/pictoCom.png';
            default: return null;
        }
    }

    const grouped = competences.reduce<Record<string, Competence[]>>((acc, item) => {
        if (!acc[item.categorie]) acc[item.categorie] = []
        acc[item.categorie].push(item)
        return acc
    }, {})

    return (
        <div className="overflow-auto h-full pr-2">
            {Object.entries(grouped).map(([categorie, items]) => (
                <div key={categorie} className="mb-6">
                    {/* Sticky Header */}
                    <div className="sticky top-0 z-10 bg-white/10 backdrop-blur-md border border-white px-4 py-2 rounded-md shadow text-sm font-bold text-white mb-2">
                        {categorie.toUpperCase()}
                    </div>

                    <div className="space-y-3">
                        {items.map((competence) => {
                            const pictoSrc = getPictoSrc(competence.type)
                            console.log(competence)

                            return (
                                <div key={competence.id} className="flex items-center justify-between px-4 py-3 text-white">
                                    <div className="flex items-center gap-3">
                                        <Image src={competence.logo} alt={competence.nom} width={24} height={24} className="object-contain" />
                                        <span className="font-medium">{competence.nom}</span>
                                    </div>
                                    {pictoSrc && (
                                        <Image src={pictoSrc} alt="type" width={20} height={20} className="object-contain" />
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </div>
            ))}
        </div>
    )
}
