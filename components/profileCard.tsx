'use client';

import Image from "next/image";

interface Profile {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  city: string;
  education: string;
  profession: string;
  country: string;
  gender: string;
  maritalStatus: string;
  income: string
}

interface Props {
  profile: Profile;
  isSubscribed: boolean;
  onContactClick: (profile: any) => void;
}

const calculateAge = (dob: string): number => {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

export default function ProfileCard({ profile, isSubscribed, onContactClick }: Props) {
  const getProfileImage = (gender: string) =>
    gender === 'female' ? '/female.png' : '/male.png';

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      <div className="relative">
        <Image
            width={128}
            height={128}
            src={getProfileImage(profile.gender)}
            alt={"profile-image"}
            className="w-32 h-32 rounded-full object-cover mx-auto mt-6 mb-4 bg-gray-100"
            />
        <div className="absolute top-4 right-4 bg-pink-500 text-white px-2 py-1 rounded text-xs font-medium">
          Verified
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{profile.firstName}{' '}{profile.lastName}</h3>
        <div className="space-y-2 text-sm text-gray-600 mb-4">
          <div className="flex items-center">
            <i className="ri-cake-2-line w-4 h-4 mr-2"></i>
            <span>{calculateAge(profile.dateOfBirth)} years old</span>

          </div>
          <div className="flex items-center">
            <i className="ri-map-pin-line w-4 h-4 mr-2"></i>
            <span>{profile.country}</span>
          </div>
          <div className="flex items-center">
            <i className="ri-map-pin-line w-4 h-4 mr-2"></i>
            <span>{profile.city}</span>
          </div>
          <div className="flex items-center">
            <i className="ri-graduation-cap-line w-4 h-4 mr-2"></i>
            <span>{profile.education}</span>
          </div>
          <div className="flex items-center">
            <i className="ri-briefcase-line w-4 h-4 mr-2"></i>
            <span>{profile.profession}</span>
          </div>
           <div className="flex items-center">
            <i className="ri-briefcase-line w-4 h-4 mr-2"></i>
            <span>{profile.maritalStatus}</span>
          </div>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => onContactClick(profile)}
            className="flex-1 bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded-lg font-medium transition-colors"
          >
            {isSubscribed ? 'View Contact' : 'Get Contact'}
          </button>
          <button className="w-10 h-10 border border-gray-300 hover:border-pink-500 text-gray-600 hover:text-pink-500 rounded-lg flex items-center justify-center">
            <i className="ri-heart-line"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
