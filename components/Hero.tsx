import Link from 'next/link'
import React from 'react'

type Props = {}

const Hero = (props: Props) => {
  return (
    <section className="relative py-20 px-6 overflow-hidden bg-gray-50">
      <div className="relative max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          Find Your Ideal 
          <span className="text-red-600"> Life Partner</span>
        </h1>
        <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
          Connect with compatible Muslims in a safe, respectful environment designed for serious matrimonial intentions.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link href="/register" className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-md font-semibold transition-colors cursor-pointer whitespace-nowrap text-center">
            Sign Up Today
          </Link>
          <Link href="/browse" className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-8 py-3 rounded-md font-semibold transition-colors cursor-pointer whitespace-nowrap text-center">
            Browse Profiles
          </Link>
        </div>
        
        {/* Feature indicators */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-gray-700 font-medium">100% Halal</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-gray-700 font-medium">Verified Profiles</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span className="text-gray-700 font-medium">Online Nikah Service</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero