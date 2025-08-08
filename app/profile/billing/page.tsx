'use client';

import Header from '@/components/Header';
import { auth, db } from '@/lib/firebaseConfig';
import {
  doc,
  setDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { v4 as uuidv4 } from 'uuid';

const CLOUDINARY_UPLOAD_PRESET = 'udy751uk';
const CLOUDINARY_CLOUD_NAME = 'dbb0gown9';

const Page = () => {
  const [user] = useAuthState(auth);
  const [paymentProof, setPaymentProof] = useState<File | null>(null);
  const [transactionId, setTransactionId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      console.log('Selected file:', e.target.files[0]);
      setPaymentProof(e.target.files[0]);
    }
  };

  const uploadToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    if (!data.secure_url) throw new Error('Cloudinary upload failed');
    return data.secure_url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !paymentProof || !transactionId) return;

    setIsSubmitting(true);
    console.log('Starting submission...');

    try {
      // Upload to Cloudinary
      console.log('Uploading file to Cloudinary...');
      const imageURL = await uploadToCloudinary(paymentProof);
      console.log('Image uploaded:', imageURL);

      // Store subscription data
      const subscriptionId = uuidv4();
      const subRef = doc(db, 'subscriptions', subscriptionId);

      const payload = {
        userId: user.uid,
        transactionId,
        paymentAmount: 50,
        paymentScreenshot: imageURL,
        paymentStatus: 'pending',
        submittedAt: new Date().toISOString(),
        createdAt: serverTimestamp(),
      };

      console.log('Writing subscription to Firestore:', payload);
      await setDoc(subRef, payload);

      setSubmitStatus('success');
      console.log('Submission completed successfully.');
    } catch (err) {
      console.error('Error submitting payment proof:', err);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">
            Submit Payment Proof
          </h3>

          {submitStatus === 'success' ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                ✅
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Payment Proof Submitted!
              </h3>
              <p className="text-gray-600">
                We’ll review your submission within 24–48 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Transaction ID *
                  </label>
                  <input
                    type="text"
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Payment Screenshot *
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="payment-upload"
                      required
                    />
                    <label htmlFor="payment-upload" className="cursor-pointer">
                      {paymentProof ? (
                        <div className="text-center">
                          <p className="text-green-600 font-medium">{paymentProof.name}</p>
                          <p className="text-gray-500 text-sm">Click to change</p>
                        </div>
                      ) : (
                        <div className="text-center">
                          <p className="text-gray-600">
                            Click to upload payment screenshot
                          </p>
                          <p className="text-gray-500 text-sm">PNG, JPG up to 10MB</p>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !transactionId || !paymentProof}
                  className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 px-4 rounded-lg"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit for Verification'}
                </button>

                {submitStatus === 'error' && (
                  <p className="text-red-500 text-sm">Submission failed. Try again.</p>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default Page;
