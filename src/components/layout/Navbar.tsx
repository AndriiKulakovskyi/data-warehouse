import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  Bell,
  User,
  LogOut,
  Settings,
  ChevronDown,
  Shield,
} from "lucide-react";
import { useAuth } from "../auth/AuthContext";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import AuthModal from "../auth/AuthModal";

interface NavbarProps {
  onSearch?: (query: string) => void;
}

const Navbar = ({
  onSearch = (query) => console.log("Search query:", query),
}: NavbarProps) => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const username = user?.username || "Guest";
  const avatarUrl =
    user?.avatarUrl ||
    `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`;
  const [searchQuery, setSearchQuery] = useState("");
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleSignIn = () => {
    setAuthMode("login");
    setShowAuthModal(true);
  };

  const handleRegister = () => {
    setAuthMode("signup");
    setShowAuthModal(true);
  };

  const handleCloseAuthModal = () => {
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleProfileClick = () => {
    navigate("/account");
  };

  const handleAdminClick = () => {
    navigate("/admin");
  };

  return (
    <nav className="w-full h-16 px-4 border-b bg-background flex items-center justify-between">
      <div className="flex items-center gap-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold">CD</span>
          </div>
          <span className="font-semibold text-lg">Clinical Datasets</span>
        </Link>

        <form onSubmit={handleSearch} className="relative w-64 hidden md:block">
          <Input
            type="search"
            placeholder="Search datasets..."
            className="pr-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            type="submit"
            className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground"
            aria-label="Search"
          >
            <Search className="h-4 w-4" />
          </button>
        </form>
      </div>

      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          <>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={avatarUrl} alt={username} />
                    <AvatarFallback>{username.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="hidden md:inline-block">{username}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleProfileClick}>
                  <User className="mr-2 h-4 w-4" />
                  <span>My Account</span>
                </DropdownMenuItem>
                {user?.isAdmin && (
                  <DropdownMenuItem onClick={handleAdminClick}>
                    <Shield className="mr-2 h-4 w-4" />
                    <span>Admin Dashboard</span>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <>
            <Button variant="ghost" onClick={handleSignIn}>
              Sign In
            </Button>
            <Button onClick={handleRegister}>Register</Button>
          </>
        )}
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={handleCloseAuthModal}
        initialMode={authMode}
      />
    </nav>
  );
};

export default Navbar;
