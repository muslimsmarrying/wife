'use client';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ProfileCard from '@/components/profileCard';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db, auth } from '@/lib/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

export default function Browse() {
  const [filters, setFilters] = useState({
    ageRange: 'all',
    country: 'all',
    education: 'all',
    profession: 'all',
    city: 'all',
    search: '',
  });

  const [profiles, setProfiles] = useState<any[]>([]);
  const [selectedProfile, setSelectedProfile] = useState<any>(null);
  const [showContactModal, setShowContactModal] = useState(false);
  const [userId, setUserId] = useState('');
  const [userSubscription, setUserSubscription] = useState({
    isSubscribed: false,
    subscriptionType: null,
    isApproved: false,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Wait for authentication state
        if (!auth.currentUser) {
          setError('Please log in to view profiles');
          return;
        }

        const snapshot = await getDocs(collection(db, 'users'));
        const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        console.log('Fetched profiles:', data.length);
        setProfiles(data);
      } catch (err) {
        console.error('Error fetching profiles:', err);
        setError('Failed to load profiles. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    const fetchCurrentUserStatus = async (uid: string) => {
      try {
        const q = query(collection(db, 'subscriptions'), where('userId', '==', uid));
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          const data = snapshot.docs[0].data();
          setUserSubscription({
            isSubscribed: data.paymentStatus === 'approved',
            subscriptionType: data.subscriptionType || null,
            isApproved: data.paymentStatus === 'approved',
          });
        }
      } catch (err) {
        console.error('Error fetching subscription status:', err);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        fetchCurrentUserStatus(user.uid);
        fetchProfiles();
      } else {
        setLoading(false);
        setError('Please log in to view profiles');
      }
    });

    return () => unsubscribe();
  }, []);

  const handleContactClick = (profile: any) => {
    setSelectedProfile(profile);
    setShowContactModal(true);
  };

  const getProfileImage = (gender: string) =>
    gender === 'female' ? '/female.png' : '/male.png';

  const searchTerm = filters.search.trim().toLowerCase();

  const filteredProfiles = profiles.filter((profile) => {
    const matchesAge =
      filters.ageRange === 'all' ||
      (profile.age >= Number(filters.ageRange.split('-')[0]) &&
        profile.age <= Number(filters.ageRange.split('-')[1]));

    const matchesLocation =
      filters.country === 'all' || profile.country?.toLowerCase().includes(filters.country);

    const matchesCity =
      filters.city === 'all' || profile.city?.toLowerCase().includes(filters.city);

    const matchesEducation =
      filters.education === 'all' || profile.education?.toLowerCase().includes(filters.education);

    const matchesProfession =
      filters.profession === 'all' || profile.profession?.toLowerCase().includes(filters.profession);

    const matchesSearch =
      searchTerm === '' ||
      `${profile.firstName} ${profile.lastName}`.toLowerCase().includes(searchTerm) ||
      profile.city?.toLowerCase().includes(searchTerm) ||
      profile.country?.toLowerCase().includes(searchTerm) ||
      profile.profession?.toLowerCase().includes(searchTerm) ||
      profile.education?.toLowerCase().includes(searchTerm);

    return (
      matchesAge && matchesLocation && matchesEducation && matchesProfession && matchesSearch && matchesCity
    );
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="py-8 px-6 max-w-7xl mx-auto">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading profiles...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="py-8 px-6 max-w-7xl mx-auto">
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-error-warning-line text-2xl text-red-500"></i>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Profiles</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-lg"
            >
              Try Again
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="py-8 px-6 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Profiles</h1>
        <p className="text-gray-600 mb-6">Find your perfect match from verified profiles</p>

        {userSubscription.isApproved && !userSubscription.isSubscribed && (
          <div className="bg-green-100 border border-green-200 rounded-lg p-4 mb-8">
            <div className="flex items-center">
              <i className="ri-check-line text-green-600 w-5 h-5 mr-3"></i>
              <p className="text-green-800 font-medium">You are now an approved user.</p>
            </div>
          </div>
        )}

        {!userSubscription.isSubscribed && !userSubscription.isApproved && (
          <div className="bg-pink-50 border border-pink-200 rounded-lg p-4 mb-8">
            <div className="flex items-center">
              <i className="ri-information-line text-pink-500 w-5 h-5 mr-3"></i>
              <div>
                <p className="text-pink-800">
                  <strong>Premium Required:</strong> Subscribe for $50 lifetime to view contact details.
                </p>
                <Link href="/subscription" className="text-pink-600 hover:text-pink-700 font-medium">
                  Get Premium Access →
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by name, city, country, profession, or education"
            onChange={(e) => setFilters({ ...filters, search: e.target.value.toLowerCase() })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500"
          />
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8 grid md:grid-cols-4 gap-4">
          <select
            value={filters.ageRange}
            onChange={(e) => setFilters({ ...filters, ageRange: e.target.value })}
            className="border px-3 py-2 rounded-lg"
          >
            <option value="all">All Ages</option>
            <option value="20-25">20-25</option>
            <option value="25-30">25-30</option>
            <option value="30-35">30-35</option>
            <option value="35-40">35-40</option>
            <option value="40-50">40-50</option>
          </select>

          <select
            value={filters.country}
            onChange={(e) => setFilters({ ...filters, country: e.target.value })}
            className="border px-3 py-2 rounded-lg"
          >
            <option value="all">All Countries</option>
            <option value="usa">USA</option>
            <option value="uk">UK</option>
            <option value="canada">Canada</option>
            <option value="australia">Australia</option>
            <option value="pakistan">Pakistan</option>
            <option value="india">India</option>
          </select>

          <select
            value={filters.education}
            onChange={(e) => setFilters({ ...filters, education: e.target.value })}
            className="border px-3 py-2 rounded-lg"
          >
            <option value="all">All Education</option>
            <option value="bachelor">Bachelor's</option>
            <option value="master">Master's</option>
            <option value="phd">PhD</option>
            <option value="diploma">Diploma</option>
          </select>

          <select
            value={filters.profession}
            onChange={(e) => setFilters({ ...filters, profession: e.target.value })}
            className="border px-3 py-2 rounded-lg"
          >
            <option value="all">All Professions</option>
            <option value="doctor">Doctor</option>
            <option value="engineer">Engineer</option>
            <option value="teacher">Teacher</option>
            <option value="business">Business</option>
            <option value="student">Student</option>
          </select>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredProfiles.length} of {profiles.length} profiles
          </p>
        </div>

        {/* Profiles Grid */}
        {filteredProfiles.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-search-line text-2xl text-gray-400"></i>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No profiles found</h3>
            <p className="text-gray-600">Try adjusting your search filters</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProfiles.map((profile) => (
              <ProfileCard
                key={profile.id}
                profile={profile}
                isSubscribed={userSubscription.isSubscribed}
                onContactClick={handleContactClick}
              />
            ))}
          </div>
        )}

        {/* Contact Modal */}
        {showContactModal && selectedProfile && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Contact Details</h3>
                <button
                  onClick={() => setShowContactModal(false)}
                  className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full"
                >
                  <i className="ri-close-line text-xl text-gray-500"></i>
                </button>
              </div>

              {userSubscription.isSubscribed ? (
                <div className="space-y-4 text-center">
                  <img
                    src={getProfileImage(selectedProfile.gender)}
                    alt={selectedProfile.firstName}
                    className="w-20 h-20 rounded-full mx-auto mb-2 object-cover bg-gray-100"
                  />
                  <p className="font-medium">{selectedProfile.firstName} {selectedProfile.lastName}</p>
                  {selectedProfile.phone && <p>{selectedProfile.phone}</p>}
                  {selectedProfile.email && <p>{selectedProfile.email}</p>}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="ri-lock-line text-2xl text-pink-500"></i>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Premium Access Required</h4>
                  <p className="text-gray-600 mb-4">
                    Subscribe to view contact details for {selectedProfile.firstName}.
                  </p>
                  <Link
                    href="/subscription"
                    className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-lg font-medium"
                  >
                    Get Premium Access
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}