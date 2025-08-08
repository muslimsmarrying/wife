'use client';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '@/lib/firebaseConfig';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { toast } from 'sonner';

export default function Register() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    // Personal Info
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    dateOfBirth: '',
    aboutMe: '',
    expectations: '',
    healthConditions: '',
    
    // Religious Info
    sunniMuslim: '',
    revertMuslim: '',
    prayerFrequency: '',
    quranReading: '',
    hijabPreference: '',
    beardPreference: '',
    
    // Family & Background
    maritalStatus: '',
    children: '',
    wantChildren: '',
    nationality: '',
    motherTongue: '',
    languagesKnown: '',
    country: '',
    city: '',
    
    // Career & Education
    educationLevel: '',
    occupation: '',
    annualIncome: '',
    phone: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData({...formData, [field]: value});
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const validatePassword = (pwd: string) => {
    return pwd.length > 8 && /\d/.test(pwd) && /_/.test(pwd);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    if (!validatePassword(formData.password)) {
      toast.error('Password must be >8 characters, include a number and an underscore (_)');
      setIsSubmitting(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords don't match");
      setIsSubmitting(false);
      return;
    }

    try {
      // 1. Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      // 2. Check if profile already exists
      const userDocRef = doc(db, 'users', user.uid);
      const userSnapshot = await getDoc(userDocRef);

      if (!userSnapshot.exists()) {
        // 3. Save complete profile
        await setDoc(userDocRef, {
          // Personal Info
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          gender: formData.gender,
          dateOfBirth: formData.dateOfBirth,
          aboutMe: formData.aboutMe,
          expectations: formData.expectations,
          healthConditions: formData.healthConditions,
          
          // Religious Info
          sunniMuslim: formData.sunniMuslim,
          revertMuslim: formData.revertMuslim,
          prayerFrequency: formData.prayerFrequency,
          quranReading: formData.quranReading,
          hijabPreference: formData.hijabPreference,
          beardPreference: formData.beardPreference,
          
          // Family & Background
          maritalStatus: formData.maritalStatus,
          children: formData.children,
          wantChildren: formData.wantChildren,
          nationality: formData.nationality,
          motherTongue: formData.motherTongue,
          languagesKnown: formData.languagesKnown,
          country: formData.country,
          city: formData.city,
          
          // Career & Education
          educationLevel: formData.educationLevel,
          occupation: formData.occupation,
          annualIncome: formData.annualIncome,
          
          createdAt: new Date().toISOString(),
        });
      }

      toast.success("Profile created successfully!");
      router.push('/dashboard'); // Redirect to dashboard or wherever appropriate

    } catch (error: any) {
      console.error("Registration error:", error.message);
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepTitles = [
    'Personal Info',
    'Religious Info', 
    'Family & Background',
    'Career & Education'
  ];


  return (
    <div className="min-h-screen bg-pink-50">
      <Header/>
      <div className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Profile</h1>
            <p className="text-red-500 text-sm border border-red-200 bg-red-50 px-3 py-1 rounded-full inline-block">
              Step {currentStep} of 4
            </p>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
            <div 
              className="bg-red-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            ></div>
          </div>

          {/* Tab Navigation */}
          <div className="mb-8">
            <div className="flex border-b border-gray-200 bg-white rounded-t-lg">
              {stepTitles.map((title, index) => (
                <div
                  key={index + 1}
                  className={`flex-1 flex items-center justify-center py-4 px-4 cursor-pointer transition-colors ${
                    currentStep === index + 1
                      ? 'border-b-2 border-red-500 text-red-600 bg-white'
                      : currentStep > index + 1
                        ? 'text-red-500 bg-gray-50'
                        : 'text-gray-400 bg-gray-50'
                  }`}
                >
                  <span className="font-medium text-sm">{title}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-8">
            {/* Step 1: Personal Info */}
            {currentStep === 1 && (
              <div>
                <div className="flex items-center mb-6">
                  <span className="text-2xl mr-3"></span>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Personal Info</h2>
                    <p className="text-gray-600 text-sm">Tell us about yourself to help us find your perfect match</p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                      placeholder="Enter First Name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                      placeholder="Enter Last Name"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth *</label>
                    <input
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Gender *</label>
                    <select 
                      value={formData.gender}
                      onChange={(e) => handleInputChange('gender', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">About Me *</label>
                  <textarea
                    value={formData.aboutMe}
                    onChange={(e) => handleInputChange('aboutMe', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500 resize-none"
                    placeholder="We refrain from allowing detailed descriptions of women or men that may create vivid mental imagery. This is to uphold respect, privacy, and modesty. Thank you for your understanding."
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Expectations *</label>
                  <textarea
                    value={formData.expectations}
                    onChange={(e) => handleInputChange('expectations', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500 resize-none"
                    placeholder="What do you want to find in an ideal partner?"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Health Conditions *</label>
                  <textarea
                    value={formData.healthConditions}
                    onChange={(e) => handleInputChange('healthConditions', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500 resize-none"
                    placeholder="Can you tell us about your health conditions?"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                      placeholder="Create a password"
                      required
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password *</label>
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                    placeholder="Confirm your password"
                    required
                  />
                </div>
              </div>
            )}

            {/* Step 2: Religious Info */}
            {currentStep === 2 && (
              <div>
                <div className="flex items-center mb-6">
                  <span className="text-2xl mr-3"></span>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Religious Info</h2>
                    <p className="text-gray-600 text-sm">Share your religious preferences and practices</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Are you a Sunni Muslim? *</label>
                    <select 
                      value={formData.sunniMuslim}
                      onChange={(e) => handleInputChange('sunniMuslim', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                    >
                      <option value="">Select An Option</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Are You a Revert Muslim? *</label>
                    <select 
                      value={formData.revertMuslim}
                      onChange={(e) => handleInputChange('revertMuslim', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                    >
                      <option value="">Are You a Revert Muslim?</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Prayer Frequency *</label>
                    <select 
                      value={formData.prayerFrequency}
                      onChange={(e) => handleInputChange('prayerFrequency', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                    >
                      <option value="">Prayer Frequency</option>
                      <option value="5-times-daily">5 Times Daily</option>
                      <option value="sometimes">Sometimes</option>
                      <option value="rarely">Rarely</option>
                      <option value="never">Never</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Quran Reading *</label>
                    <select 
                      value={formData.quranReading}
                      onChange={(e) => handleInputChange('quranReading', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                    >
                      <option value="">Quran Reading</option>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                      <option value="rarely">Rarely</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Hijab *</label>
                    <select 
                      value={formData.hijabPreference}
                      onChange={(e) => handleInputChange('hijabPreference', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                    >
                      <option value="">Hijab Preference</option>
                      <option value="always">Always</option>
                      <option value="sometimes">Sometimes</option>
                      <option value="planning-to">Planning To</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Beard *</label>
                    <select 
                      value={formData.beardPreference}
                      onChange={(e) => handleInputChange('beardPreference', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                    >
                      <option value="">Beard Preference</option>
                      <option value="full">Full Beard</option>
                      <option value="trimmed">Trimmed</option>
                      <option value="goatee">Goatee</option>
                      <option value="no">No Beard</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Family & Background */}
            {currentStep === 3 && (
              <div>
                <div className="flex items-center mb-6">
                  <span className="text-2xl mr-3">🏠</span>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Family & Background</h2>
                    <p className="text-gray-600 text-sm">Tell us about your family and background</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Marital Status *</label>
                    <select 
                      value={formData.maritalStatus}
                      onChange={(e) => handleInputChange('maritalStatus', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                    >
                      <option value="">Marital Status</option>
                      <option value="never-married">Never Married</option>
                      <option value="divorced">Divorced</option>
                      <option value="widowed">Widowed</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Children *</label>
                    <select 
                      value={formData.children}
                      onChange={(e) => handleInputChange('children', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                    >
                      <option value="">Do You Have Children?</option>
                      <option value="none">No Children</option>
                      <option value="1">1 Child</option>
                      <option value="2">2 Children</option>
                      <option value="3+">3+ Children</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Want Children *</label>
                    <select 
                      value={formData.wantChildren}
                      onChange={(e) => handleInputChange('wantChildren', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                    >
                      <option value="">Want Children?</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                      <option value="maybe">Maybe</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nationality *</label>
                    <select 
                      value={formData.nationality}
                      onChange={(e) => handleInputChange('nationality', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                    >
                      <option value="">Nationality</option>
                      <option value="american">American</option>
                      <option value="british">British</option>
                      <option value="canadian">Canadian</option>
                      <option value="pakistani">Pakistani</option>
                      <option value="indian">Indian</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Mother Tongue *</label>
                    <select 
                      value={formData.motherTongue}
                      onChange={(e) => handleInputChange('motherTongue', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                    >
                      <option value="">Mother Tongue</option>
                      <option value="english">English</option>
                      <option value="arabic">Arabic</option>
                      <option value="urdu">Urdu</option>
                      <option value="hindi">Hindi</option>
                      <option value="french">French</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Languages Known</label>
                    <input
                      type="text"
                      value={formData.languagesKnown}
                      onChange={(e) => handleInputChange('languagesKnown', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                      placeholder="e.g., English, Arabic, Urdu"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Country *</label>
                    <select 
                      value={formData.country}
                      onChange={(e) => handleInputChange('country', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                    >
                      <option value="">Country</option>
                      <option value="usa">United States</option>
                      <option value="uk">United Kingdom</option>
                      <option value="canada">Canada</option>
                      <option value="australia">Australia</option>
                      <option value="pakistan">Pakistan</option>
                      <option value="india">India</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                      placeholder="City"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Career & Education */}
            {currentStep === 4 && (
              <div>
                <div className="flex items-center mb-6">
                  <span className="text-2xl mr-3">🎓</span>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Career & Education</h2>
                    <p className="text-gray-600 text-sm">Share your education and career information</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Education Level *</label>
                    <select 
                      value={formData.educationLevel}
                      onChange={(e) => handleInputChange('educationLevel', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                    >
                      <option value="">Education level</option>
                      <option value="high-school">High School</option>
                      <option value="bachelors">Bachelor's Degree</option>
                      <option value="masters">Master's Degree</option>
                      <option value="phd">PhD</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Occupation *</label>
                    <input
                      type="text"
                      value={formData.occupation}
                      onChange={(e) => handleInputChange('occupation', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                      placeholder="Your occupation"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Annual Income (Optional)</label>
                  <select 
                    value={formData.annualIncome}
                    onChange={(e) => handleInputChange('annualIncome', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                  >
                    <option value="">Annual income</option>
                    <option value="under-30k">Under $30,000</option>
                    <option value="30k-50k">$30,000 - $50,000</option>
                    <option value="50k-75k">$50,000 - $75,000</option>
                    <option value="75k-100k">$75,000 - $100,000</option>
                    <option value="100k-150k">$100,000 - $150,000</option>
                    <option value="150k+">$150,000+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t">
              {currentStep > 1 ? (
                <button 
                  onClick={prevStep}
                  className="flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Previous
                </button>
              ) : <div></div>}
              
              {currentStep < 4 ? (
                <button 
                  onClick={nextStep}
                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg transition-colors flex items-center"
                >
                  Next
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ) : (
                <button 
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white px-8 py-3 rounded-lg transition-colors flex items-center"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating Profile...
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Complete Profile
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}
