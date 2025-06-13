import React, { useContext } from 'react'
import Login from './pages/Login'
import { ToastContainer } from 'react-toastify';
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Admin/Dashboard';
import Appointment from './pages/Admin/Appointment';
import AddAdmin from './pages/Admin/AddAdmin';
import DroneList from './pages/Admin/DroneList';
import { DoctorContext } from './context/DoctorContext';

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
import AddWorkingDay from './pages/Admin/AddWorkingDay';
import DeclinedRefunds from './pages/Admin/DeclinedRefund';
import TodaysWorkingOrder from './pages/Admin/TodaysWorkingOrder';
import PendingOrder from './pages/Admin/PendingOrders';
import WaitingForConfirmation from './pages/Admin/WaitingForConfirmation';
import CompletedOrders from './pages/Admin/CompletedOrders';
import UnauthorizedPage from './pages/Admin/unAuthorizedPage';
import WorkOnHold from './pages/Admin/WorkOnHold';
import TodaysBookings from './pages/Admin/TodaysBookings';
import UnassigendOrders from './pages/Admin/UnassignedOrders';
import SuccessfulPaymentsCard from './pages/Admin/successfulpayments';
import PartialPaymentsCard from './pages/Admin/partialpayment';
import FailedPaymentsCard from './pages/Admin/FailedPayments';
import PendingPaymentsCard from './pages/Admin/PendingPayments';

function App() {
  const { aToken } = useContext(AdminContext)
  const { dToken } = useContext(DoctorContext)

  return aToken || dToken ? (
    <div className='bg-[#F8F9FD]'>
      <ToastContainer />
      <Navbar />
      <div className='flex items-start'>
        <Sidebar />
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/all-appointments' element={<Appointment />} />
          <Route path='/add-doctor' element={<AddAdmin />} />
          <Route path='/add-crop' element={<AddCrop />} />
          <Route path='/add-wd' element={<AddWorkingDay />} />
          <Route path='/doctor-list' element={<DroneList />} />
          <Route path='/upcoming-orders' element={<UpComingOrders />} />
          <Route path='/todays-orders' element={<TodaysWorkingOrder />} />
          <Route path='/pending-orders' element={<PendingOrder />} />
          <Route path='/waiting-for-confirmation' element={<WaitingForConfirmation />} />
          <Route path='/completed-orders' element={<CompletedOrders />} />
          <Route path='/orders-in-progress' element={<OrdersInProgress />} />
          <Route path='/cancelled-orders' element={<CancelOrder />} />
          <Route path="/tickets/review" element={<Review />} />
          <Route path="/tickets/refund" element={<Refund />} />
          <Route path="/tickets/complain" element={<Complain />} />
          <Route path="/tickets/enquiry" element={<Enquiry />} />
          <Route path="/tickets/other" element={<Other />} />
          <Route path="/approved-refunds" element={<ApprovedRefunds />} />
          <Route path="/declined-refunds" element={<DeclinedRefunds />} />
          <Route path="/add-admins" element={<AddAdmin />} />
          <Route path="/work-on-hold" element={<WorkOnHold />} />
          <Route path="/todays-date-orders" element={<TodaysBookings />} />
          <Route path="/unassigned-orders" element={<UnassigendOrders />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          <Route path='/adminUser' element={<AdminUser />} />
          <Route path='/farmer' element={<Farmer />} />
          <Route path='/pilot' element={<Pilot />} />
          <Route path='/copilot' element={<Copilot />} />
          <Route path='/dron-owner' element={<DroneOwner />} />
          <Route path="/successful-payments" element={<SuccessfulPaymentsCard />} />
          <Route path="/parital-payments" element={<PartialPaymentsCard />} />
          <Route path="/pending-payments" element={<PendingPaymentsCard />} />
          <Route path="/failed-payments" element={<FailedPaymentsCard/>} />
        </Routes>
      </div>
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  )
}

export default App
