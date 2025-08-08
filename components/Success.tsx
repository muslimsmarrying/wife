import Link from 'next/link'
import React from 'react'

type Props = {}

const Success = (props: Props) => {
  return (
  <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Success Stories
            </h2>
            <p className="text-lg text-gray-600">
              Real couples who found love through MatrimonyHub
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border">
              <div className="flex items-center mb-6">
                <img 
                  src="https://readdy.ai/api/search-image?query=Happy%20Muslim%20couple%20portrait%2C%20wedding%20photography%2C%20traditional%20Islamic%20attire%2C%20smiling%20faces%2C%20professional%20headshot%20style%2C%20elegant%20and%20modest%20clothing%2C%20joyful%20expression&width=80&height=80&seq=couple1&orientation=squarish"
                  alt="Success couple"
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">Ahmed & Fatima</h4>
                  <p className="text-gray-600 text-sm">Married in 2023</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "We found each other through MatrimonyHub and couldn't be happier. The platform made it easy to connect with someone who truly shared our values and faith."
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border">
              <div className="flex items-center mb-6">
                <img 
                  src="https://readdy.ai/api/search-image?query=Beautiful%20Muslim%20couple%20in%20traditional%20wedding%20attire%2C%20Islamic%20wedding%20photography%2C%20bride%20and%20groom%20portrait%2C%20elegant%20hijab%20and%20formal%20wear%2C%20professional%20photography%20style&width=80&height=80&seq=couple2&orientation=squarish"
                  alt="Success couple"
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">Omar & Zainab</h4>
                  <p className="text-gray-600 text-sm">Married in 2024</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "The verification process gave us confidence in the platform. We appreciated the Islamic approach to finding a life partner. Alhamdulillah!"
              </p>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link href="/success-stories" className="text-pink-500 hover:text-pink-600 font-semibold cursor-pointer">
              Read More Success Stories →
            </Link>
          </div>
        </div>
      </section>
  )
}

export default Success