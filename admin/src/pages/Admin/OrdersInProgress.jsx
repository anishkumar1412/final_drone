import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { assets } from "../../assets/assets_admin/assets";
const OrdersInProgress = () => {
    
    const {getOrdersInProgress,ordersInProgress,setOrdersInProgress,formatDate,currency} = useContext(AdminContext)
     useEffect(()=>{
        getOrdersInProgress()
        },[])
    return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">Orders In Progress (today's Orders)</p>

      <div className="bg-white border rounded text-sm min-h-[60vh] max-h-[80vh] overflow-y-scroll">
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_2fr_3fr_2fr_1fr_1fr] grid-flow-col py-3 border-b">
          <p>#</p>
          <p>Drone</p>
          <p>District</p>
          <p>Date & Time</p>
          <p>User</p>
          <p>Price</p>
          <p>Actions</p>
        </div>

        {Array.isArray(ordersInProgress) &&
  ordersInProgress
    .slice() // Creates a shallow copy to avoid mutating the original state
    .reverse()
    
    .map((item, i) => (
            <div
              className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_2fr_3fr_2fr_1fr_1fr] items-center text-gray-500  py-3 px-6 border-b hover:bg-gray-50"
              key={i}
            >
              <p className="max-sm:hidden">{i + 1}</p>
              <div className="flex items-center gap-2">
                <img className="w-20 rounded-md" src={item.droneImg} alt="" />{" "}
                <p>Drone A</p>
              </div>
              <p className="max-sm:hidden">{item.villagePanchayat}</p>
              <p>
                {formatDate(item.startDate)}, <br /> {formatDate(item.endDate)}
              </p>
              <div className="flex items-center gap-2">
                {/* <img className='w-8 rounded-full bg-gray-200' src={item.user.} alt="" />  */}
                <p>{item.user.name}</p>
              </div>
              <p>
                {currency}
                {item.subtotal}
              </p>
              {item.cancelled ? (
                <p className="text-red-500 text-xs font-medium">Cancelled</p>
              ) : item.isCompleted ? (
                <p className="text-green-500 text-xs font-medium">Completed</p>
              ) : (
                <img
                  onClick={() => cancelAppointment(item)}
                  className="w-10 cursor-pointer"
                  src={assets.cancel_icon}
                  alt=""
                />
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default OrdersInProgress;
