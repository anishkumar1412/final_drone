import React from "react";
import { assets } from "../../assets/assets_admin/assets";

const refunds = [
  {
    id: 1,
    productImage: assets.dronequadcopter,
    productName: "Brown Hat",
    orderId:"20987",
    userImage: assets.drone_icon,
    userName: "Amanda Harvey",
    userEmail: "amanda@site.com",
    rating: 5,
    reviewTitle: "I just love it!",
    reviewText:
      "I bought this hat for my boyfriend, but then I found out he cheated... heloo my name is anish",
    date: "Aug 17, 2020, 5:48",
    status: "Published",
  },
  {
    id: 2,
    productImage: assets.dronequadcopter,
    productName: "Calvin Klein t-shirts",
    userImage: assets.drone_icon,
    orderId:"27887",
    userName: "Anne Richard",
    userEmail: "anne@site.com",
    rating: 5,
    reviewTitle: "Really nice",
    reviewText: "Material is great and very comfortable and stylish.",
    date: "Aug 04, 2020, 3:17",
    status: "Pending",
  },
];

const Other = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[1200px] bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-gray-600 text-sm uppercase">
            <tr>
              <th className="py-3  text-left w-[250px]">Product</th>
              <th className="py-3  text-left w-[100px]">Order Id</th>
              <th className="py-3  text-left w-[250px]">Reviewer</th>

              <th className="py-3  mx-3 text-left w-[500px]">Other</th>
              <th className="py-3  text-left w-[200px]">Date</th>
              <th className="py-3  text-left w-[100px]">Status</th>
              <th className="py-3  text-left w-[100px]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {refunds.map((refunds) => (
              <tr key={refunds.id} className="border-b">
                <td className="py-3  whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <img
                      src={refunds.productImage}
                      alt={refunds.productName}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-semibold">{refunds.productName}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3  whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    
                  
                      <p className="font-semibold">{refunds.orderId}</p>

                  </div>
                </td>
                <td className="py-3 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <img
                      src={refunds.userImage}
                      alt={refunds.userName}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-semibold">{refunds.userName}</p>
                      <p className="text-sm text-gray-500">
                        {refunds.userEmail}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="py-3 wrap">
                  <div className="flex items-center gap-2">
                  <p className="font-semibold">{refunds.reviewTitle}</p>
                  <p className="text-sm text-gray-600">{refunds.reviewText}</p>
                  </div>
                </td>
                <td className="py-3 wrap">
                  <div className="flex items-center gap-2">
                  <p className="font-semibold">{refunds.date}</p>
                  </div>
                </td>
                <td className="py-3 wrap">
                  <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      refunds.status === "Published" ? "bg-green-100 text-green-600" : "bg-orange-100 text-orange-600"
                    }`}
                  >
                    {refunds.status}
                  </span>
                  </div>
                </td>
                <td className="py-4 px-4 text-gray-600 cursor-pointer">...</td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Other;
