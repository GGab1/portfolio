'use client'

import { usePathname } from 'next/navigation'
import Navbar from '@/components/navbar'
import Topbar from '@/components/topbar'

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  if (pathname === '/' || pathname.startsWith('/admin')) {
    return <>{children}</>
  }

  return (
    <div className="fixed w-full h-full overflow-hidden flex">
      <div className="h-full flex items-center">
        <Navbar />
      </div>

      <div className="flex-1 h-full flex flex-col p-8 ps-0">
        <Topbar />
        <div className="relative w-full h-full overflow-y-auto rounded-4xl bg-white/20 shadow-lg p-10 backdrop-blur-md border-2 mt-1">
          {children}
        </div>
      </div>
    </div>
  )
}
