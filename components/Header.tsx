'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, getAuth, User } from 'firebase/auth';
import { app } from '@/lib/firebaseConfig';
import { useRouter } from 'next/navigation';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  const auth = getAuth(app);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsAuthChecked(true);
    });
    return () => unsubscribe();
  }, [auth]);

  return (
    <header className="bg-white shadow-sm border-b ">
      <nav className="px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
              <i className="ri-heart-fill text-white text-lg"></i>
            </div>
            <span className="text-xl font-bold text-gray-800">WIFE4LIFE</span>
          </Link>

     

          <div className="hidden md:flex items-center space-x-4">
            
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/how-it-works" className="text-gray-700 hover:text-red-600 transition-colors">
              How It Works
            </Link>
          </div>
            {isAuthChecked && (
              user ? (
                <div className="relative group cursor-pointer">
                  <div className="w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center">
                    <i className="ri-user-line text-lg"></i>
                  </div>
                  <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md opacity-0 group-hover:opacity-100 transition-all z-50">
                    <Link href="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      Profile
                    </Link>
                    <Link href="/profile/billing" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      Billing
                    </Link>
                    <button
                      onClick={() => {
                        auth.signOut();
                        router.push('/');
                      }}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <Link href="/sign-in" className="text-gray-700 hover:text-red-600 transition-colors">
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md transition-colors whitespace-nowrap"
                  >
                    Sign Up
                  </Link>
                </>
              )
            )}
          </div>

          <button
            className="md:hidden w-6 h-6 flex items-center justify-center cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <i className={`ri-${isMenuOpen ? 'close' : 'menu'}-line text-xl`}></i>
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link href="/how-it-works" className="text-gray-700 hover:text-red-600 transition-colors">
                How It Works
              </Link>

              {isAuthChecked && (
                user ? (
                  <>
                    <Link href="/profile" className="text-gray-700 hover:text-red-600 transition-colors">
                      Profile
                    </Link>
                    <Link href="/billing" className="text-gray-700 hover:text-red-600 transition-colors">
                      Billing
                    </Link>
                    <button
                      onClick={() => {
                        auth.signOut();
                        router.push('/');
                      }}
                      className="text-left text-gray-700 hover:text-red-600 transition-colors"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/sign-in" className="text-gray-700 hover:text-red-600 transition-colors">
                      Login
                    </Link>
                    <Link
                      href="/register"
                      className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md transition-colors text-center"
                    >
                      Sign Up
                    </Link>
                  </>
                )
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}