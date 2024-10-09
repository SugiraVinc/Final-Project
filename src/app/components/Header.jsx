import React from 'react'
import Link from 'next/link'

const Header = () => {
  return (
    <header className="w-9/12 bg-white p-4 flex justify-between items-center mx-auto">
    <div className="flex items-center">
      <Link href="/"><img src="/logo.png" alt="Logo" className="w-5 h-5" /></Link>
    </div>
    <nav className="flex items-center space-x-4">
      <Link href="#" className="text-sm font-semibold">JOIN COMMUNITY</Link>
      <Link href="/login" className="text-sm font-semibold">LOGIN</Link>
      <Link href="/self-check" className="text-sm font-semibold">SELF CHECK</Link>
    </nav>
  </header>
  )
}

export default Header
