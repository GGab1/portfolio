'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser as faUserSolid, faWindowRestore as faWindowRestoreSolid, faLightbulb as faLightbulbSolid, faEnvelope as faEnvelopeSolid } from '@fortawesome/free-solid-svg-icons'
import { faUser as faUserRegular, faWindowRestore as faWindowRestoreRegular, faLightbulb as faLightbulbRegular, faEnvelope as faEnvelopeRegular } from '@fortawesome/free-regular-svg-icons'

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="flex flex-col gap-3 p-2 bg-white/20 backdrop-blur-md border-2 border-white rounded-full w-fit h-fit mx-8">
        <Link href="/about" className="relative w-10 h-10 rounded-full flex items-center justify-center">
            <span className={`absolute inset-0 rounded-full bg-white/30 backdrop-blur-md border-2 border-white transition-opacity duration-300 
                ${pathname === '/about' ? 'opacity-100' : 'opacity-0'}`}
            />
            <FontAwesomeIcon icon={pathname === '/about' ? faUserSolid : faUserRegular} className="relative z-10" style={{ width: '1.5rem', height: '1.5rem' }}/>
        </Link>

        <Link href="/projets" className="relative w-10 h-10 rounded-full flex items-center justify-center">
            <span className={`absolute inset-0 rounded-full bg-white/30 backdrop-blur-md border-2 border-white transition-opacity duration-300 
                ${pathname === '/projets' ? 'opacity-100' : 'opacity-0'}`}
            />
            <FontAwesomeIcon icon={pathname === '/projets' ? faWindowRestoreSolid : faWindowRestoreRegular} className="relative z-10" style={{ width: '1.5rem', height: '1.5rem' }}/>
        </Link>

        <Link href="/competences" className="relative w-10 h-10 rounded-full flex items-center justify-center">
            <span className={`absolute inset-0 rounded-full bg-white/30 backdrop-blur-md border-2 border-white transition-opacity duration-300 
                ${pathname === '/competences' ? 'opacity-100' : 'opacity-0'}`}
            />
            <FontAwesomeIcon icon={pathname === '/competences' ? faLightbulbSolid : faLightbulbRegular} className="relative z-10" style={{ width: '1.5rem', height: '1.5rem' }}/>
        </Link>

        <Link href="/contact" className="relative w-10 h-10 rounded-full flex items-center justify-center">
            <span className={`absolute inset-0 rounded-full bg-white/30 backdrop-blur-md border-2 border-white transition-opacity duration-300 
                ${pathname === '/contact' ? 'opacity-100' : 'opacity-0'}`}
            />
            <FontAwesomeIcon icon={pathname === '/contact' ? faEnvelopeSolid : faEnvelopeRegular} className="relative z-10" style={{ width: '1.5rem', height: '1.5rem' }}/>
        </Link>
    </nav>
  )
}
