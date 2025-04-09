import {
  ClipboardList,
  Home,
  LogOut,
  Menu,
  Settings,
  User,
} from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface NavbarProps {
  username: string;
  handleLogout: () => void;
}

export const Navbar = ({ username, handleLogout }: NavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <ClipboardList className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-800">
              TaskMaster
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <a
              href="#"
              className="flex items-center px-3 py-2 text-gray-700 hover:text-blue-600 font-medium"
            >
              <Home size={18} className="mr-1" /> Dashboard
            </a>
            <a
              href="#"
              className="flex items-center px-3 py-2 text-gray-700 hover:text-blue-600 font-medium"
            >
              <Settings size={18} className="mr-1" /> Settings
            </a>
          </nav>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center focus:ring-0"
                >
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src="/placeholder-avatar.png" />
                    <AvatarFallback className="bg-blue-100 text-blue-800">
                      {username.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{username}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer text-red-600"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 py-2">
          <div className="container mx-auto px-4">
            <div className="space-y-1">
              <a
                href="#"
                className="flex items-center px-3 py-2 text-gray-700 hover:text-blue-600 font-medium"
              >
                <Home size={18} className="mr-2" /> Dashboard
              </a>
              <a
                href="#"
                className="flex items-center px-3 py-2 text-gray-700 hover:text-blue-600 font-medium"
              >
                <Settings size={18} className="mr-2" /> Settings
              </a>
              <a
                href="#"
                className="flex items-center px-3 py-2 text-gray-700 hover:text-blue-600 font-medium"
              >
                <User size={18} className="mr-2" /> Profile
              </a>
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-3 py-2 text-left text-red-600 hover:text-red-700 font-medium"
              >
                <LogOut size={18} className="mr-2" /> Log out
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
