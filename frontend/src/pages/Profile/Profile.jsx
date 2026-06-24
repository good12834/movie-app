import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from './Profile.module.css'

function getInitials(name) {
  return name
    .split(' ')
    .map(w => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

function Profile() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('cineverse_profile')
    if (saved) {
      try { return JSON.parse(saved) } catch {}
    }
    return {
      name: 'John Doe',
      email: 'john@example.com',
      bio: 'Movie enthusiast',
      joined: 'January 2026',
    }
  })

  const [form, setForm] = useState({ ...profile })

  useEffect(() => {
    localStorage.setItem('cineverse_profile', JSON.stringify(profile))
  }, [profile])

  const avatar = getInitials(profile.name)

  const stats = [
    { label: 'Watchlist',  value: '24', icon: 'bookmark' },
    { label: 'Watched',    value: '89', icon: 'check_circle' },
    { label: 'Reviews',    value: '12', icon: 'rate_review' },
    { label: 'Following',  value: '6',  icon: 'people' },
  ]

  const openEdit = () => {
    setForm({ ...profile })
    setIsEditing(true)
  }

  const saveEdit = () => {
    const trimmed = { ...form, name: form.name.trim(), email: form.email.trim(), bio: form.bio.trim() }
    if (!trimmed.name || !trimmed.email) return
    setProfile(trimmed)
    setIsEditing(false)
  }

  const cancelEdit = () => {
    setIsEditing(false)
  }

  return (
    <div className={styles.profile}>
      <div className={styles.profileContainer}>

        {/* Header */}
        <div className={styles.header}>
          <p className={styles.headerLabel}>Account</p>
          <h1 className={styles.headerTitle}>
            Your <span>Profile</span>
          </h1>
        </div>

        <div className={styles.divider} />

        {/* Profile Card */}
        <div className={styles.profileCard}>
          <div className={styles.avatar}>
            {avatar}
          </div>
          <div className={styles.profileInfo}>
            <h2 className={styles.profileName}>{profile.name}</h2>
            <p className={styles.profileEmail}>{profile.email}</p>
            {profile.bio && <p className={styles.profileBio}>{profile.bio}</p>}
            <p className={styles.profileJoined}>Member since {profile.joined}</p>
          </div>
          <button className={styles.editButton} onClick={openEdit}>
            <span className="material-icons">edit</span>
            Edit Profile
          </button>
        </div>

        {/* Stats Grid */}
        <div className={styles.statsGrid}>
          {stats.map(({ label, value, icon }) => (
            <div key={label} className={styles.statCard}>
              <span className={`material-icons ${styles.statIcon}`}>{icon}</span>
              <p className={styles.statValue}>{value}</p>
              <p className={styles.statLabel}>{label}</p>
            </div>
          ))}
        </div>

        {/* Quick Links */}
        <div className={styles.quickLinks}>
          <h3 className={styles.quickLinksTitle}>Quick Links</h3>
          <div className={styles.linksList}>
            {[
              { icon: 'bookmark_border', label: 'My Watchlist', to: '/watchlist' },
              { icon: 'history', label: 'Watch History', to: '#' },
              { icon: 'settings', label: 'Settings', to: '#' },
            ].map(({ icon, label, to }) => (
              <Link
                key={label}
                to={to}
                className={styles.linkItem}
              >
                <span className="material-icons">{icon}</span>
                {label}
              </Link>
            ))}
          </div>
        </div>

      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className={styles.overlay} onClick={cancelEdit}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>Edit Profile</h2>
              <button className={styles.modalClose} onClick={cancelEdit} aria-label="Close">
                <span className="material-icons">close</span>
              </button>
            </div>

            <div className={styles.modalBody}>
              <div className={styles.field}>
                <label className={styles.fieldLabel}>Name</label>
                <input
                  className={styles.fieldInput}
                  type="text"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name"
                />
              </div>
              <div className={styles.field}>
                <label className={styles.fieldLabel}>Email</label>
                <input
                  className={styles.fieldInput}
                  type="email"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  placeholder="Your email"
                />
              </div>
              <div className={styles.field}>
                <label className={styles.fieldLabel}>Bio</label>
                <textarea
                  className={styles.fieldTextarea}
                  value={form.bio}
                  onChange={e => setForm({ ...form, bio: e.target.value })}
                  placeholder="Tell us about yourself"
                  rows={3}
                />
              </div>
            </div>

            <div className={styles.modalFooter}>
              <button className={styles.cancelBtn} onClick={cancelEdit}>Cancel</button>
              <button className={styles.saveBtn} onClick={saveEdit}>Save Changes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Profile
