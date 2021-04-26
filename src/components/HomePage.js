import React from 'react'
import HeroSection from './HeroSection'
import HowItWorks from './HowItWorks'
import About from './About'
import ScrollToTop from './ScrollToTop'

function Homepage () {
    return(
        <div>
        <HeroSection />
        <HowItWorks />
        <About />
        <ScrollToTop />
        </div>

    )
}

export default Homepage