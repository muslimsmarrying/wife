'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

type Props = {}

const Search = (props: Props) => {
  const router = useRouter();
  const [ageRange, setAgeRange] = useState('');
  const [country, setCountry] = useState('');
  const [gender, setGender] = useState('');

  const handleSearch = () => {
    // Redirect to browse page with search parameters
    const searchParams = new URLSearchParams();
    if (ageRange) searchParams.append('age', ageRange);
    if (country) searchParams.append('country', country);
    if (gender) searchParams.append('gender', gender);
    
    const queryString = searchParams.toString();
    const redirectUrl = queryString ? `/browse?${queryString}` : '/browse';
    
    router.push(redirectUrl);
  };

  return (
    <section className="py-12 px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-8">
          Search
        </h2>
        
        <div className="bg-white rounded-lg shadow-sm border p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Age Range Dropdown */}
            <div className="relative">
              <select 
                value={ageRange}
                onChange={(e) => setAgeRange(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 appearance-none cursor-pointer"
              >
                <option value="">Age Range</option>
                <option value="18-25">18-25 years</option>
                <option value="26-30">26-30 years</option>
                <option value="31-35">31-35 years</option>
                <option value="36-40">36-40 years</option>
                <option value="41-45">41-45 years</option>
                <option value="46-50">46-50 years</option>
                <option value="50+">50+ years</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg className="w-4 h-4 fill-current text-gray-400" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path>
                </svg>
              </div>
            </div>

            {/* Country Dropdown */}
            <div className="relative">
              <select 
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 appearance-none cursor-pointer"
              >
                <option value="">Country</option>
                <option value="pakistan">Pakistan</option>
                <option value="india">India</option>
                <option value="bangladesh">Bangladesh</option>
                <option value="turkey">Turkey</option>
                <option value="egypt">Egypt</option>
                <option value="saudi-arabia">Saudi Arabia</option>
                <option value="uae">UAE</option>
                <option value="usa">USA</option>
                <option value="uk">United Kingdom</option>
                <option value="canada">Canada</option>
                <option value="australia">Australia</option>
                <option value="other">Other</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg className="w-4 h-4 fill-current text-gray-400" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path>
                </svg>
              </div>
            </div>

            {/* Gender Dropdown */}
            <div className="relative">
              <select 
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 appearance-none cursor-pointer"
              >
                <option value="">Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg className="w-4 h-4 fill-current text-gray-400" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path>
                </svg>
              </div>
            </div>
          </div>

          {/* Search Button */}
          <button 
            onClick={handleSearch}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-md font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Search Profiles
          </button>
        </div>
      </div>
    </section>
  )
}

export default Search