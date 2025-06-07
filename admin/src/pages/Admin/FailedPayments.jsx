import React, { useState } from "react";
import { XCircle, CreditCard, User, Mail, DownloadCloud } from "lucide-react";
import { motion } from "framer-motion";
import * as XLSX from "xlsx";

const failedPayments = [
  {
    id: "PMT-004",
    name: "Alice Johnson",
    amount: "$60.00",
    method: "UPI",
    date: "Apr 15, 2025",
    email: "alice@example.com",
    status: "Failed",
    receiver: {
      pilot: "Suresh Kumar",
      phone: "9090909090",
      orderId: "ORD987",
      acre: "2",
      district: "Gaya",
    },
  },
  {
    id: "PMT-005",
    name: "Bob Martin",
    amount: "$150.00",
    method: "Credit Card",
    date: "Apr 14, 2025",
    email: "bob@example.com",
    status: "Failed",
    receiver: {
      pilot: "Amit Singh",
      phone: "9191919191",
      orderId: "ORD654",
      acre: "7",
      district: "Darbhanga",
    },
  },
];

const rowVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1 },
  }),
};

const exportToExcel = () => {
  const ws = XLSX.utils.json_to_sheet(
    failedPayments.map((p) => ({
      Name: p.name,
      Email: p.email,
      "Payment ID": p.id,
      Method: p.method,
      Date: p.date,
      Amount: p.amount,
      Status: p.status,
      "Pilot Name": p.receiver.pilot,
      "Phone No": p.receiver.phone,
      "Order ID": p.receiver.orderId,
      Acre: p.receiver.acre,
      District: p.receiver.district,
    }))
  );
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Failed Payments");
  XLSX.writeFile(wb, "failed_payments.xlsx");
};

const FailedPaymentsCard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;
  const totalPages = Math.ceil(failedPayments.length / itemsPerPage);
  const paginatedPayments = failedPayments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const changePage = (direction) => {
    setCurrentPage((prev) =>
      direction === "next"
        ? Math.min(prev + 1, totalPages)
        : Math.max(prev - 1, 1)
    );
  };

  return (
    <div className="w-full bg-white shadow-lg rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">Failed Payments</h2>
        <div className="flex items-center gap-4">
          <button
            onClick={exportToExcel}
            className="flex items-center text-sm text-red-600 hover:text-red-800 transition"
          >
            <DownloadCloud className="w-5 h-5 mr-1" /> Export to Excel
          </button>
          <XCircle className="text-red-500 w-6 h-6" />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-700 table-auto">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs tracking-wider">
            <tr>
              <th className="px-6 py-3 text-left">Customer</th>
              <th className="px-6 py-3 text-left">Payment ID</th>
              <th className="px-6 py-3 text-left">Method</th>
              <th className="px-6 py-3 text-left">Date</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Received By</th>
              <th className="px-6 py-3 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {paginatedPayments.map((payment, index) => (
              <motion.tr
                key={payment.id}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={rowVariants}
                className="border-b hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="px-6 py-4 whitespace-nowrap flex items-center gap-2">
                  <User className="text-blue-500 w-4 h-4" />
                  <span>{payment.name}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap flex items-center gap-2">
                  <Mail className="text-gray-500 w-4 h-4" />
                  <span>{payment.email}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{payment.id}</td>
                <td className="px-6 py-4 whitespace-nowrap flex items-center gap-1">
                  <CreditCard className="w-4 h-4 text-purple-500" />
                  <span>{payment.method}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{payment.date}</td>
                <td className="px-6 py-4">
                  <span className="text-xs font-semibold px-2 py-1 rounded-full bg-red-100 text-red-700">
                    {payment.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-pre-line text-sm text-gray-700">
                  <p><span className="font-semibold">Pilot:</span> {payment.receiver.pilot}</p>
                  <p><span className="font-semibold">Phone No:</span> {payment.receiver.phone}</p>
                  <p><span className="font-semibold">Order ID:</span> {payment.receiver.orderId}</p>
                  <p><span className="font-semibold">Acre:</span> {payment.receiver.acre}</p>
                  <p><span className="font-semibold">District:</span> {payment.receiver.district}</p>
                </td>
                <td className="px-6 py-4 text-red-600 font-medium text-right whitespace-nowrap">
                  {payment.amount}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <div className="space-x-2">
          <button
            onClick={() => changePage("prev")}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => changePage("next")}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default FailedPaymentsCard;
