import React, { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets_admin/assets";
import { DoctorContext } from "../context/DoctorContext";

function Sidebar() {
  const { aToken } = useContext(AdminContext);
  // const { dToken } = useContext(DoctorContext);
  const [isOpen, setIsOpen] = useState(false);
  const [masterOpen, setMasterOpen] = useState(false)
  const [userOpen,setUserOpen] = useState(false)
  const {dToken} = useContext(DoctorContext)


  return (
    <div className="min-h-screen  overflow-y-scroll bg-white border-r">
      {(aToken || dToken )&& (
        <ul className="text-[#515151] mt-5">
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
              }`
            }
            to={"/"}
          >
            <img src={assets.home_icon}  alt="" />
            <p>Dashboard</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
              }`
            }
            to={"/all-appointments"}
          >
            <img src={assets.appointment_icon} alt="" />
            <p>Booking</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
              }`
            }
            to={"/doctor-list"}
          >
            <img src={assets.people_icon} alt="" />
            <p>Drone List</p>
          </NavLink>


          <div
            className="flex items-center justify-between gap-3 py-3.5 px-3 md:px-9 w-full md:w-72 cursor-pointer"
            onClick={() => setMasterOpen(!masterOpen)}
          >
            <div className="flex items-center gap-3">
              <img src={assets.list_icon} className="grayscale brightness-50 contrast-100" alt="icon" />
              <p>Master</p>
            </div>
            <span>{masterOpen ? "▲" : "▼"}</span> {/* Arrow Toggle */}
          </div>

          {/* Drop Down for master  */}

          {masterOpen && (
            <div className="flex flex-col gap-3 py-3.5 px-3 w-full md:w-69 cursor-pointer">

              <NavLink
                className={({ isActive }) =>
                  `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
                  }`
                }
                to={"add-doctor"}
              >
                <img src={assets.add_icon} alt="" />
                <p>Add Drone</p>
              </NavLink>
             
              <NavLink
                className={({ isActive }) =>
                  `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
                  }`
                }
                to={"add-crop"}
              >
                <img src={assets.add_icon} alt="" />
                <p>Add Crop</p>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
                  }`
                }
                to={"add-wd"}
              >
                <img src={assets.add_icon} alt="" />
                <p>Add Working Days</p>
              </NavLink>
             

             
            </div>
          )}


          {/* Drop down for user  */}
          <div
            className="flex items-center justify-between gap-3 py-3.5 px-3 md:px-9 w-full md:w-72 cursor-pointer"
            onClick={() => setUserOpen(!userOpen)}
          >
            <div className="flex items-center gap-3">
              <img src={assets.list_icon} className="grayscale brightness-50 contrast-100" alt="icon" />
              <p>Users</p>
            </div>
            <span>{userOpen ? "▲" : "▼"}</span> {/* Arrow Toggle */}
          </div>

          {userOpen && (
            <div className="flex flex-col gap-3 py-3.5 px-3 w-full md:w-69 cursor-pointer">

              <NavLink
                className={({ isActive }) =>
                  `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
                  }`
                }
                to={"/add-admins"}
              >
                <img src={assets.add_icon} alt="" />
                <p>Add Admins</p>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
                  }`
                }
                to={"/adminUser"}
              >
                <img src={assets.add_icon} alt="" />
                <p>Admin</p>
              </NavLink>
             
              <NavLink
                className={({ isActive }) =>
                  `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
                  }`
                }
                to={"/farmer"}
              >
                <img src={assets.add_icon} alt="" />
                <p>Farmer</p>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
                  }`
                }
                to={"/pilot"}
              >
                <img src={assets.add_icon} alt="" />
                <p>Pilot</p>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
                  }`
                }
                to={"/coPilot"}
              >
                <img src={assets.add_icon} alt="" />
                <p>Co Pilot</p>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
                  }`
                }
                to={"/dron-owner"}
              >
                <img src={assets.add_icon} alt="" />
                <p>Drone's Owner</p>
              </NavLink>
             

             
            </div>
          )}

          <div
            className="flex items-center justify-between gap-3 py-3.5 px-3 md:px-9 w-full md:w-72 cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="flex items-center gap-3">
              <img src={assets.list_icon} alt="icon" />
              <p>Tickets</p>
            </div>
            <span>{isOpen ? "▲" : "▼"}</span> {/* Arrow Toggle */}
          </div>
        </ul>
      )}



      {/* Dropdown Items */}
      {isOpen && (
        <div className="flex flex-col gap-3 py-3.5 px-3 w-full md:w-69 cursor-pointer">
          <NavLink to="/tickets/refund" className={({ isActive }) =>
            `flex items-center gap-3 py-3 px-3 md:px-9 w-full md:w-69 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`
          }>Refund</NavLink>

          <NavLink to="/tickets/review" className={({ isActive }) =>
            `flex items-center gap-3 py-3 px-3 md:px-9 w-full md:w-69 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`
          }>Review</NavLink>

          <NavLink to="/tickets/complain" className={({ isActive }) =>
            `flex items-center gap-3 py-3 px-3 md:px-9 w-full md:w-69 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`
          }>Complain</NavLink>

          <NavLink to="/tickets/enquiry" className={({ isActive }) =>
            `flex items-center gap-3 py-3 px-3 md:px-9 w-full md:w-69 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`
          }>Enquiry</NavLink>

          <NavLink to="/tickets/other" className={({ isActive }) =>
            `flex items-center gap-3 py-3 px-3 md:px-9 w-full md:w-69 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`
          }>Other</NavLink>
        </div>
      )}
      
    </div>
  );
}

export default Sidebar;
