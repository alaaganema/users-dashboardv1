import { memo } from "react";
// import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
// import { LogOut, Users } from "lucide-react";
import { Users } from "lucide-react";

export const Navbar = memo(function Navbar() {
  // const { user, logout } = useAuth();
  const { user } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            <h1 className="text-2xl font-semibold hidden md:block">
              Users Dashboard
            </h1>
          </div>
          <div className="flex items-center gap-4">
            {user && (
              <div className="text-sm text-muted-foreground">
                <span className="font-medium">Alaa Ganema</span>
                <span className="mx-2">•</span>
                <span>Administrator</span>
              </div>
            )}
            {/* <Button variant="outline" size="sm" onClick={logout}>
              <LogOut className="h-4 w-4 md:mr-2" />
              <span className="hidden md:block">Logout</span>
            </Button> */}
          </div>
        </div>
      </div>
    </nav>
  );
});
