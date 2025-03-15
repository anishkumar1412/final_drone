import React from 'react'
import Navbar from '../Components/Navbar'
import VideoBackground from '../Components/VideoBackground'
import DroneComponent from '../Components/DroneComponent'
import DroneQuadCopter from '../Components/DroneQuadCopter'
import Product from '../Components/Product'
import BookingVideo from '../Components/BookingVideo'
import OdishaMapWithPieChart from '../Components/Map'
import EnterPriceList from '../Components/Enterprises/Enterprises'
import BlogPost from '../Components/Blogs/Blogs'
import ClientsSection from '../Components/Customer/Customer'
import DroneTransportation from '../Components/ServicePackage/DroneTransportation'
import DroneSlider from '../Components/Reviews'
import ServiceVideo from '../Components/ServiceVideo'
import Carousel from '../Components/Carousel/Carousel'


const Home = () => {
  return (
    <div>
      <VideoBackground/>
      <DroneComponent/>
      <DroneQuadCopter/>
      <Product/>
      <DroneSlider/>
      <ServiceVideo/>
      <ClientsSection/>
      <OdishaMapWithPieChart/>
      <Carousel/>
      <EnterPriceList/>
      <BlogPost/>
      
    </div>
  )
}

export default Home
