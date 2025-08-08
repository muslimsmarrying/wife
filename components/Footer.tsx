"use client"
import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-800 text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-red-500 rounded-full p-2">
                <Heart className="w-5 h-5 text-white" fill="currentColor" />
              </div>
              <span className="text-xl font-bold">
                WIFE<span className="text-red-500">4</span>LIFE
              </span>
            </div>
            <p className="text-slate-300 mb-6 leading-relaxed">
              Connecting Muslim hearts worldwide with dignity and respect.
            </p>
            <div className="flex items-start gap-4">
              <img 
                src="/male.png" 
                alt="Muslim Character" 
                className="w-24 h-auto"
                onError={(e) => {
                  // Fallback if image doesn't load
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
              <div className="bg-yellow-400 text-slate-800 px-3 py-2 rounded-lg relative">
                <span className="font-medium text-sm">Do it the Halal way.</span>
                <div className="absolute -left-2 top-3 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-r-4 border-r-yellow-400"></div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-slate-300 hover:text-white transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-white transition-colors">
                  Success Stories
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-slate-300 hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-white transition-colors">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-white transition-colors">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-3 text-slate-300">
              <p>
                <a href="mailto:wife4life@mail.co.uk" className="hover:text-white transition-colors">
                  wife4life@mail.co.uk
                </a>
              </p>
              <div>
                <p className="font-medium mb-1">Address:</p>
                <p className="text-sm leading-relaxed">
                  JPJ7+7GM, At-Thamiri Street<br />
                  Ad-Dirah, Riyadh<br />
                  Kingdom of Saudi Arabia (KSA)
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-8 pt-8 text-center">
          <p className="text-slate-400 text-sm">
            © 2024 Wife4Life. All rights reserved. | Connecting hearts the Halal way.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;