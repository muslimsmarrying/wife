'use client';

import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

type Props = {}

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const FAQ = (props: Props) => {
  const faqItems: FAQItem[] = [
    {
      id: "item-1",
      question: "What is Wife4Life?",
      answer: "Wife4Life is a trusted Islamic matrimonial platform designed to help Muslims find compatible life partners for halal marriage. We provide a safe, respectful environment for serious matrimonial intentions."
    },
    {
      id: "item-2",
      question: "How does registration work?",
      answer: "Registration is simple and free. Create your profile by providing basic information, upload photos, specify your preferences, and complete our verification process for enhanced security and trust."
    },
    {
      id: "item-3",
      question: "What does premium/priority membership offer?",
      answer: "Premium membership provides unlimited profile views, advanced search filters, direct messaging capabilities, priority customer support, and enhanced profile visibility to increase your chances of finding a match."
    },
    {
      id: "item-4",
      question: "How do I contact profiles?",
      answer: "Free members can express interest in profiles, while premium members can directly message and view contact information. All communication is monitored to ensure respectful interactions."
    },
    {
      id: "item-5",
      question: "What are your success rates?",
      answer: "We have helped thousands of Muslims worldwide find their life partners. Our success rate is over 85% for active premium members who complete their profiles and actively engage with matches."
    },
    {
      id: "item-6",
      question: "How long does it take to find a match?",
      answer: "Match timelines vary depending on preferences, location, and activity level. On average, serious members find meaningful connections within 3-6 months of active participation."
    },
    {
      id: "item-7",
      question: "How are profiles verified and authenticated?",
      answer: "We verify profiles through phone number confirmation, email verification, ID document checks, and photo verification. This ensures genuine profiles and reduces fake accounts."
    },
    {
      id: "item-8",
      question: "Can I hide my profile from certain countries?",
      answer: "Yes, premium members can customize privacy settings including hiding profiles from specific countries, controlling who can contact them, and managing profile visibility preferences."
    },
    {
      id: "item-9",
      question: "How can I report inappropriate behavior?",
      answer: "We have zero tolerance for inappropriate behavior. Use the report button on any profile or message to notify our moderation team. We review all reports within 24 hours and take appropriate action."
    },
    {
      id: "item-10",
      question: "What support is available?",
      answer: "We provide 24/7 customer support via email, live chat, and phone. Our dedicated team assists with technical issues, profile optimization, and matrimonial guidance."
    },
    {
      id: "item-11",
      question: "What happens if I cancel my subscription?",
      answer: "You can cancel anytime. Your premium features remain active until the subscription period ends. After cancellation, your profile reverts to free membership with limited features."
    },
    {
      id: "item-12",
      question: "Is there a refund policy?",
      answer: "We offer a 30-day money-back guarantee for first-time premium subscribers. Refunds are processed within 5-7 business days after approval of your refund request."
    },
    {
      id: "item-13",
      question: "How can I delete my account?",
      answer: "You can permanently delete your account from profile settings. All your data will be removed within 30 days. Note that this action cannot be undone, so please consider deactivation instead."
    },
    {
      id: "item-14",
      question: "What payment methods are accepted?",
      answer: "We accept all major credit cards, PayPal, bank transfers, and local payment methods. All transactions are secure and encrypted for your financial safety."
    },
    {
      id: "item-15",
      question: "What are your fees?",
      answer: "Basic membership is free forever. Premium membership starts at $29.99/month with discounts for longer commitments. Check our pricing page for current rates and special offers."
    }
  ];

  return (
    <section className="py-16 px-6 bg-pink-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">FAQ</h2>
        </div>
        
        <Accordion type="multiple" className="space-y-2 ">
          {faqItems.map((item) => (
            <AccordionItem 
              key={item.id} 
              value={item.id}
              className="border-none"
            >
              <AccordionTrigger className="bg-red-600 text-white px-6 py-4 hover:bg-red-700 transition-colors text-left font-medium hover:no-underline rounded-none">
                <span className="text-sm md:text-base">{item.question}</span>
              </AccordionTrigger>
              <AccordionContent className="bg-white px-6 py-4 border-none">
                <p className="text-sm md:text-base leading-relaxed text-gray-700">
                  {item.answer}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;