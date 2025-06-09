import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import HeroSection from './Hero/HeroSection'
import AboutSection from './About/AboutSection'
import ServicesSection from './Services/ServicesSection'
import MedicalExpertsSection from './Experts/MedicalExpertsSection'
import StatisticsSection from './Statistics/StatisticsSection'
import FAQSection from './FAQ/FAQSection'
import CTASection from './CTA/CTASection'
import Footer from '../../components/footer/Footer'

const Home = () => {
  return (
  <>
  <header>
    <Navbar/>
  </header>
  <main>
    <section>
      <HeroSection/>
    </section>
    <section>
      <AboutSection/>
    </section>
   <section style={{backgroundColor: '#F9F9F9'}}>
     <ServicesSection/>
   </section>
    <section>
      <MedicalExpertsSection/>
    </section >
    <section style={{backgroundColor: '#F9F9F9'}}>
    <StatisticsSection/>
    </section>
    <section style={{backgroundColor: '#F9F9F9'}}>
    <FAQSection/>
    </section>
    <section >
    <CTASection/>
    </section>

  </main>
  <footer style={{backgroundColor: '#0A97B01A'}}>
    <Footer/>
  </footer>
  </>
  )
}

export default Home