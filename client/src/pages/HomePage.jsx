import React from 'react'
import HeroSection from '../scenes/HeroSection'
import Footer from "../scenes/Footer"

const HomePage = () => {
  return (
    <div className="relative min-h-screen">
      <HeroSection />
      <div className="fixed bottom-0 left-0 right-0">
        <Footer />
      </div>
    </div>
  );
}

export default HomePage