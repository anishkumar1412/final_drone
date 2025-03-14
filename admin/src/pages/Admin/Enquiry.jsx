import React, { useContext } from "react";
import { assets } from "../../assets/assets_admin/assets";
import { AdminContext } from "../../context/AdminContext";

const Enquiry = () => {
  const { enquiry, loading } = useContext(AdminContext);

  return (
    <div className="container mx-auto p-4">
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-full bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
          <thead className="bg-gray-100 text-gray-700 text-sm uppercase border-b">
            <tr>
              <th className="p-4 text-left">Product</th>
              <th className="p-4 text-left">User</th>
              <th className="p-4 text-left">Enquiry Details</th>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center py-4">Loading...</td>
              </tr>
            ) : (
              enquiry.map((item) => (
                <tr key={item._id} className="border-b hover:bg-gray-50">
                  {/* Product Column */}
                  <td className="p-4 flex items-center gap-4">
                    <img
                      src={item.productImage || assets.dronequadcopter}
                      alt={item.productName}
                      className="w-14 h-14 rounded-md object-cover"
                    />
                    <p className="font-medium text-gray-800">{item.productName}</p>
                  </td>

                  {/* User Column */}
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <img
                        src={item.userImage || assets.drone_icon}
                        alt={item.userName}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <p className="font-semibold">{item.userName}</p>
                        <p className="text-sm text-gray-500">{item.userEmail}</p>
                      </div>
                    </div>
                  </td>

                  {/* Enquiry Details */}
                  <td className="p-4 max-w-[300px] break-words whitespace-normal overflow-hidden">
                    <p className="font-semibold">{item.reviewTitle}</p>
                    <p className="text-sm text-gray-600">{item.reviewText}</p>
                  </td>

                  {/* Date Column */}
                  <td className="p-4">
                    <p className="font-semibold">{new Date(item.date).toLocaleString()}</p>
                  </td>

                  {/* Actions */}
                  <td className="p-4 text-gray-600 cursor-pointer">...</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Enquiry;
