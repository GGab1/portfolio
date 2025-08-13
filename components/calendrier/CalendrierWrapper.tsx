'use client'

import Calendrier from './Calendrier'

type Evenement = {
  id: number
  titre: string
  date: string
  note: string
}

export default function CalendrierWrapper({ evenements }: { evenements: Evenement[] }) {
  return <Calendrier evenements={evenements} />
}
 