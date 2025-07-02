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
import AddDrone from './pages/Admin/AddDrone';

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
          <Route path='/admin/' element={<Dashboard />} />
<<<<<<< HEAD
          <Route path='/all-appointments' element={<Appointment />} />
          <Route path='/admin/add-doctor' element={<AddDrone />} />
          <Route path='/admin/add-crop' element={<AddCrop />} />
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
=======
          <Route path='/admin/all-appointments' element={<Appointment />} />
          <Route path='/admin/add-doctor' element={<AddDrone />} />
          <Route path='/admin/add-crop' element={<AddCrop />} />
          <Route path='/admin/add-wd' element={<AddWorkingDay />} />
          <Route path='/admin/doctor-list' element={<DroneList />} />
          <Route path='/admin/upcoming-orders' element={<UpComingOrders />} />
          <Route path='/admin/todays-orders' element={<TodaysWorkingOrder />} />
          <Route path='/admin/pending-orders' element={<PendingOrder />} />
          <Route path='/admin/waiting-for-confirmation' element={<WaitingForConfirmation />} />
          <Route path='/admin/completed-orders' element={<CompletedOrders />} />
          <Route path='/admin/orders-in-progress' element={<OrdersInProgress />} />
          <Route path='/admin/cancelled-orders' element={<CancelOrder />} />
          <Route path="/admin/tickets/review" element={<Review />} />
          <Route path="/admin/tickets/refund" element={<Refund />} />
          <Route path="/admin/tickets/complain" element={<Complain />} />
          <Route path="/admin/tickets/enquiry" element={<Enquiry />} />
          <Route path="/admin/tickets/other" element={<Other />} />
          <Route path="/admin/approved-refunds" element={<ApprovedRefunds />} />
          <Route path="/admin/declined-refunds" element={<DeclinedRefunds />} />
          <Route path="/admin/add-admins" element={<AddAdmin />} />
          <Route path="/admin/work-on-hold" element={<WorkOnHold />} />
          <Route path="/admin/todays-date-orders" element={<TodaysBookings />} />
          <Route path="/admin/unassigned-orders" element={<UnassigendOrders />} />
          <Route path="/admin/unauthorized" element={<UnauthorizedPage />} />
          <Route path='/admin/adminUser' element={<AdminUser />} />
          <Route path='/admin/farmer' element={<Farmer />} />
          <Route path='/admin/pilot' element={<Pilot />} />
          <Route path='/admin/copilot' element={<Copilot />} />
          <Route path='/admin/dron-owner' element={<DroneOwner />} />
          <Route path="/admin/successful-payments" element={<SuccessfulPaymentsCard />} />
          <Route path="/admin/parital-payments" element={<PartialPaymentsCard />} />
          <Route path="/admin/pending-payments" element={<PendingPaymentsCard />} />
          <Route path="/admin/failed-payments" element={<FailedPaymentsCard/>} />
>>>>>>> 16483e5db50c0a4e947425abd2242e4a089ea8a8
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
