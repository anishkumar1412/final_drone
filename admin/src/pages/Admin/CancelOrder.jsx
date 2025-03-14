import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { assets } from "../../assets/assets_admin/assets";

const CancelOrder = () => {
  const { cancelledBookings, formatDate, currency } = useContext(AdminContext);

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">Cancelled Orders 📦</p>

      <div className="bg-white border rounded text-sm min-h-[60vh] max-h-[80vh] overflow-y-scroll">
        {/* Table Header */}
        <div className="hidden sm:grid grid-cols-[0.5fr_2fr_2fr_2fr_2fr_2fr_1fr_1fr] grid-flow-col py-3 border-b">
          <p>#</p>
          <p>Drone</p>
          <p>District</p>
          <p>Date & Time</p>
          <p>User</p>
          <p>Price</p>
          <p>Reason</p>
          <p>Message</p>
        </div>

        {Array.isArray(cancelledBookings) &&
          cancelledBookings
            .slice() // Creates a shallow copy to avoid mutating the original state
            .reverse()
            .map((item, i) => (
              <div
                className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_2fr_2fr_2fr_2fr_2fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50"
                key={i}
              >
                <p className="max-sm:hidden">{i + 1}</p>
                <div className="flex items-center gap-2">
                  <img className="w-20 rounded-md" src={item.droneImg} alt="Drone" />{" "}
                  <p>Drone A</p>
                </div>
                <p className="max-sm:hidden">{item.villagePanchayat}</p>
                <p>
                  {formatDate(item.startDate)}, <br /> {formatDate(item.endDate)}
                </p>
                <div className="flex items-center gap-2">
                  <p>{item.user.name}</p>
                </div>
                <p>
                  {currency}
                  {item.subtotal}
                </p>

                {/* New: Display Cancellation Reason */}
                <p className="text-red-500 text-xs font-medium">
                  {item.cancellationReason || "N/A"}
                </p>

                {/* New: Display Custom Message */}
                <p className="text-gray-700 text-xs">
                  {item.customMessage ? item.customMessage : "No additional message"}
                </p>

              </div>
            ))}
      </div>
    </div>
  );
};

export default CancelOrder;
