import { useEffect, useState } from 'react'

interface Props {
  onUpdate: () => void
  onDismiss: () => void
}

export function UpdatePrompt({ onUpdate, onDismiss }: Props) {
  return (
    <div style={{
      position: 'fixed', bottom: '1rem', left: '50%', transform: 'translateX(-50%)',
      background: '#1a1a1a', color: '#fff', padding: '0.75rem 1rem',
      borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.75rem',
      boxShadow: '0 4px 12px rgba(0,0,0,0.3)', zIndex: 9999, whiteSpace: 'nowrap',
    }}>
      <span>🔄 New version available</span>
      <button
        onClick={onUpdate}
        style={{ background: '#42b883', color: '#fff', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer' }}
      >
        Update
      </button>
      <button
        onClick={onDismiss}
        style={{ background: 'transparent', color: '#aaa', border: 'none', cursor: 'pointer', fontSize: '1.1rem' }}
      >
        ✕
      </button>
    </div>
  )
}

interface InstallProps {
  onInstall: () => void
  onDismiss: () => void
}

export function InstallPrompt({ onInstall, onDismiss }: InstallProps) {
  return (
    <div style={{
      position: 'fixed', bottom: '1rem', left: '50%', transform: 'translateX(-50%)',
      background: '#1a1a1a', color: '#fff', padding: '0.75rem 1rem',
      borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.75rem',
      boxShadow: '0 4px 12px rgba(0,0,0,0.3)', zIndex: 9999, whiteSpace: 'nowrap',
    }}>
      <span>📱 Install this app</span>
      <button
        onClick={onInstall}
        style={{ background: '#42b883', color: '#fff', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer' }}
      >
        Install
      </button>
      <button
        onClick={onDismiss}
        style={{ background: 'transparent', color: '#aaa', border: 'none', cursor: 'pointer', fontSize: '1.1rem' }}
      >
        ✕
      </button>
    </div>
  )
}

export function OfflineBanner() {
  const [online, setOnline] = useState(navigator.onLine)

  useEffect(() => {
    const onOnline = () => setOnline(true)
    const onOffline = () => setOnline(false)
    window.addEventListener('online', onOnline)
    window.addEventListener('offline', onOffline)
    return () => {
      window.removeEventListener('online', onOnline)
      window.removeEventListener('offline', onOffline)
    }
  }, [])

  if (online) return null

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0,
      background: '#e53e3e', color: '#fff', textAlign: 'center',
      padding: '0.5rem', fontSize: '0.875rem', zIndex: 9999,
    }}>
      📡 You are offline
    </div>
  )
}
