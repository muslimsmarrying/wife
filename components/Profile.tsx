'use client';

import { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebaseConfig';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const [formData, setFormData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const auth = getAuth();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push('/sign-in');
      } else {
        fetchProfile(user.uid);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchProfile = async (uid: string) => {
    const userRef = doc(db, 'users', uid);
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      setFormData(docSnap.data());
    }
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    const user = auth.currentUser;
    if (!user) return;
    const userRef = doc(db, 'users', user.uid);
    await updateDoc(userRef, formData);
    toast.success('Profile updated!');
};

if (loading || !formData) return <p className="p-6">Loading...</p>;

    const profileImage =
    formData.gender === 'male'
        ? '/male.png'
        : '/female.png';

    return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-xl overflow-hidden">
        <div className="flex flex-col md:flex-row h-full">
          {/* Profile Image Section */}
          <div className="md:w-1/3 bg-pink-100 flex items-center justify-center p-6">
            <img
              src={profileImage}
              alt="Profile"
              className="w-40 h-40 rounded-full object-cover shadow-lg"
            />
          </div>

          {/* Profile Info */}
          <div className="md:w-2/3 p-6 space-y-6 overflow-y-auto max-h-[85vh]">
            <h2 className="text-2xl font-bold text-gray-800">
              {formData.firstName} {formData.lastName}
            </h2>
            <p className="text-gray-600">{formData.email}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: 'Whatsapp', name: 'phone' },
                { label: 'Gender', name: 'gender' },
                { label: 'Date of Birth', name: 'dateOfBirth', type: 'date' },
                { label: 'Country', name: 'country' },
                { label: 'City', name: 'city' },
                { label: 'Marital Status', name: 'maritalStatus' },
                { label: 'Height', name: 'height' },
                { label: 'Education', name: 'education' },
                { label: 'Profession', name: 'profession' },
                { label: 'Income', name: 'income' }
              ].map((field) => (
                <div key={field.name} className="flex flex-col">
                  <label className="text-sm text-gray-700 mb-1">{field.label}</label>
                  <Input
                    name={field.name}
                    type={field.type || 'text'}
                    value={formData[field.name] || ''}
                    onChange={handleChange}
                    placeholder={`Enter your ${field.label}`}
                  />
                </div>
              ))}
            </div>

            <div className="flex flex-col">
              <label className="text-sm text-gray-700 mb-1">About</label>
              <Textarea
                name="about"
                value={formData.about}
                onChange={handleChange}
                placeholder="Tell us something about yourself"
              />
            </div>

            <Button onClick={handleUpdate}>Update Profile</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
