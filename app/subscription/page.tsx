'use client';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useState } from 'react';

export default function Subscription() {
  const [paymentProof, setPaymentProof] = useState<File | null>(null);
  const [transactionId, setTransactionId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPaymentProof(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!paymentProof || !transactionId) return;

    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitStatus('success');
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
       <Header/>
      <div className="py-12 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Premium Subscription</h1>
            <p className="text-gray-600">Unlock full access to contact details</p>
          </div>

          {/* Pricing Card */}
          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-pink-100 rounded-full mb-4">
                <i className="ri-vip-crown-line text-2xl text-pink-500"></i>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Lifetime Premium</h2>
              <div className="text-4xl font-bold text-pink-500 mb-4">$50</div>
              <p className="text-gray-600 mb-6">One-time payment for lifetime access</p>
              
              <div className="space-y-3 text-left mb-8">
                <div className="flex items-center">
                  <i className="ri-check-line text-green-500 w-5 h-5 mr-3"></i>
                  <span className="text-gray-700">View contact details of all profiles</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-check-line text-green-500 w-5 h-5 mr-3"></i>
                  <span className="text-gray-700">Send unlimited messages</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-check-line text-green-500 w-5 h-5 mr-3"></i>
                  <span className="text-gray-700">Priority profile visibility</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-check-line text-green-500 w-5 h-5 mr-3"></i>
                  <span className="text-gray-700">Advanced search filters</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Instructions */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h3 className="font-semibold text-blue-900 mb-3">Payment Instructions</h3>
            <div className="space-y-2 text-blue-800">
              <p>1. Send $50 to our payment account:</p>
              <div className="bg-white p-3 rounded border ml-4">
                <p><strong>Bank:</strong> Chase Bank</p>
                <p><strong>Account:</strong> 1234567890</p>
                <p><strong>Routing:</strong> 987654321</p>
              </div>
              <p>2. Upload screenshot of payment confirmation below</p>
              <p>3. Enter your transaction ID</p>
              <p>4. Wait for admin approval (24-48 hours)</p>
            </div>
          </div>

          {/* Payment Verification Form */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Submit Payment Proof After Sign-up</h3>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}