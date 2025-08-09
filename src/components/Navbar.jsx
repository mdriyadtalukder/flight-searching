import { useState } from "react";
import { Plane, Menu, X, User, Bell, Globe } from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Link } from "react-router-dom";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-while w-[90%] mx-auto bg-white rounded-4xl  backdrop-blur-md  sticky top-0 z-50 shadow-2xl">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="bg-purple-600 rounded-full p-2">
              <Plane className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-purple-600">SkySearch</h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#"
              className="text-purple-600 hover:text-purple-600 transition-colors font-medium"
            >
              Flights
            </a>
            <a
              href="#"
              className="text-purple-600 hover:text-purple-600 transition-colors font-medium"
            >
              Hotels
            </a>
            <a
              href="#"
              className="text-purple-600 hover:text-purple-600 transition-colors font-medium"
            >
              Car Rentals
            </a>
            <a
              href="#"
              className="text-purple-600 hover:text-purple-600 transition-colors font-medium"
            >
              Deals
            </a>
            <a
              href="#"
              className="text-purple-600 hover:text-purple-600 transition-colors font-medium"
            >
              My Trips
            </a>
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-purple-600 hover:bg-purple-600/10"
                >
                  <Globe className="w-4 h-4 mr-2" />
                  EN
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>English</DropdownMenuItem>
                <DropdownMenuItem>Español</DropdownMenuItem>
                <DropdownMenuItem>Français</DropdownMenuItem>
                <DropdownMenuItem>Deutsch</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Notifications */}
            <Button
              variant="ghost"
              size="sm"
              className="text-purple-600 hover:bg-purple-600/10 relative"
            >
              <Bell className="w-4 h-4" />
              <Badge className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-5 h-5 rounded-full p-0 flex items-center justify-center">
                2
              </Badge>
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-purple-600 hover:bg-purple-600/10"
                >
                  <User className="w-4 h-4 mr-2" />
                  Account
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Bookings</DropdownMenuItem>
                <DropdownMenuItem>Preferences</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Sign Out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden text-purple-600 hover:bg-purple-600/10"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-purple-600/10 backdrop-blur-md border-t border-purple-600/20">
            <div className="px-4 py-4 space-y-3">
              <a
                href="#"
                className="block text-purple-600 hover:text-purple-600 transition-colors font-medium py-2"
              >
                Flights
              </a>
              <a
                href="#"
                className="block text-purple-600 hover:text-purple-600 transition-colors font-medium py-2"
              >
                Hotels
              </a>
              <a
                href="#"
                className="block text-purple-600 hover:text-purple-600 transition-colors font-medium py-2"
              >
                Car Rentals
              </a>
              <a
                href="#"
                className="block text-purple-600 hover:text-purple-600 transition-colors font-medium py-2"
              >
                Deals
              </a>
              <a
                href="#"
                className="block text-purple-600 hover:text-purple-600 transition-colors font-medium py-2"
              >
                My Trips
              </a>
              <div className="border-t border-purple-600/20 pt-3 mt-3">
                <a
                  href="#"
                  className="block text-purple-600 hover:text-purple-600 transition-colors font-medium py-2"
                >
                  Account
                </a>
                <a
                  href="#"
                  className="block text-purple-600 hover:text-purple-600 transition-colors font-medium py-2"
                >
                  Notifications
                </a>
                <a
                  href="#"
                  className="block text-purple-600 hover:text-purple-600 transition-colors font-medium py-2"
                >
                  Language
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
