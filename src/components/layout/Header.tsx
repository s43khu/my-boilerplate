import { Menu, Moon, Sun } from 'lucide-react'
import { useTheme } from '@/components/providers/ThemeProvider'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'
import { useUIStore } from '@/store/uiStore'

interface HeaderProps {
  showSidebarToggle?: boolean
}

export function Header({ showSidebarToggle = false }: HeaderProps) {
  const { theme, setTheme } = useTheme()
  const toggleSidebar = useUIStore((state) => state.toggleSidebar)
  const isDark = theme === 'dark'

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          {showSidebarToggle && (
            <Button variant="ghost" size="icon" onClick={toggleSidebar}>
              <Menu className="h-5 w-5" />
            </Button>
          )}
          <h1 className={cn('text-xl font-bold', !showSidebarToggle && 'pl-4')}>
            React Template
          </h1>
        </div>

        <div className="flex items-center gap-3 mr-4">
          <Switch
            checked={isDark}
            onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
            aria-label="Toggle theme"
            icon={isDark ? <Moon /> : <Sun />}
            className="h-7 w-12 [&>[data-slot=switch-thumb]]:h-6 [&>[data-slot=switch-thumb]]:w-6 [&>[data-slot=switch-thumb]]:data-[state=checked]:translate-x-5 [&>[data-slot=switch-thumb]_svg]:h-4 [&>[data-slot=switch-thumb]_svg]:w-4"
          />
        </div>
      </div>
    </header>
  )
}
