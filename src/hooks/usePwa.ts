import { useEffect, useRef, useState } from 'react'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export function usePwa() {
  const [needRefresh, setNeedRefresh] = useState(false)
  const [canInstall, setCanInstall] = useState(false)
  const installPrompt = useRef<BeforeInstallPromptEvent | null>(null)
  const waitingWorker = useRef<ServiceWorker | null>(null)

  useEffect(() => {
    if (!('serviceWorker' in navigator)) return

    navigator.serviceWorker.ready.then((reg) => {
      reg.addEventListener('updatefound', () => {
        const newWorker = reg.installing
        if (!newWorker) return
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            waitingWorker.current = newWorker
            setNeedRefresh(true)
          }
        })
      })
    })

    // Reload when new SW takes control
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      window.location.reload()
    })

    const handler = (e: Event) => {
      e.preventDefault()
      installPrompt.current = e as BeforeInstallPromptEvent
      setCanInstall(true)
    }

    window.addEventListener('beforeinstallprompt', handler)
    window.addEventListener('appinstalled', () => setCanInstall(false))

    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const update = () => {
    waitingWorker.current?.postMessage({ type: 'SKIP_WAITING' })
  }

  const install = async () => {
    if (!installPrompt.current) return
    await installPrompt.current.prompt()
    const { outcome } = await installPrompt.current.userChoice
    if (outcome === 'accepted') setCanInstall(false)
    installPrompt.current = null
  }

  return {
    needRefresh,
    canInstall,
    update,
    dismissUpdate: () => setNeedRefresh(false),
    install,
    dismissInstall: () => setCanInstall(false),
  }
}
