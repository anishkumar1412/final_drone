import React, { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets_admin/assets";
import { DoctorContext } from "../context/DoctorContext";

function Sidebar() {
  const { aToken, sidebarVisible, setSidebarVisible, permissions } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  const [isOpen, setIsOpen] = useState(false);
  const [masterOpen, setMasterOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);

  return (
    <>
      <NavLink
        onClick={() => setSidebarVisible(!sidebarVisible)}
        className="mt-6 ml-4 p-2 bg-blue-500 text-white rounded-md"
        to={"/admin"}
      >
        {sidebarVisible ? "Hide" : "Show"}
      </NavLink>

      {sidebarVisible && (
        <div className="min-h-screen overflow-y-scroll bg-white border-r">
          {(aToken || dToken) && (
            <ul className="text-[#515151] mt-5">
              <NavLink
                className={({ isActive }) =>
                  `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                    isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
                  }`
                }
                to={"/admin"}
              >
                <img src={assets.home_icon} alt="" />
                <p>Dashboard</p>
              </NavLink>

              {(aToken || permissions.includes("Total Bookings")) && (
                <NavLink
                  className={({ isActive }) =>
                    `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                      isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
                    }`
                  }
                  to={"/all-appointments"}
                  onClick={() => setSidebarVisible(false)}
                >
                  <img src={assets.appointment_icon} alt="" />
                  <p>Booking</p>
                </NavLink>
              )}

              {(aToken || permissions.includes("Total Drones")) && (
                <NavLink
                  className={({ isActive }) =>
                    `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                      isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
                    }`
                  }
                  to={"/doctor-list"}
                >
                  <img src={assets.people_icon} alt="" />
                  <p>Drone List</p>
                </NavLink>
              )}

              {/* Master Dropdown Parent */}
              {(aToken ||
                permissions.includes("Add Drone") ||
                permissions.includes("Add Crop") ||
                permissions.includes("Add Working Days")) && (
                <div
                  className="flex items-center justify-between gap-3 py-3.5 px-3 md:px-9 w-full md:w-72 cursor-pointer"
                  onClick={() => setMasterOpen(!masterOpen)}
                >
                  <div className="flex items-center gap-3">
                    <img src={assets.list_icon} className="grayscale brightness-50 contrast-100" alt="icon" />
                    <p>Master</p>
                  </div>
                  <span>{masterOpen ? "▲" : "▼"}</span>
                </div>
              )}

              {/* Master Dropdown Children */}
              {masterOpen && (
                <div className="flex flex-col gap-3 py-3.5 px-3 w-full md:w-69 cursor-pointer">
                  {(aToken || permissions.includes("Add Drone")) && (
                    <NavLink
                      to={"add-doctor"}
                      className={({ isActive }) =>
                        `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                          isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
                        }`
                      }
                    >
                      <img src={assets.add_icon} alt="" />
                      <p>Add Drone</p>
                    </NavLink>
                  )}
                  {(aToken || permissions.includes("Add Crop")) && (
                    <NavLink
                      to={"/admin/add-crop"}
                      className={({ isActive }) =>
                        `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                          isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
                        }`
                      }
                    >
                      <img src={assets.add_icon} alt="" />
                      <p>Add Crop</p>
                    </NavLink>
                  )}
                  {(aToken || permissions.includes("Add Working Days")) && (
                    <NavLink
                      to={"add-wd"}
                      className={({ isActive }) =>
                        `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                          isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
                        }`
                      }
                    >
                      <img src={assets.add_icon} alt="" />
                      <p>Add Working Days</p>
                    </NavLink>
                  )}
                </div>
              )}

              {/* Users Dropdown */}
              {(aToken ||
                permissions.includes("Users") ||
                permissions.includes("Add Admins") ||
                permissions.includes("View Admins") ||
                permissions.includes("View Farmers") ||
                permissions.includes("View Pilots") ||
                permissions.includes("View Copilots") ||
                permissions.includes("View Drone's Owner")) && (
                <div
                  className="flex items-center justify-between gap-3 py-3.5 px-3 md:px-9 w-full md:w-72 cursor-pointer"
                  onClick={() => setUserOpen(!userOpen)}
                >
                  <div className="flex items-center gap-3">
                    <img src={assets.list_icon} className="grayscale brightness-50 contrast-100" alt="icon" />
                    <p>Users</p>
                  </div>
                  <span>{userOpen ? "▲" : "▼"}</span>
                </div>
              )}

              {userOpen && (
                <div className="flex flex-col gap-3 py-3.5 px-3 w-full md:w-69 cursor-pointer">
                  {(aToken || permissions.includes("Add Admins")) && (
                    <NavLink to={"/add-admins"} className={({ isActive }) =>
                      `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                        isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
                      }`
                    }>
                      <img src={assets.add_icon} alt="" />
                      <p>Add Admins</p>
                    </NavLink>
                  )}
                  {(aToken || permissions.includes("View Admins")) && (
                    <NavLink to={"/adminUser"} className={({ isActive }) =>
                      `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                        isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
                      }`
                    }>
                      <img src={assets.add_icon} alt="" />
                      <p>Admin</p>
                    </NavLink>
                  )}
                  {(aToken || permissions.includes("View Farmers")) && (
                    <NavLink to={"/farmer"} className={({ isActive }) =>
                      `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                        isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
                      }`
                    }>
                      <img src={assets.add_icon} alt="" />
                      <p>Farmer</p>
                    </NavLink>
                  )}
                  {(aToken || permissions.includes("View Pilots")) && (
                    <NavLink to={"/pilot"} className={({ isActive }) =>
                      `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                        isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
                      }`
                    }>
                      <img src={assets.add_icon} alt="" />
                      <p>Pilot</p>
                    </NavLink>
                  )}
                  {(aToken || permissions.includes("View Copilots")) && (
                    <NavLink to={"/coPilot"} className={({ isActive }) =>
                      `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                        isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
                      }`
                    }>
                      <img src={assets.add_icon} alt="" />
                      <p>Co Pilot</p>
                    </NavLink>
                  )}
                  {(aToken || permissions.includes("View Drone's Owner")) && (
                    <NavLink to={"/dron-owner"} className={({ isActive }) =>
                      `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                        isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
                      }`
                    }>
                      <img src={assets.add_icon} alt="" />
                      <p>Drone's Owner</p>
                    </NavLink>
                  )}
                </div>
              )}

              {/* Tickets Dropdown */}
              {(aToken || permissions.includes("View Tickets")) && (
                <div
                  className="flex items-center justify-between gap-3 py-3.5 px-3 md:px-9 w-full md:w-72 cursor-pointer"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <div className="flex items-center gap-3">
                    <img src={assets.list_icon} alt="icon" />
                    <p>Tickets</p>
                  </div>
                  <span>{isOpen ? "▲" : "▼"}</span>
                </div>
              )}

              {isOpen && (
                <div className="flex flex-col gap-3 py-3.5 px-3 w-full md:w-69 cursor-pointer">
                  {(aToken || permissions.includes("Total Refund Orders")) && (
                    <NavLink to="/tickets/refund" className={({ isActive }) =>
                      `flex items-center gap-3 py-3 px-3 md:px-9 w-full md:w-69 cursor-pointer ${
                        isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
                      }`
                    }>
                      Refund
                    </NavLink>
                  )}
                  {(aToken || permissions.includes("Reviews")) && (
                    <>
                      <NavLink to="/tickets/review" className={({ isActive }) =>
                        `flex items-center gap-3 py-3 px-3 md:px-9 w-full md:w-69 cursor-pointer ${
                          isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
                        }`
                      }>
                        Review
                      </NavLink>
                      <NavLink to="/tickets/complain" className={({ isActive }) =>
                        `flex items-center gap-3 py-3 px-3 md:px-9 w-full md:w-69 cursor-pointer ${
                          isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
                        }`
                      }>
                        Complain
                      </NavLink>
                      <NavLink to="/tickets/enquiry" className={({ isActive }) =>
                        `flex items-center gap-3 py-3 px-3 md:px-9 w-full md:w-69 cursor-pointer ${
                          isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
                        }`
                      }>
                        Enquiry
                      </NavLink>
                      <NavLink to="/tickets/other" className={({ isActive }) =>
                        `flex items-center gap-3 py-3 px-3 md:px-9 w-full md:w-69 cursor-pointer ${
                          isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
                        }`
                      }>
                        Other
                      </NavLink>
                    </>
                  )}
                </div>
              )}
            </ul>
          )}
        </div>
      )}
    </>
  );
}

export default Sidebar;
