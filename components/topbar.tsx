'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser as faUserSolid, faWindowRestore as faWindowRestoreSolid, faLightbulb as faLightbulbSolid, faEnvelope as faEnvelopeSolid } from '@fortawesome/free-solid-svg-icons'
import { faUser as faUserRegular, faWindowRestore as faWindowRestoreRegular, faLightbulb as faLightbulbRegular, faEnvelope as faEnvelopeRegular } from '@fortawesome/free-regular-svg-icons'

export default function Topbar() {
  const pathname = usePathname()

  const items = [
    { href: '/about', label: 'À propos', iconSolid: faUserSolid, iconRegular: faUserRegular },
    { href: '/projets', label: 'Projets', iconSolid: faWindowRestoreSolid, iconRegular: faWindowRestoreRegular },
    { href: '/competences', label: 'Compétences', iconSolid: faLightbulbSolid, iconRegular: faLightbulbRegular },
    { href: '/contact', label: 'Contact', iconSolid: faEnvelopeSolid, iconRegular: faEnvelopeRegular },
  ]

    return (
    <nav className="flex w-full gap-1">
        {items.map(({ href, label, iconSolid, iconRegular }) => (
        <Link key={href} href={href} className={`flex-1 flex font-josefin items-center gap-4 ps-5 py-2 rounded-full transition-colors border-2 border-white backdrop-blur-md shadow-sm
            ${pathname === href ? 'bg-white/40' : 'bg-white/20 hover:bg-white/30'}`}
        >
            <FontAwesomeIcon icon={pathname === href ? iconSolid : iconRegular} className="w-4 h-4 font-josefin" style={{ width: '1.5rem', height: '1.5rem' }}/>
            {label}
        </Link>
        ))}
    </nav>
    )

}
