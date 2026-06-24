// main.jsx - With Error Boundary
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// ─── Error Boundary ───
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Application Error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          background: '#0a0a0f',
          color: '#f8fafc',
          padding: '24px',
          textAlign: 'center',
          fontFamily: 'Outfit, sans-serif'
        }}>
          <span 
            className="material-icons" 
            style={{ 
              fontSize: '56px', 
              color: '#d4af37',
              marginBottom: '16px'
            }}
          >
            error_outline
          </span>
          <h1 style={{ 
            fontSize: '24px', 
            fontWeight: '700',
            marginBottom: '8px',
            fontFamily: 'Syne, sans-serif'
          }}>
            Oops! Something went wrong
          </h1>
          <p style={{ 
            color: '#94a3b8', 
            fontSize: '14px',
            marginBottom: '20px'
          }}>
            We're sorry for the inconvenience. Please try refreshing the page.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '12px 32px',
              borderRadius: '50px',
              background: 'linear-gradient(135deg, #d4af37, #aa7c11)',
              color: '#000',
              border: 'none',
              fontWeight: '600',
              fontSize: '14px',
              cursor: 'pointer',
              transition: 'transform 0.3s ease',
            }}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.04)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          >
            Refresh Page
          </button>
          {this.state.error && (
            <pre style={{
              marginTop: '20px',
              padding: '16px',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              borderRadius: '8px',
              fontSize: '12px',
              color: '#64748b',
              maxWidth: '500px',
              overflow: 'auto',
              textAlign: 'left'
            }}>
              {this.state.error.toString()}
            </pre>
          )}
        </div>
      )
    }

    return this.props.children
  }
}

// ─── Render App ───
const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Failed to find the root element. Check your HTML template.')
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
)

// ─── Performance Monitoring ───
// Performance observer for Core Web Vitals
if (import.meta.env.PROD) {
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.entryType === 'largest-contentful-paint') {
        console.log('LCP:', entry.startTime, entry.element)
      }
      if (entry.entryType === 'first-input') {
        console.log('FID:', entry.startTime)
      }
    }
  })
  
  try {
    observer.observe({ 
      entryTypes: ['largest-contentful-paint', 'first-input'] 
    })
  } catch (e) {
    // Observer not supported
  }
}

// ─── Remove Loading State ───
// The loading placeholder will be replaced by React
console.log('✨ CineVerse app initialized')