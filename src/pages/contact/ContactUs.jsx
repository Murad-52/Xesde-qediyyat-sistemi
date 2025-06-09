import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import CTASection from '../home/CTA/CTASection'

const ContactUs = () => {
  return (
    <>
    <header>
        <Navbar/>
    </header>
    <main>
        <section>
            <CTASection/>
        </section>

    </main>
    <footer style={{backgroundColor: '#0A97B01A'}}>
        <Footer/>
    </footer>

    </>
  )
}

export default ContactUs