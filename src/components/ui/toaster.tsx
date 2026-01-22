import { X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

export interface Toast {
  id: string
  title?: string
  description?: string
  variant?: 'default' | 'destructive'
}

let toasts: Toast[] = []
let listeners: Array<() => void> = []

const toast = {
  add: (toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substring(7)
    toasts = [...toasts, { ...toast, id }]
    listeners.forEach((listener) => listener())
    return id
  },
  remove: (id: string) => {
    toasts = toasts.filter((t) => t.id !== id)
    listeners.forEach((listener) => listener())
  },
  subscribe: (listener: () => void) => {
    listeners = [...listeners, listener]
    return () => {
      listeners = listeners.filter((l) => l !== listener)
    }
  },
  getToasts: () => toasts,
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])

  useEffect(() => {
    const unsubscribe = toast.subscribe(() => {
      setToasts(toast.getToasts())
    })
    setToasts(toast.getToasts())
    return unsubscribe
  }, [])

  return {
    toast: (props: Omit<Toast, 'id'>) => toast.add(props),
    toasts,
  }
}

export function Toaster() {
  const { toasts } = useToast()

  return (
    <div className="fixed bottom-0 right-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]">
      {toasts.map((toastItem) => (
        <div
          key={toastItem.id}
          className={cn(
            'group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all',
            toastItem.variant === 'destructive'
              ? 'border-destructive bg-destructive text-destructive-foreground'
              : 'border bg-background text-foreground'
          )}
        >
          <div className="grid gap-1">
            {toastItem.title && <div className="text-sm font-semibold">{toastItem.title}</div>}
            {toastItem.description && (
              <div className="text-sm opacity-90">{toastItem.description}</div>
            )}
          </div>
          <button
            type="button"
            className="absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100"
            onClick={() => {
              toast.remove(toastItem.id)
            }}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  )
}

export { toast }
