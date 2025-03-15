import React from 'react'
import ServiceVideo from '../Components/ServiceVideo'
import PricingCards from '../Components/Services/PricingComponent'
import OurServices from '../Components/Services'
import ExperienceSection from '../Components/Services/Experience'
import ServicesPage from '../Components/Services/ServicesPage'
import AllServices from '../Components/Services/AllServices'
import ExperienceMeasures from '../Components/Services/Experience'
import FAQSection from '../Components/FAQs/FAQSection'
import Testimonials from '../Components/Testimonials/Testimonials'

const Services = () => {
  return (
    <>
    <OurServices/>
  <ServicesPage/>
  <ServiceVideo/>
  <ExperienceMeasures/>
  <AllServices/>
    <PricingCards/>
    <Testimonials/>
    <FAQSection/>
    </>
  )
}

export default Services
