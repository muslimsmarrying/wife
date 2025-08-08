import React from 'react';

const CTA: React.FC = () => {
  return (
    <section className="bg-gradient-to-br from-red-600 to-red-700 py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
          Ready to Find Your Life Partner?
        </h2>
        <p className="text-lg md:text-xl text-red-50 mb-8 max-w-2xl mx-auto">
          Join A Diverse Community of Muslims Who Are Looking For Their Perfect Match.
        </p>
        <button 
          className="bg-white text-red-600 hover:bg-red-50 font-semibold text-lg px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          onClick={() => {
            // Add your navigation logic here
            console.log('Navigate to registration/sign-up');
          }}
        >
          Ready To Find Your Life Partner?
        </button>
      </div>
    </section>
  );
};

export default CTA;