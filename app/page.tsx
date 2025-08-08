
'use client';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Success from '@/components/Success';
import HowItWorks from '@/components/HowItWorks';
import Cta from '@/components/Cta';
import Search from '@/components/Search';
import ProfileCards from '@/components/dummy';
import FAQ from '@/components/Faq';


export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <Header/>
      <Hero/>
      <Search/> 
      <ProfileCards/>
      <HowItWorks/>   
      <Success/>
      <FAQ/>        
      <Cta/>
      <Footer />
    </div>
  );
}
