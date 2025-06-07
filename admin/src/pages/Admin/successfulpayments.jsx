import React, { useState } from "react";
import { CheckCircle, CreditCard, User, Mail, DownloadCloud, BadgeCheck } from "lucide-react";
import { motion } from "framer-motion";
import * as XLSX from "xlsx";

const payments = [
  {
    id: "PMT-001",
    name: "John Doe",
    amount: "$120.00",
    method: "Credit Card",
    date: "Apr 18, 2025",
    email: "john@example.com",
    status: "Paid",
    receiver: {
      pilot: "Anish Kumar",
      phone: "9484844949",
      orderId: "ORD123",
      acre: "5",
      district: "Patna",
    },
  },
  {
    id: "PMT-002",
    name: "Jane Smith",
    amount: "$85.50",
    method: "PayPal",
    date: "Apr 17, 2025",
    email: "jane@example.com",
    status: "Paid",
    receiver: {
      pilot: "Rajeev Ranjan",
      phone: "9876543210",
      orderId: "ORD456",
      acre: "3",
      district: "Ranchi",
    },
  },
  {
    id: "PMT-003",
    name: "Michael Brown",
    amount: "$299.99",
    method: "Bank Transfer",
    date: "Apr 16, 2025",
    email: "michael@example.com",
    status: "Refunded",
    receiver: {
      pilot: "Ravi Prakash",
      phone: "9123456780",
      orderId: "ORD789",
      acre: "10",
      district: "Muzaffarpur",
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
    payments.map((p) => ({
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
  XLSX.utils.book_append_sheet(wb, ws, "Payments");
  XLSX.writeFile(wb, "successful_payments.xlsx");
};

const SuccessfulPaymentsCard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;
  const totalPages = Math.ceil(payments.length / itemsPerPage);
  const paginatedPayments = payments.slice(
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

  const totalRevenue = payments.reduce((acc, p) => acc + parseFloat(p.amount.replace("$", "")), 0);

  return (
    <div className="w-full bg-white shadow-lg rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">Successful Payments</h2>
        <div className="flex items-center gap-4">
          <button
            onClick={exportToExcel}
            className="flex items-center text-sm text-blue-600 hover:text-blue-800 transition"
          >
            <DownloadCloud className="w-5 h-5 mr-1" /> Export to Excel
          </button>
          <CheckCircle className="text-green-500 w-6 h-6" />
        </div>
      </div>

      

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-700 table-auto">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs tracking-wider">
            <tr>
              <th className="px-6 py-3 text-left align-top">Customer</th>
              <th className="px-6 py-3 text-left align-top">Payment ID</th>
              <th className="px-6 py-3 text-left align-top">Method</th>
              <th className="px-6 py-3 text-left align-top">Date</th>
              <th className="px-6 py-3 text-left align-top">Status</th>
              <th className="px-6 py-3 text-left align-top">Received By</th>
              <th className="px-6 py-3 text-right align-top">Amount</th>
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
                className="border-b hover:bg-gray-50 transition-colors duration-200 align-top"
              >
                <td className="px-6 py-4 whitespace-nowrap flex items-center gap-2 align-top">
                  <User className="text-blue-500 w-4 h-4" />
                  <span>{payment.name}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap flex items-center gap-2 align-top">
                  <Mail className="text-gray-500 w-4 h-4" />
                  <span>{payment.email}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap align-top">{payment.id}</td>
                <td className="px-6 py-4 whitespace-nowrap flex items-center gap-1 align-top">
                  <CreditCard className="w-4 h-4 text-purple-500" />
                  <span>{payment.method}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap align-top">{payment.date}</td>
                <td className="px-6 py-4 align-top">
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    payment.status === "Paid"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}>
                    {payment.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-pre-line text-sm text-gray-700 align-top">
                  <div><span className="font-semibold">Pilot:</span> {payment.receiver.pilot}</div>
                  <div><span className="font-semibold">Phone No:</span> {payment.receiver.phone}</div>
                  <div><span className="font-semibold">Order ID:</span> {payment.receiver.orderId}</div>
                  <div><span className="font-semibold">Acre:</span> {payment.receiver.acre}</div>
                  <div><span className="font-semibold">District:</span> {payment.receiver.district}</div>
                </td>
                <td className="px-6 py-4 text-green-600 font-medium text-right whitespace-nowrap align-top">
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

export default SuccessfulPaymentsCard;
