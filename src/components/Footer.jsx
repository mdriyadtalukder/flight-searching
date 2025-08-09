import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Plane, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"
const Footer = () => {
return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-purple-600 p-2 rounded-lg">
                <Plane className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">FlightFinder</span>
            </div>
            <p className="text-gray-600 text-sm">
              Your trusted partner for finding the best flight deals worldwide. Compare prices, book instantly, and
              travel with confidence.
            </p>
            <div className="flex space-x-3">
              <Link href="#" className="text-gray-400 hover:text-purple-600 transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-purple-600 transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-purple-600 transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-purple-600 transition-colors">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-600 hover:text-purple-600 transition-colors text-sm">
                  Search Flights
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-purple-600 transition-colors text-sm">
                  Flight Status
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-purple-600 transition-colors text-sm">
                  Manage Booking
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-purple-600 transition-colors text-sm">
                  Check-in Online
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-purple-600 transition-colors text-sm">
                  Travel Deals
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Popular Destinations</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-600 hover:text-purple-600 transition-colors text-sm">
                  New York
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-purple-600 transition-colors text-sm">
                  London
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-purple-600 transition-colors text-sm">
                  Paris
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-purple-600 transition-colors text-sm">
                  Tokyo
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-purple-600 transition-colors text-sm">
                  Dubai
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Stay Updated</h3>
            <p className="text-gray-600 text-sm">Subscribe to get the latest flight deals and travel tips.</p>
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="border-gray-300 focus:border-purple-600 focus:ring-purple-600"
              />
              <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">Subscribe</Button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <div className="bg-purple-100 p-2 rounded-lg">
                <Phone className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">24/7 Support</p>
                <p className="text-sm text-gray-600">+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-purple-100 p-2 rounded-lg">
                <Mail className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Email Support</p>
                <p className="text-sm text-gray-600">support@flightfinder.com</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-purple-100 p-2 rounded-lg">
                <MapPin className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Headquarters</p>
                <p className="text-sm text-gray-600">New York, NY 10001</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-wrap gap-6">
              <Link href="#" className="text-sm text-gray-600 hover:text-purple-600 transition-colors">
                About Us
              </Link>
              <Link href="#" className="text-sm text-gray-600 hover:text-purple-600 transition-colors">
                Help Center
              </Link>
              <Link href="#" className="text-sm text-gray-600 hover:text-purple-600 transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-sm text-gray-600 hover:text-purple-600 transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="text-sm text-gray-600 hover:text-purple-600 transition-colors">
                Cookie Policy
              </Link>
            </div>
            <p className="text-sm text-gray-600">© {new Date().getFullYear()} FlightFinder. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}


export default Footer