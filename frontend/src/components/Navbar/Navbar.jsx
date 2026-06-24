// Navbar.jsx
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Clapperboard, Home, Film, Tv, Folder, ClipboardList } from '@wair/lucide-react'
import styles from './navbar.module.css'

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Movies', to: '/movies' },
  { label: 'TV Shows', to: '/shows' },
  { label: 'Categories', to: '/categories' },
  { label: 'My List', to: '/watchlist' },
]

const DEFAULT_NOTIFICATIONS = [
  { id: 1, text: 'New movie added to your watchlist', time: Date.now() - 2 * 60 * 1000, read: false },
  { id: 2, text: 'The Matrix is now available in 4K', time: Date.now() - 60 * 60 * 1000, read: false },
  { id: 3, text: "Don't miss the new season premiere", time: Date.now() - 24 * 60 * 60 * 1000, read: false },
]

function timeAgo(timestamp) {
  const seconds = Math.floor((Date.now() - timestamp) / 1000)
  if (seconds < 60) return 'Just now'
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 30) return `${days}d ago`
  return `${Math.floor(days / 30)}mo ago`
}

function Navbar() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchActive, setIsSearchActive] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('cineverse_notifications')
    if (saved) {
      try { return JSON.parse(saved) } catch {}
    }
    return DEFAULT_NOTIFICATIONS
  })

  const notifCount = notifications.filter(n => !n.read).length

  useEffect(() => {
    localStorage.setItem('cineverse_notifications', JSON.stringify(notifications))
  }, [notifications])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isMobileMenuOpen])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery('')
      setIsSearchActive(false)
    }
  }

  const closeAll = () => {
    setIsProfileOpen(false)
    setIsNotificationOpen(false)
  }

  const navigateAndClose = (to) => {
    closeAll()
    navigate(to)
  }

  const isActive = (to) =>
    to === '/' ? pathname === '/' : pathname.startsWith(to)

  return (
    <>
      <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
        <div className={styles.navContainer}>
          
          {/* Left Section: Logo & Desktop Nav */}
          <div className={styles.navLeft}>
            <Link to="/" className={styles.logo}>
              <div className={styles.logoIcon}>
                <span className="material-icons">play_circle_filled</span>
              </div>
              <span className={styles.logoText}>
                Cine<span>Verse</span>
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <div className={styles.navLinks}>
              {NAV_LINKS.map(({ label, to }) => (
                <Link
                  key={to}
                  to={to}
                  className={`${styles.navLink} ${isActive(to) ? styles.active : ''}`}
                >
                  {label}
                  {isActive(to) && <span className={styles.navLinkIndicator} />}
                </Link>
              ))}
            </div>
          </div>

          {/* Center Section: Search */}
          <div className={styles.navCenter}>
            <form onSubmit={handleSearch} className={styles.searchForm}>
              <div className={styles.searchWrapper}>
                <span className={`material-icons ${styles.searchIcon}`}>search</span>
                <input
                  type="text"
                  placeholder="Search movies, shows..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={styles.searchInput}
                  aria-label="Search"
                />
                {searchQuery && (
                  <button 
                    type="button" 
                    className={styles.searchClose}
                    onClick={() => setSearchQuery('')}
                  >
                    <span className="material-icons">close</span>
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Right Section: Actions */}
          <div className={styles.navRight}>
            {/* Mobile Search Toggle */}
            <button 
              className={`${styles.iconBtn} ${styles.searchToggle}`}
              onClick={() => setIsSearchActive(!isSearchActive)}
              aria-label="Search"
            >
              <span className="material-icons">search</span>
            </button>

            {/* Notifications */}
            <div className={styles.notifWrapper}>
              <button
                className={styles.iconBtn}
                aria-label="Notifications"
                onClick={() => { setIsNotificationOpen(!isNotificationOpen); setIsProfileOpen(false) }}
              >
                <span className="material-icons">notifications</span>
                <span className={styles.notificationBadge}>{notifCount}</span>
              </button>
              {isNotificationOpen && (
                <div className={styles.notifDropdown}>
                  <div className={styles.notifHeader}>
                    <span className={styles.notifHeaderTitle}>Notifications</span>
                    <button className={styles.notifMarkAll} onClick={() => {
                      setNotifications(prev => prev.map(n => ({ ...n, read: true })))
                      setIsNotificationOpen(false)
                    }}>Mark all as read</button>
                  </div>
                  <div className={styles.notifList}>
                    {notifications.map(n => (
                      <div key={n.id} className={`${styles.notifItem} ${n.read ? styles.notifItemRead : ''}`} onClick={() => {
                        setNotifications(prev => prev.map(p => p.id === n.id ? { ...p, read: true } : p))
                      }}>
                        {!n.read && <div className={styles.notifDot} />}
                        <div className={styles.notifContent}>
                          <span className={styles.notifText}>{n.text}</span>
                          <span className={styles.notifTime}>{timeAgo(n.time)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className={styles.notifFooter}>
                    <button className={styles.notifViewAll} onClick={() => setIsNotificationOpen(false)}>View all notifications</button>
                  </div>
                </div>
              )}
            </div>

            {/* Profile */}
            <div className={styles.profileWrapper}>
              <button 
                className={styles.profileBtn}
                onClick={() => { setIsProfileOpen(!isProfileOpen); setIsNotificationOpen(false) }}
                aria-label="Profile"
              >
                <div className={styles.avatar}>
                  <span>JD</span>
                </div>
                <span className={`material-icons ${styles.profileChevron}`}>
                  {isProfileOpen ? 'expand_less' : 'expand_more'}
                </span>
              </button>

              {/* Profile Dropdown */}
              {isProfileOpen && (
                <div className={styles.profileDropdown}>
                  <div className={styles.dropdownHeader}>
                    <div className={styles.dropdownUser}>
                      <div className={styles.dropdownAvatar}>JD</div>
                      <div className={styles.dropdownUserInfo}>
                        <span className={styles.dropdownUserName}>John Doe</span>
                        <span className={styles.dropdownUserEmail}>john@example.com</span>
                      </div>
                    </div>
                  </div>
                  <div className={styles.dropdownMenu}>
                    <button className={styles.dropdownItem} onClick={() => navigateAndClose('/profile')}>
                      <span className="material-icons">person</span>
                      My Profile
                    </button>
                    <button className={styles.dropdownItem} onClick={() => navigateAndClose('/watchlist')}>
                      <span className="material-icons">bookmark</span>
                      My Watchlist
                    </button>
                    <button className={styles.dropdownItem} onClick={() => navigateAndClose('/profile')}>
                      <span className="material-icons">history</span>
                      Watch History
                    </button>
                    <button className={styles.dropdownItem} onClick={() => navigateAndClose('/profile')}>
                      <span className="material-icons">settings</span>
                      Settings
                    </button>
                    <div className={styles.dropdownDivider} />
                    <button className={`${styles.dropdownItem} ${styles.dropdownLogout}`} onClick={() => { closeAll(); window.location.reload() }}>
                      <span className="material-icons">logout</span>
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Hamburger */}
            <button 
              className={`${styles.iconBtn} ${styles.hamburger}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <span className="material-icons">
                {isMobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Search Form (for mobile) */}
        {isSearchActive && (
          <form onSubmit={handleSearch} className={styles.searchForm}>
            <div className={styles.searchWrapper}>
              <span className={`material-icons ${styles.searchIcon}`}>search</span>
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
                autoFocus
                aria-label="Search"
              />
              <button 
                type="button" 
                className={styles.searchClose}
                onClick={() => {
                  setSearchQuery('')
                  setIsSearchActive(false)
                }}
              >
                <span className="material-icons">close</span>
              </button>
            </div>
          </form>
        )}
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`${styles.mobileOverlay} ${isMobileMenuOpen ? styles.open : ''}`}>
        <div className={styles.mobileContainer}>
          {/* Header with logo and close button */}
          <div className={styles.mobileHeader}>
            <div className={styles.mobileLogo}>
              <Clapperboard className={styles.mobileLogoIcon} />
              <span className={styles.mobileLogoText}>CineVerse</span>
            </div>
            <button 
              className={styles.mobileClose}
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <span className="material-icons">close</span>
            </button>
          </div>

          {/* Navigation Links */}
          <div className={styles.mobileNavLinks}>
            {NAV_LINKS.map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                className={`${styles.mobileLink} ${isActive(to) ? styles.mobileActive : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className={styles.mobileLinkIcon}>
                  {label === 'Home' && <Home size={20} />}
                  {label === 'Movies' && <Film size={20} />}
                  {label === 'TV Shows' && <Tv size={20} />}
                  {label === 'Categories' && <Folder size={20} />}
                  {label === 'My List' && <ClipboardList size={20} />}
                </span>
                {label}
                {isActive(to) && <span className={styles.mobileActiveDot} />}
              </Link>
            ))}
          </div>

          {/* Divider */}
          <div className={styles.mobileDivider} />

          {/* Actions Section */}
          <div className={styles.mobileActions}>
            <button className={styles.mobileAction} onClick={() => { setIsMobileMenuOpen(false); setIsNotificationOpen(true) }}>
              <span className="material-icons">notifications_outline</span>
              <span>Notifications</span>
              <span className={styles.mobileBadge}>{notifCount}</span>
            </button>
            <button className={styles.mobileAction} onClick={() => navigateAndClose('/watchlist')}>
              <span className="material-icons">bookmark_outline</span>
              <span>Watchlist</span>
            </button>
            <button className={styles.mobileAction} onClick={() => navigateAndClose('/profile')}>
              <span className="material-icons">history</span>
              <span>History</span>
            </button>
            <button className={styles.mobileAction} onClick={() => navigateAndClose('/profile')}>
              <span className="material-icons">settings_outline</span>
              <span>Settings</span>
            </button>
            <button className={styles.mobileAction} onClick={() => navigateAndClose('/')}>
              <span className="material-icons">help_outline</span>
              <span>Help & Support</span>
            </button>
          </div>

          {/* Divider */}
          <div className={styles.mobileDivider} />

          {/* User Profile */}
          <div className={styles.mobileUser}>
            <div className={styles.mobileAvatar}>
              <span>JD</span>
            </div>
            <div className={styles.mobileUserInfo}>
              <div className={styles.mobileUserName}>John Doe</div>
              <div className={styles.mobileUserEmail}>john.doe@example.com</div>
            </div>
            <button className={styles.mobileLogout} aria-label="Logout" onClick={() => { setIsMobileMenuOpen(false); window.location.reload() }}>
              <span className="material-icons">logout</span>
            </button>
          </div>

          {/* Footer */}
          <div className={styles.mobileFooter}>
            <span>© 2025 CineVerse</span>
            <span>v2.0.1</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar