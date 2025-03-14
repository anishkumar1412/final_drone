import React, { useEffect } from "react";
import { assets } from "../../assets/assets_admin/assets";
import { AdminContext } from "../../context/AdminContext";
import { useContext } from "react";

const Review = () => {
  const { reviews, loading } = useContext(AdminContext);

  return (
    <div className="container mx-auto p-4">
      {/* Wrapper to prevent sidebar overlap */}
      <div className="max-w-[calc(100vw-250px)] overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="w-full min-w-[1000px] border-collapse">
          <thead className="bg-gray-100 text-gray-700 text-sm uppercase border-b">
            <tr>
              <th className="py-4 px-6 text-left">Product</th>
              <th className="py-4 px-6 text-left">Reviewer</th>
              <th className="py-4 px-6 text-left">Review</th>
              <th className="py-4 px-6 text-left">Date</th>
              <th className="py-4 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : (
              reviews.map((review) => (
                <tr key={review._id} className="border-b">
                  <td className="py-4 px-6 whitespace-nowrap flex items-center gap-4">
                    <img
                      src={review.productImage || assets.dronequadcopter}
                      alt={review.productName}
                      className="w-12 h-12 rounded-md object-cover"
                    />
                    <p className="font-medium text-gray-800">{review.productName}</p>
                  </td>

                  <td className="py-3 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <img
                        src={review.userImage || assets.drone_icon}
                        alt={review.userName}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <p className="font-semibold">{review.userName}</p>
                        <p className="text-sm text-gray-500">{review.userEmail}</p>
                      </div>
                    </div>
                  </td>

                  <td className="py-3 whitespace-normal max-w-[300px]">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-semibold">{review.reviewTitle}</p>
                      <p className="text-sm text-gray-600">{review.reviewText}</p>
                    </div>
                  </td>

                  <td className="py-3 whitespace-nowrap">
                    <p className="font-semibold">
                      {new Date(review.date).toLocaleString()}
                    </p>
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

export default Review;
