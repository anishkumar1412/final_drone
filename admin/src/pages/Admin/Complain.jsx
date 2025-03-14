import React, { useContext } from "react";
import { assets } from "../../assets/assets_admin/assets";
import { AdminContext } from "../../context/AdminContext";

const Complain = () => {
  const { complaints, loading } = useContext(AdminContext);

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-[calc(100vw-250px)] overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="w-full min-w-[1200px] border-collapse">
          <thead className="bg-gray-100 text-gray-700 text-sm uppercase border-b">
            <tr>
              <th className="py-4 px-6 text-left">Product</th>
              <th className="py-4 px-6 text-left">User</th>
              <th className="py-4 px-6 text-left">Complaint</th>
              <th className="py-4 px-6 text-left">Date</th>
              <th className="py-4 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center py-4">Loading...</td>
              </tr>
            ) : (
              complaints.map((complaint) => (
                <tr key={complaint._id} className="border-b">
                  <td className="py-4 px-6 whitespace-nowrap flex items-center gap-4">
                    <img
                      src={complaint.productImage || assets.dronequadcopter}
                      alt={complaint.productName}
                      className="w-12 h-12 rounded-md object-cover"
                    />
                    <p className="font-medium text-gray-800">{complaint.productName}</p>
                  </td>
                  <td className="py-3 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <img
                        src={complaint.userImage || assets.drone_icon}
                        alt={complaint.userName}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <p className="font-semibold">{complaint.userName}</p>
                        <p className="text-sm text-gray-500">{complaint.userEmail}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 max-w-[300px] text-wrap">
                    <p className="font-semibold">{complaint.reviewTitle}</p>
                    <p className="text-sm text-gray-600">{complaint.reviewText}</p>
                  </td>
                  <td className="py-3 whitespace-nowrap">
                    <p className="font-semibold">{new Date(complaint.date).toLocaleString()}</p>
                  </td>
                  <td className="py-4 px-4 text-gray-600 cursor-pointer">...</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Complain;
