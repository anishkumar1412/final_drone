import React, { useContext, useEffect } from "react";
import { assets } from "../../assets/assets_admin/assets";
import {  FaShoppingCart, FaSyncAlt, FaUserTimes, FaClipboardList,  FaFilter }  from "react-icons/fa";
import { AdminContext } from "../../context/AdminContext";
import {Link } from 'react-router-dom'
import { MdReviews } from "react-icons/md";
import { MdOutlinePendingActions } from "react-icons/md";
import { GrInProgress } from "react-icons/gr";
import { MdUpcoming } from "react-icons/md";

import { 
  MdWorkOff, 
  MdCancel, 
  MdCheckCircle 
} from "react-icons/md";

import { 
  AiOutlineCheckCircle, 
  AiOutlineCloseCircle, 
  AiOutlineClockCircle 
} from "react-icons/ai";
import Refund from "./Refund";

function Dashboard() {
  const {bookings,getAllBokings,formatDate,currency,reviews,cancelledOrdersCount,cancelAppointment,drones,upcomingBookings,refunds,aToken,permissions,token} = useContext(AdminContext)
  const today = new Date().toLocaleDateString("en-CA"); // YYYY-MM-DD format

   useEffect(()=>{
      getAllBokings()
    },[])
  console.log(bookings)
  // const token = localStorage.getItem("aToken") || localStorage.getItem("dToken");

  // ✅ Check permission

  const stats = [
    { icon: <FaShoppingCart className="text-blue-500" size={32} />, value: drones.length, label: "Total Drones", link: "/admin/doctor-list",requiredPermission: "Total Drones" },
    { icon: <FaShoppingCart className="text-green-500" size={32} />, value: bookings.length, label: "Total Bookings", link: "/admin/all-appointments", requiredPermission: "Total Bookings" },
    { icon: <AiOutlineCheckCircle className="text-yellow-500" size={32} />, value: bookings.filter(item => item.workCompleted === true).length, label: "Order Completed", link: "/admin/completed-orders", requiredPermission: "Order Completed" },
    { icon: <FaSyncAlt className="text-red-500" size={32} />, value: refunds.length, label: "Total Refund Orders", link: "/admin/tickets/refund", requiredPermission: "Total Refund Orders" },
    { icon: <MdCheckCircle className="text-green-600" size={32} />, value: refunds.filter((refund) => refund.status === "Approved").length, label: "Approved Refunds", link: "/admin/approved-refunds", requiredPermission: "Approved Refunds" },
    { icon: <AiOutlineCloseCircle className="text-red-600" size={32} />, value: refunds.filter((refund) => refund.status === "Declined").length, label: "Declined Refunds", link: "/admin/declined-refunds", requiredPermission: "Declined Refunds" },
    { icon: <FaUserTimes className="text-purple-500" size={32} />, value: cancelledOrdersCount, label: "Total User Cancel Orders", link: "/admin/cancelled-orders", requiredPermission: "Total User Cancel Orders" },
    { icon: <MdReviews className="text-red-600" size={32} />, value: reviews.length, label: "Reviews", link: "/admin/tickets/review", requiredPermission: "Reviews" },
    { icon: <GrInProgress className="text-blue-950" size={32} />, value: bookings.filter((item) => new Date(item.startDate).toLocaleDateString("en-CA") === today && item.workCompleted !== true).length, label: "Today's Workings Orders", link: "/admin/todays-orders", requiredPermission: "Today's Workings Orders" },
    { icon: <MdUpcoming className="text-purple-500" size={32} />, value: upcomingBookings.length, label: "Upcoming Bookings", link: "/upcoming-orders", requiredPermission: "Upcoming Bookings" },
    { icon: <GrInProgress className="text-blue-950" size={32} />, value: bookings.filter(item => item.progress === true && item.cancelled !== true && item.workCompleted !== true).length, label: "Today's Orders in Progress", link: "/admin/orders-in-progress", requiredPermission: "Today's Orders in Progress" },
    { icon: <AiOutlineClockCircle className="text-yellow-900" size={32} />, value: bookings.filter(item => item.progress === false && item.cancelled !== true && item.pilotName != null && item.copilotConfirm === true && item.pilotConfirm === true).length, label: "Today's Pending Orders", link: "/admin/pending-orders", requiredPermission: "Today's Pending Orders" },
    { icon: <MdOutlinePendingActions className="text-yellow-900" size={32} />, value: bookings.filter((item) => new Date(item.createdAt).toLocaleDateString("en-CA") === today).length, label: "Today's Bookings", link: "/admin/todays-date-orders", requiredPermission: "Today's Bookings" },
    { icon: <MdOutlinePendingActions className="text-yellow-900" size={32} />, value: bookings.filter(item => item.pilotName !== null && item.copilotName !== null && item.pilotConfirm === false && item.copilotConfirm === false).length, label: "Waiting for Confirmation", link: "/admin/waiting-for-confirmation", requiredPermission: "Waiting for Confirmation" },
    { icon: <MdWorkOff className="text-gray-600" size={32} />, value: bookings.filter(item => item.progress === false && item.cancelled !== true && item.pilotName != null && item.copilotConfirm === true && item.pilotConfirm === true).length, label: "Work on Hold", link: "/admin/work-on-hold", requiredPermission: "Work on Hold" },
    { icon: <MdWorkOff className="text-gray-600" size={32} />, value: bookings.filter((item) => !item.pilot && !item.copilot && !item.cancelled).length, label: "UnAssigned Orders", link: "/admin/unassigned-orders", requiredPermission: "UnAssigned Orders" },
    { icon: <MdCheckCircle className="text-green-600" size={32} />, value: bookings.filter((item) => !item.pilot && !item.copilot && !item.cancelled).length, label: "Successfull Payments", link: "/admin/successful-payments", requiredPermission: "Successfull Payments" },
    { icon: <AiOutlineCloseCircle className="text-red-600" size={32} />, value: bookings.filter((item) => !item.pilot && !item.copilot && !item.cancelled).length, label: "Unsuccessfull Payments", link: "/admin/failed-payments", requiredPermission: "Unsuccessfull Payments" },
    { icon: <AiOutlineClockCircle className="text-yellow-600" size={32} />, value: bookings.filter((item) => !item.pilot && !item.copilot && !item.cancelled).length, label: "Pending Payments", link: "/admin/pending-payments", requiredPermission: "Pending Payments" },
    { icon: <AiOutlineClockCircle className="text-yellow-600" size={32} />, value: bookings.filter((item) => !item.pilot && !item.copilot && !item.cancelled).length, label: "Patrial Payments", link: "/admin/parital-payments", requiredPermission: "Partial Payments" },
  ];
  
  {/* Upcoming -> Today's bookings -> Order in progress -> Pending order -> Waiting for confirmation 
    Progress -> Aligned 


    Implementation with node-cron
Install node-cron if you haven't already:

sh
Copy
Edit
npm install node-cron
Now, create a cron job in your backend:

javascript
Copy
Edit
const cron = require('node-cron');
const mongoose = require('mongoose');
const Task = require('./models/Task'); // Your Mongoose Model

// Schedule a job to run every day at midnight (12 AM)
cron.schedule('0 0 * * *', async () => {
    try {
        await Task.updateMany(
            { isProgress: true },  // Find all documents where isProgress is true
            { $set: { isProgress: false } } // Set isProgress to false
        );

        console.log('Reset isProgress to false for all records at 12 AM');
    } catch (error) {
        console.error('Error resetting progress:', error);
    }
});

    
    */}
console.log(permissions);
  return (
    <>
    <div className="m-5 w-full">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 grid-rows-2">
        {console.log(stats.filter(stat => aToken || permissions.includes(stat.requiredPermission)))}
  {(stats.filter(stat => aToken || permissions.includes(stat.requiredPermission))).map((stat, index) => (
    <Link to={stat.link} key={index} className="cursor-pointer">
      <div className="flex items-center gap-4 bg-white p-5 rounded-xl shadow-md border-2 border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all">
        <div className="p-3 bg-gray-100 rounded-full">{stat.icon}</div>
        <div>
          <p className="text-2xl font-bold text-gray-700">{stat.value}</p>
          <p className="text-gray-500">{stat.label}</p>
        </div>
      </div>
    </Link>
  ))}
</div>


      {/* Latest Bookings Section */}
   
      {(aToken || permissions.includes("Total Bookings")) && (<div className='w-full m-5'>
  <p className='mb-3 text-lg font-medium'>Latest Bookings</p>

  <div className='bg-white border rounded text-sm min-h-[60vh] max-h-[80vh] overflow-y-scroll'>
    <div className='hidden sm:grid grid-cols-[0.5fr_2fr_2fr_2fr_2fr_1.5fr_1.5fr_1.5fr] grid-flow-col py-3 border-b text-center font-medium'>
      <p>#</p>
      <p>Drone</p>
      <p>District</p>
      <p>Date & Time</p>
      <p>User</p>
      <p>Acre</p>
      <p>Price</p>
      <p>Actions</p>
    </div>

    {bookings.slice(0, 10).map((item, i) => (
      <div
        className='sm:grid sm:grid-cols-[0.5fr_2fr_2fr_2fr_2fr_1.5fr_1.5fr_1.5fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50 text-center'
        key={i}
      >
        <p className='max-sm:hidden'>{i + 1}</p>
        <div className='flex items-center justify-center gap-2'>
          <img className='w-20 rounded-md' src={item.droneImg} alt='' />
          <p>{item.droneName}</p>
        </div>
        <p className='max-sm:hidden'>{item.villagePanchayat}</p>
        <p>
          {formatDate(item.startDate)}, <br /> {formatDate(item.endDate)}
        </p>
        <p>{item.user.name}</p>
        <p>{item.specificLandPrice}</p>
        <p>{currency}{item.subtotal}</p>
        <div className='flex justify-center'>
          {item.cancelled ? (
            <p className='text-red-500 text-xs font-medium'>Cancelled</p>
          ) : item.isCompleted ? (
            <p className='text-green-500 text-xs font-medium'>Completed</p>
          ) : (
            <img
              onClick={() => cancelAppointment(item)}
              className='w-8 cursor-pointer'
              src={assets.cancel_icon}
              alt=''
            />
          )}
        </div>
      </div>
    ))}
  </div>
</div>)}


     
    </div>
     </>
  );
}

export default Dashboard;
