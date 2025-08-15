'use client'

import Competence from './Competence'

type Competence = {
  id: number
  nom: string
  logo: string
  categorie: string
  type?: string
}

export default function CompetenceWrapper({ competences }: { competences: Competence[] }) {
  return <Competence competences={competences} />
}
