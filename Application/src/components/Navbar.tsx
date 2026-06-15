import { useEffect, useState } from 'react'
import './Navbar.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__left">
        <span className="navbar__logo-text">NETFLIX</span>
      </div>
      <div className="navbar__right">
        <span className="navbar__avatar">S</span>
      </div>
    </nav>
  )
}