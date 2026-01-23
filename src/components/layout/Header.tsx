import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useUIStore } from "@/store/uiStore";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export function Header() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  const sidebarOpen = useUIStore((state) => state.sidebarOpen);
  const toggleSidebar = useUIStore((state) => state.toggleSidebar);
  const isMobile = useMediaQuery("(max-width: 1023px)");

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-4">
          {isMobile && (
            <Button variant="ghost" size="icon" onClick={toggleSidebar}>
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          )}
          <h1 className="text-xl font-bold">React Template</h1>
        </div>

        <div className="flex items-center gap-3">
          <Switch
            checked={isDark}
            onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
            aria-label="Toggle theme"
            icon={isDark ? <Moon /> : <Sun />}
            className="h-7 w-12 [&>[data-slot=switch-thumb]]:h-6 [&>[data-slot=switch-thumb]]:w-6 [&>[data-slot=switch-thumb]]:data-[state=checked]:translate-x-5 [&>[data-slot=switch-thumb]_svg]:h-4 [&>[data-slot=switch-thumb]_svg]:w-4"
          />
        </div>
      </div>
    </header>
  );
}
