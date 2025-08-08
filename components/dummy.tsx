'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface Profile {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female';
  avatar: string;
  description: string;
  location: string;
  profession: string;
  education: string;
  contact: {
    phone: string;
    email: string;
  };
}

type Props = {
  hasSubscription?: boolean;
}

const ProfileCards = ({ hasSubscription = false }: Props) => {
  const router = useRouter();

  // Sample profile data
  const profiles: Profile[] = [
    {
      id: '1',
      name: 'Ahmed Khan',
      age: 29,
      gender: 'Male',
      avatar: '/api/placeholder/200/200',
      description: 'Practicing Sunni Muslim who values faith, honesty, and family life. Seeking a pious partner for a halal marriage.',
      location: 'Karachi, Pakistan',
      profession: 'Software Engineer',
      education: 'Masters in Computer Science',
      contact: {
        phone: '+92-300-1234567',
        email: 'ahmed.khan@email.com'
      }
    },
    {
      id: '2',
      name: 'Fatima Zahra',
      age: 25,
      gender: 'Female',
      avatar: '/api/placeholder/200/200',
      description: 'Modest and respectful sister, committed to Islamic values. Looking for a righteous Sunni Muslim husband.',
      location: 'Lahore, Pakistan',
      profession: 'Teacher',
      education: 'Bachelors in Education',
      contact: {
        phone: '+92-321-7654321',
        email: 'fatima.zahra@email.com'
      }
    },
    {
      id: '3',
      name: 'Usman Farooq',
      age: 30,
      gender: 'Male',
      avatar: '/api/placeholder/200/200',
      description: 'Sunni Muslim who follows the Sunnah and values sincerity. Wants to build a faith-centered home with a practicing wife.',
      location: 'Islamabad, Pakistan',
      profession: 'Doctor',
      education: 'MBBS',
      contact: {
        phone: '+92-333-9876543',
        email: 'usman.farooq@email.com'
      }
    }
  ];

  const handleSignUp = () => {
    router.push('/register');
  };

  const handleContactClick = (profileId: string) => {
    if (!hasSubscription) {
      // Show subscription modal or redirect to subscription page
      alert('You need a premium subscription to view contact information. Please upgrade your account.');
      router.push('/subscription');
    } else {
      // Show contact information
      const profile = profiles.find(p => p.id === profileId);
      if (profile) {
        alert(`Contact Info:\nPhone: ${profile.contact.phone}\nEmail: ${profile.contact.email}`);
      }
    }
  };

  return (
    <section className="py-12 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {profiles.map((profile) => (
            <div key={profile.id} className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow">
              {/* Profile Avatar */}
              <div className="flex justify-center mb-4">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                  {profile.gender === 'Male' ? (
                    // Male silhouette
                    <svg viewBox="0 0 100 100" className="w-20 h-20">
                      <circle cx="50" cy="35" r="15" fill="#000" />
                      <path d="M20 85 Q50 65 80 85 L80 100 L20 100 Z" fill="#000" />
                      <rect x="45" y="50" width="10" height="15" fill="#000" />
                    </svg>
                  ) : (
                    // Female silhouette with hijab
                    <svg viewBox="0 0 100 100" className="w-20 h-20">
                      <path d="M25 25 Q50 15 75 25 Q75 45 70 55 Q50 65 30 55 Q25 45 25 25 Z" fill="#000" />
                      <rect x="45" y="40" width="2" height="2" fill="white" />
                      <rect x="53" y="40" width="2" height="2" fill="white" />
                      <path d="M20 75 Q50 55 80 75 L80 100 L20 100 Z" fill="#000" />
                    </svg>
                  )}
                </div>
              </div>

              {/* Profile Info */}
              <div className="text-center mb-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {profile.name}
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  {profile.age} years old • {profile.gender}
                </p>
              </div>

              {/* About Me Section */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-red-600 mb-2">About Me</h4>
                <p className="text-gray-700 text-sm leading-relaxed mb-3">
                  {profile.description}
                </p>
              </div>

              {/* Blurred Contact Information */}
              <div className="mb-4 relative">
                <div className={`${!hasSubscription ? 'filter blur-sm' : ''}`}>
                  <p className="text-xs text-gray-500 mb-1">
                    <strong>Location:</strong> {profile.location}
                  </p>
                  <p className="text-xs text-gray-500 mb-1">
                    <strong>Profession:</strong> {profile.profession}
                  </p>
                  <p className="text-xs text-gray-500">
                    <strong>Education:</strong> {profile.education}
                  </p>
                </div>
                {!hasSubscription && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button
                      onClick={() => handleContactClick(profile.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs font-medium transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                )}
              </div>

              {/* Contact Button */}
              {hasSubscription && (
                <button
                  onClick={() => handleContactClick(profile.id)}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded text-sm font-medium transition-colors"
                >
                  Contact Information
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Sign Up CTA */}
        <div className="text-center">
          <button
            onClick={handleSignUp}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-md font-semibold transition-colors"
          >
            Sign Up Today To See Full Profiles
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProfileCards;