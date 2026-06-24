// Footer.jsx
import { Link } from 'react-router-dom'
import { SocialIcon } from 'react-social-icons'
import styles from './Footer.module.css'

function Footer() {
  return (
    <footer className={styles.footer}>
      {/* Decorative accent line */}
      <div className={styles.footerAccent} />
      
      <div className={styles.footerContainer}>
        {/* Main Footer Grid */}
        <div className={styles.footerGrid}>
          {/* Brand Section */}
          <div className={styles.footerBrand}>
            <Link to="/" className={styles.logo}>
              <div className={styles.logoIcon}>
                <span className="material-icons">movie</span>
              </div>
              <span className={styles.logoText}>CineVerse</span>
            </Link>
            <p className={styles.brandDescription}>
              Your ultimate destination for premium entertainment. 
              Discover, watch, and enjoy unlimited movies and shows.
            </p>
            <div className={styles.socialLinks}>
              <SocialIcon network="facebook" url="https://facebook.com" className={styles.socialLink} bgColor="#94a3b8" fgColor="#0a0a0f" style={{ width: 38, height: 38 }} />
              <SocialIcon network="x" url="https://x.com" className={styles.socialLink} bgColor="#94a3b8" fgColor="#0a0a0f" style={{ width: 38, height: 38 }} />
              <SocialIcon network="instagram" url="https://instagram.com" className={styles.socialLink} bgColor="#94a3b8" fgColor="#0a0a0f" style={{ width: 38, height: 38 }} />
              <SocialIcon network="youtube" url="https://youtube.com" className={styles.socialLink} bgColor="#94a3b8" fgColor="#0a0a0f" style={{ width: 38, height: 38 }} />
            </div>
          </div>

          {/* Company Links */}
          <div className={styles.footerSection}>
            <h3 className={styles.footerHeading}>Company</h3>
            <ul className={styles.footerList}>
              <li><Link to="/about" className={styles.footerLink}>About</Link></li>
              <li><Link to="/careers" className={styles.footerLink}>Careers</Link></li>
              <li><Link to="/press" className={styles.footerLink}>Press</Link></li>
              <li><Link to="/investor-relations" className={styles.footerLink}>Investor Relations</Link></li>
              <li><Link to="/gift-cards" className={styles.footerLink}>Gift Cards</Link></li>
            </ul>
          </div>

          {/* Support Links */}
          <div className={styles.footerSection}>
            <h3 className={styles.footerHeading}>Support</h3>
            <ul className={styles.footerList}>
              <li><Link to="/help" className={styles.footerLink}>Help Center</Link></li>
              <li><Link to="/contact" className={styles.footerLink}>Contact Us</Link></li>
              <li><Link to="/account" className={styles.footerLink}>Account</Link></li>
              <li><Link to="/supported-devices" className={styles.footerLink}>Supported Devices</Link></li>
              <li><Link to="/mobile-apps" className={styles.footerLink}>Mobile Apps</Link></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className={styles.footerSection}>
            <h3 className={styles.footerHeading}>Legal</h3>
            <ul className={styles.footerList}>
              <li><Link to="/privacy" className={styles.footerLink}>Privacy Policy</Link></li>
              <li><Link to="/terms" className={styles.footerLink}>Terms of Services</Link></li>
              <li><Link to="/content-guidelines" className={styles.footerLink}>Content Guidelines</Link></li>
              <li><Link to="/cookie-settings" className={styles.footerLink}>Cookie Settings</Link></li>
              <li><Link to="/developer-api" className={styles.footerLink}>Developer API</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.footerBottom}>
          <div className={styles.bottomContent}>
            <p className={styles.copyright}>
              © 2025 CineVerse. All rights reserved.
            </p>
            <div className={styles.legalLinks}>
              <Link to="/privacy" className={styles.legalLink}>Privacy</Link>
              <span className={styles.legalDivider}>•</span>
              <Link to="/terms" className={styles.legalLink}>Terms</Link>
              <span className={styles.legalDivider}>•</span>
              <Link to="/cookies" className={styles.legalLink}>Cookies</Link>
            </div>
            <div className={styles.qualityBadge}>
              <span className="material-icons">4k</span>
              <span>Available in 4K Ultra HD and HDR</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer