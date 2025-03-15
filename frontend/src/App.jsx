import './App.css'
import Navbar from './Components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import AboutSection from './pages/AboutUs'
import WhatsAppIcon from './Components/Whatsapp/Whatsapp'
import DownloadBrochure from './Components/DownloadBroucher/DownloadBroucher'
import Services from './pages/Services'
import QuoteCalculator from './pages/QuoteCalculator'
import ContactUs from './pages/ContactUs'
import CareersPage from './pages/Career'
import Training from './pages/Training'
import Footer from './Components/Footer'
import { ToastContainer } from 'react-toastify'
import Login from './pages/Login'
import Drone from './pages/Drone'
import BookProduct from './pages/BookProduct'
import Profile from './Components/Profile'
import Myorder from './pages/Myorder'
import ReviewComplaint from './pages/ReviewComplaint'
import RefundReviewsStatus from './pages/RefundReviewsStatus'




function App() {
  return (
    <>
      <ToastContainer />
      <Navbar />
      <DownloadBrochure />
      <WhatsAppIcon />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path='/my-order' element={<Myorder/>}/>
        <Route path='/login' element={<Login />} />
        <Route path="/about" element={<AboutSection />} />
        <Route path='booking' element={<Drone/>}/>
        <Route path='/book-your-drone' element={<BookProduct/>} />
        <Route path="/services" element={<Services />} />
        <Route path="/quotecalculator" element={<QuoteCalculator />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/career" element={<CareersPage />} />
        <Route path="/training" element={<Training />} />
        <Route path="/review-complaint/:orderId" element={<ReviewComplaint />} />
        <Route path="/refund-reviews-status" element={<RefundReviewsStatus />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
