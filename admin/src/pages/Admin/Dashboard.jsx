import React, { useContext, useEffect } from "react";
import { assets } from "../../assets/assets_admin/assets";
import {  FaShoppingCart, FaSyncAlt, FaUserTimes, FaClipboardList } from "react-icons/fa";
import { AdminContext } from "../../context/AdminContext";
import {Link } from 'react-router-dom'
import { MdReviews } from "react-icons/md";
import { MdOutlinePendingActions } from "react-icons/md";
import { GrInProgress } from "react-icons/gr";
import { MdUpcoming } from "react-icons/md";
import Refund from "./Refund";

function Dashboard() {
  const {bookings,getAllBokings,formatDate,currency,reviews,cancelledOrdersCount,cancelAppointment,drones,upcomingBookings,refunds} = useContext(AdminContext)
  const today = new Date().toISOString().split('T')[0];

   useEffect(()=>{
      getAllBokings()
    },[])
  console.log(bookings)
  const stats = [
    { icon: <FaShoppingCart className="text-blue-500" size={32} />, value: drones.length, label: "Total Drones", link: "/doctor-list" },
    { icon: <FaShoppingCart className="text-green-500" size={32} />, value:bookings.length, label: "Total Bookings", link: "/all-appointments" },
    { icon: <FaShoppingCart className="text-yellow-500" size={32} />, value: bookings.length, label: "Order Completed", link: "/all-appointments" },
    { icon: <FaSyncAlt className="text-red-500" size={32} />, value:refunds.length , label: "Total Refund Orders", link: "/tickets/refund" },
    { icon: <MdOutlinePendingActions  className="text-yellow-900" size={32} />, value: refunds.filter((refund) => refund.status === "Approved").length, label: "Approved Refunds", link: "/approved-refunds" },
    { icon: <MdOutlinePendingActions  className="text-yellow-900" size={32} />, value: refunds.filter((refund) => refund.status === "Declined").length, label: "Declined Refunds", link: "/declined-refunds" },
    { icon: <FaUserTimes className="text-purple-500" size={32} />, value: cancelledOrdersCount, label: "Total User Cancel Orders", link: "/cancelled-orders" },
    { icon: <MdReviews className="text-red-600" size={32} />, value: reviews.length, label: "Reviews", link: "/tickets/review" },
    { icon: <MdUpcoming  className="text-purple-500" size={32} />, value: upcomingBookings.length, label: "Upcoming Bookings", link: "/upcoming-orders" },
    { icon: <GrInProgress className="text-blue-950" size={32} />, value: bookings.length, label: "Orders in progress", link: "/orders-in-progress" },
    { icon: <GrInProgress className="text-blue-950" size={32} />, value: bookings.filter((item) => new Date(item.createdAt).toISOString().split("T")[0] === today).length, label: "Today's Orders", link: "/todays-orders" },
    { icon: <MdOutlinePendingActions  className="text-yellow-900" size={32} />, value:bookings.filter((item) => !item.pilot && !item.copilot && !item.cancelled).length, label: "Pending Orders", link: "/pending-orders" },
    { icon: <MdOutlinePendingActions  className="text-yellow-900" size={32} />, value: bookings.length, label: "Filter Details", link: "/all-appointments" },
  ];
  

  return (
    <>
    <div className="m-5 w-full">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 grid-rows-2">
  {stats.map((stat, index) => (
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
   
       <div className='w-full  m-5'>
           <p className='mb-3 text-lg font-medium'>Latest Bookings</p>
     
           <div className='bg-white border rounded text-sm min-h-[60vh] max-h-[80vh] overflow-y-scroll' >
             <div className='hidden sm:grid grid-cols-[0.5fr_3fr_2fr_3fr_2fr_1fr_1fr] grid-flow-col py-3 border-b' >
               <p>#</p>
               <p>Drone</p>
               <p>District</p>
               <p>Date & Time</p>
               <p>User</p>
               <p>Price</p>
               <p>Actions</p>
             </div>
     
             {
               bookings.reverse().slice(0,10).map((item,i)=>(
                  <div className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_2fr_3fr_2fr_1fr_1fr] items-center text-gray-500  py-3 px-6 border-b hover:bg-gray-50' key={i} >
                    <p className='max-sm:hidden'>{i+1}</p>
                    <div className='flex items-center gap-2'>
                      <img className='w-20 rounded-md' src={item.droneImg} alt="" /> <p>Drone A</p>
                    </div>
                    <p className='max-sm:hidden'>{item.villagePanchayat}</p>
                    <p>{formatDate(item.startDate)}, <br /> {formatDate(item.endDate)}</p>
                    <div className='flex items-center gap-2'>
                      {/* <img className='w-8 rounded-full bg-gray-200' src={item.user.} alt="" />  */}
                      <p>{item.user.name}</p>
                    </div>
                    <p>{currency}{item.subtotal}</p>
                    {
                     item.cancelled
                     ? <p className='text-red-500 text-xs font-medium'>Cancelled</p>
                     :item.isCompleted ?
                       <p className='text-green-500 text-xs font-medium' >Completed</p>
                     :<img onClick={()=>cancelAppointment(item)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
                    }
                   
                  </div>
               ))
             }
           </div>
         </div>
     
    </div>
     </>
  );
}

export default Dashboard;
