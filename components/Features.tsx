import React from 'react'

type Props = {}

const Features = (props: Props) => {
  return (
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose MatrimonyHub?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We understand the importance of finding the right partner. Our platform is designed with Islamic values at its core.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-6">
                <i className="ri-shield-check-line text-2xl text-pink-500"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">100% Verified Profiles</h3>
              <p className="text-gray-600">
                All profiles are manually verified to ensure authenticity and safety for our community members.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-6">
                <i className="ri-heart-3-line text-2xl text-pink-500"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Islamic Values</h3>
              <p className="text-gray-600">
                Our platform respects Islamic traditions and provides a halal way to find your life partner.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-6">
                <i className="ri-lock-line text-2xl text-pink-500"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Privacy Protected</h3>
              <p className="text-gray-600">
                Your privacy is our priority. Control who can view your profile and contact you.
              </p>
            </div>
          </div>
        </div>
      </section>
  )
}

export default Features