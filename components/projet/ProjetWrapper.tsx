'use client'

import Projet from './Projet'

type Projet = {
  id: number
  nom: string
  description: string
  lien?: string
  image?: string
  created_at?: string
}

export default function ProjetWrapper({ projets }: { projets: Projet[] }) {
  return <Projet projets={projets} />
}
