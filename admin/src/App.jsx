import React, { useContext } from 'react'
import Login from './pages/Login'
import { ToastContainer, toast } from 'react-toastify';
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Admin/Dashboard';
import Appointment from './pages/Admin/Appointment';
import AddDoctor from './pages/Admin/AddDoctor';
import DroneList from './pages/Admin/DroneList';
import { DoctorContext } from './context/DoctorContext';
import DoctorDashboard from './pages/Doctor/DoctorDashboard';
import DoctorAppointments from './pages/Doctor/DoctorAppointments';
import DoctorProfile from './pages/Doctor/DoctorProfile';
import Review from './pages/Admin/Review'
import Refund from './pages/Admin/Refund'
import Complain from './pages/Admin/Complain'
import Enquiry from './pages/Admin/Enquiry'
import Other from './pages/Admin/Other'
import UpComingOrders from './pages/Admin/UpComingOrders';
import OrdersInProgress from './pages/Admin/OrdersInProgress';
import CancelOrder from './pages/Admin/CancelOrder';
import AddCrop from './pages/Admin/AddCrop';
import AdminUser from './pages/Admin/AdminUser';
import Farmer from './pages/Admin/Farmer';
import Pilot from './pages/Admin/Pilot';
import Copilot from './pages/Admin/Copilot';
import DroneOwner from './pages/Admin/DroneOwner';
import ApprovedRefunds from './pages/Admin/ApprovedRefunds';
import AddUser from './pages/Admin/AddAdmin';
import AddAdmin from './pages/Admin/AddAdmin';


function App() {

  const { aToken } = useContext(AdminContext)

  
  const {dToken} = useContext(DoctorContext)


  return aToken || dToken ? (
    <div className='bg-[#F8F9FD]' >
      <ToastContainer />
      <Navbar />
   

      <div className='flex items-start'>
        <Sidebar/>
        <Routes>
           {/* Admin Route  */}
           <Route path='/' element={<></>} />
           <Route path='/admin-dashboard' element={<Dashboard/>} />
           <Route path='/all-appointments' element={<Appointment/>} />
           <Route path='/add-doctor' element={<AddDoctor/>} />
           <Route path='/add-crop' element={<AddCrop/>} />
           <Route path='/doctor-list' element={<DroneList/>} />
          <Route path='/upcoming-orders' element={<UpComingOrders/>}/>
          <Route path='/orders-in-progress' element={<OrdersInProgress/>}/>
          <Route path='/cancelled-orders' element={<CancelOrder/>}/>
           <Route path="/tickets/review" element={<Review />} />
           <Route path="/tickets/refund" element={<Refund />} />
            <Route path="/tickets/complain" element={<Complain />} />
            <Route path="/tickets/enquiry" element={<Enquiry />} />
            <Route path="/tickets/other" element={<Other />} />
            <Route path="/approved-refunds" element={<ApprovedRefunds />} />
            <Route path="/add-admins" element={<AddAdmin />} />


            {/* User route */}
            <Route path='/adminUser' element={<AdminUser/>} />
            <Route path='/farmer' element={<Farmer/>} />
            <Route path='/pilot' element={<Pilot/>} />
            <Route path='/copilot' element={<Copilot/>} />
            <Route path='/dron-owner' element={<DroneOwner/>}/>

          {/* Doctor Route  */}
          <Route path='doctor-dashboard' element={<DoctorDashboard/>}/>
          <Route path='doctor-appointments' element={<DoctorAppointments/>}/>
          <Route path='doctor-profile' element={<DoctorProfile/>}/>
          <Route path='doctor-profile' element={<DoctorProfile/>}/>

        </Routes>
      </div>
    </div>
  ) :
    <>
      <Login />
      <ToastContainer />
    
    </>
}

export default App
