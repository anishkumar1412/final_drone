import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";


export const AdminContext = createContext()

const AdminContextProvider = (props) => {

    const [aToken, setAToken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : false)

    const [bookings, setBookings] = useState([])
    const [dashData, setDashData] = useState(false)
    const [reviews, setReviews] = useState([]);
    const [refunds, setRefunds] = useState([]);
    const [complaints, setComplaints] = useState([]);
    const [enquiry, setEnquiry] = useState([]);
    const [loading, setLoading] = useState(false);
    const [upcomingBookings, setUpComingBookings] = useState([]);
    const [ordersInProgress, setOrdersInProgress] = useState([]);
    const [cancelledOrdersCount, setCancelledOrdersCount] = useState(0);
    const [cancelledBookings, setCancelledBookings] = useState([]);
    const [allUsers, setAllUsers] = useState([])
    const [crops, setCrops] = useState(null)
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [cancellationReason, setCancellationReason] = useState("");
    const [customMessage, setCustomMessage] = useState("");
    const [selectedDrone, setSelectedDrone] = useState(null);
    const [cancelledBy, setCancelledBy] = useState("");
    const [sidebarVisible, setSidebarVisible] = useState(true);


    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [dtoken, setDtoken] = useState(localStorage.getItem("dToken"));
    const [token, settoken] = useState(dtoken || aToken);
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    // Load token from localStorage on mount
    const storedToken = localStorage.getItem("dToken");
    if (storedToken) {
      setDtoken(storedToken);
      fetchUserPermissions(storedToken);
      console.log("anish",permissions)
      console.log("object")
    }
  }, []);
  useEffect(() => {
  const token = localStorage.getItem('aToken');
  if (token) {
    setAToken(token);
  }
}, []);
useEffect(()=>{
   const token = dtoken || aToken
  settoken(token);
},[])


  const fetchUserPermissions = async (token) => {
    try {
      const { data } = await axios.get("http://localhost:9000/api/admin/me", {
        headers: { Authorization: `Bearer ${token}` },
    });
        console.log("Anish",data)
  
      console.log("User Permissions Response:", data);
  
      if (data.success) {
        setPermissions(data.admin.access || []); 
        console.log(data)// Ensure access is always an array
      } else {
        console.log("Error fetching permissions:", data.message);
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Failed to fetch permissions", error);
  
      // Handle errors correctly
      const errorMessage = error.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
    }
  };
  
  useEffect(() => {
    console.log("✅ Permissions updated:", permissions);
  }, [permissions]);

    const [drones, setDrones] = useState([])
    useEffect(() => {
        const fetchReviews = async () => {
            setLoading(true);
            try {
                const { data } = await axios.get(`${backendUrl}/api/get-reviews`,{ headers: {
                    Authorization: `Bearer ${token}`,
                  },});
                if (data.success) {
                    setLoading(false)
                    setReviews(data.reviews);
                } else {
                    setLoading(false)
                    toast.error(data.message);
                }
            } catch (error) {
                setLoading(false)
                toast.error(error.response?.data.message || error.message);
            }
        };
        if (token) fetchReviews();
    }, [token])
    useEffect(() => {
        const fetchRefunds = async () => {
            setLoading(true);
            try {
                const { data } = await axios.get(`${backendUrl}/api/get-refunds`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    });
                if (data.success) {
                    setLoading(false)
                    setRefunds(data.refunds);

                } else {
                    setLoading(false)
                    toast.error(data.message);
                }
            } catch (error) {
                setLoading(false)
                toast.error(error.response?.data.message || error.message);
            }
        };
        if (token) fetchRefunds();
    }, [token])
    useEffect(() => {
        const fetchComplains = async () => {
            setLoading(true);
            try {
                const { data } = await axios.get(`${backendUrl}/api/get-complaints`, {headers: {
                    Authorization: `Bearer ${token}`,
                  },});
                if (data.success) {
                    setLoading(false)
                    setComplaints(data.complaints);

                } else {
                    setLoading(false)
                    toast.error(data.message);
                }
            } catch (error) {
                setLoading(false)
                toast.error(error.response?.data.message || error.message);
            }
        };
        if (token) fetchComplains();
    }, [token])
    useEffect(() => {
        const fetchEnquiry = async () => {
            setLoading(true);
            try {
                const { data } = await axios.get(`${backendUrl}/api/get-enquiry`,  {headers: {
                    Authorization: `Bearer ${token}`,
                  },});
                if (data.success) {
                    setLoading(false)
                    setEnquiry(data.enquiry);

                } else {
                    setLoading(false)
                    toast.error(data.message);
                }
            } catch (error) {
                setLoading(false)
                toast.error(error.response?.data.message || error.message);
            }
        };
        if (token) fetchEnquiry();
    }, [token])

    useEffect(() => {
        const fetchDrones = async () => {
            try {
                const { data } = await axios.get(`${backendUrl}/api/auth/getDrone`,{ headers: {
                    Authorization: `Bearer ${token}`,
                  },}); // Ensure correct endpoint

                if (data.success) {
                    setDrones(data.drones);
                } else {
                    console.error("API Error:", data.message);
                }
            } catch (error) {
                console.error("Fetch Error:", error);
            }
        };

        fetchDrones();
    }, []);

    useEffect(() => {
        const fetchCrops = async () => {
            try {
                const { data } = await axios.get(`${backendUrl}/api/auth/getCrop`,
                    {headers: {
                        Authorization: `Bearer ${token}`,
                      },}
                ); // Ensure correct endpoint

                console.log("It is working of crops")
                // console.log("Data is here",data)
                if (data.success) {
                    setCrops(data.crops);
                    console.log(crops)
                } else {
                    console.error("API Error:", data.message);
                }
            } catch (error) {
                console.error("Fetch Error:", error);
            }
        };
        fetchCrops();

    }, [])

    useEffect(() => {
        console.log(crops)
    }, [crops])

    const fetchUsers = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/auth/getUsers`, {headers: {
                Authorization: `Bearer ${token}`,
              },}
            ); // Adjust URL as needed
            setAllUsers(data.users)
            // Handle user data here
            console.log("this is from userserara ", allUsers)
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    // Call the function

    useEffect(() => {
        fetchUsers();
    }, [])

    useEffect(() => {
        console.log(drones); // Logs updated state when it changes
    }, [drones]);

    const changeAvailability = async (docId) => {
        try {

            const { data } = await axios.post(backendUrl + '/api/admin/changeAvailability', { docId },{ headers: {
                Authorization: `Bearer ${token}`,
              }},)
            if (data.success) {
                toast.success(data.message)
                getAllDoctors()
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)

        }
    }

    const getAllBokings = async () => {
        try {

            const { data } = await axios.get(`${backendUrl}/api/admin/getBookings`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
            if (data.success) {

                setBookings(data.allBooking)

                console.log(data.allBooking)
                const cancelledBookings = data.allBooking.filter(booking => booking.cancelled === true);
     setCancelledBookings(cancelledBookings);
                
                const cancelledCount = cancelledBookings.length;
                console.log(cancelledCount)
    
                // Update state with the count
                setCancelledOrdersCount(cancelledCount);
                console.log("Cancelled Orders Count:", cancelledCount);

            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }
    
    useEffect(() => {
        getAllBokings();
    }, [])
    const getUpcomingBookings = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/admin/getBookings`,{
                headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
            );
            if (data.success) {
                const today = new Date();
                today.setHours(0, 0, 0, 0); // Reset time to start of the day
    
                const sevenDaysLater = new Date();
                sevenDaysLater.setDate(today.getDate() + 7); // Get date 7 days ahead
    
                // Filter bookings for the next 7 days (including today)
                const filteredBookings = data.allBooking.filter(booking => {
                    const bookingDate = new Date(booking.startDate);
                    bookingDate.setHours(0, 0, 0, 0); // Reset time for accurate comparison
                    
                    return bookingDate > today && bookingDate <= sevenDaysLater;
                });
    
                setUpComingBookings(filteredBookings);
                console.log("Upcoming Bookings (Next 7 Days):", filteredBookings);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };
    useEffect(()=>{
        getUpcomingBookings();
    },[])

    const getOrdersInProgress = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/admin/getBookings`,{
                headers: {
                    Authorization: `Bearer ${token}`,
                  },
                });
            if (data.success) {
                const today = new Date().toDateString(); // Get today's date as string

                // Filter bookings where startDate is exactly today
                const todayBookings = data.allBooking.filter(booking => {
                    const bookingDate = new Date(booking.startDate).toDateString();
                    return bookingDate === today; // Match exact date
                });

                setOrdersInProgress(todayBookings);
                console.log("Orders In Progress:", todayBookings);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };












    const getDashData = async () => {
        try {

            const { data } = await axios.get(backendUrl + '/api/admin/dashboard',{
                headers: {
                    Authorization: `Bearer ${token}`,
                  },
                });

            if (data.success) {
                setDashData(data.dashData)
                console.log(data.dashData)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)

        }
    }





    const cancelAppointment = async (drone) => {

        Swal.fire({
            title: "Are you sure?",
            text: "Do you really want to cancel this appointment?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, cancel it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    console.log(token); // Check if the token is logged properly
                    console.log("yhyhyhy",drone);
                   

                    const id = drone.droneId;
                    const startDate = drone.startDate;
                    const endDate = drone.endDate;
                    console.log("cancelledBy Admin or not",cancelledBy);
                    console.log("anish" , customMessage,cancellationReason)
                    
                    // Make sure token is available and then pass it in the headers
                    const response = await axios.post(
                         `${backendUrl}/api/admin/cancelBooking/${id}`,
                        { startDate, endDate,cancellationReason, 
                            customMessage ,cancelledBy: "admin"
                             }, // Empty body if not needed
                        {
                            headers: { Authorization: `Bearer ${token}` }, // Pass the headers in the correct place
                        }
                    );

                    console.log("response data",response.data);
                    

                    if (response.data.success) {
                        Swal.fire("Cancelled!", "Booking has been cancelled.", "success");
                    } else {
                        Swal.fire("Error!", response.data.message, "error");
                    }
                } catch (error) {
                    console.error(
                        "Error canceling booking:",
                        error.response?.data || error.message
                    );
                }
                setModalIsOpen(false);
                
                setSelectedDrone(null);
                window.location.reload();
            }
        });
    };


    const removeDrone = async (droneId) => {
        try {
            console.log(token)
            if (!droneId) {
                console.error("❌ Drone ID is missing!");
                return;
            }

            console.log(" Removing Drone ID:", droneId);

            const response = await axios.post(
                `${backendUrl}/api/admin/removeDrone/${droneId}`,
                {},
                {
                    headers: { Authorization: `Bearer ${token}` }, // Pass the headers in the correct place
                }

            );

            console.log(" Response:", response.data);

            if (response.data.success) {
                toast.success("Drone removed successfully!");
                return response.data;
            } else {
                toast.error(response.data.message || "Failed to remove drone.");
            }
        } catch (error) {
            console.error(" Error removing drone:", error.response?.data || error.message);
            toast.error(error.response?.data.message || "Server Error. Try again.");
        }
    };



    const formatDate = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleDateString("en-GB"); // en-GB uses dd/mm/yyyy format
    }
    const updateDroneAvailability = (id, newAvailability) => {
        setDrones((prevDrones) =>
            prevDrones.map((drone) =>
                drone._id === id ? { ...drone, availability: newAvailability } : drone
            )
        );
    };


    const updatePilot = async (bookingId, pilotId, pilotName) => {
        try {
          const {data} = await axios.post(
            `${backendUrl}/api/admin/update-pilot/${bookingId}`,
            {
              pilot: pilotId,
              pilotName: pilotName,
            },
            {
              headers: {
                Authorization:`Bearer ${token}`,
              },
            }
          );
      
          console.log("Pilot updated successfully:", data.message);
          return data;
        } catch (error) {
          console.error("Error updating pilot:", data?.message || error.message);
        }
      };
    const updateCoPilot = async (bookingId, coPilotId, coPilotName) => {
        try {
          const {data} = await axios.post(
            `${backendUrl}/api/admin/update-copilot/${bookingId}`,
            {
              coPilot: coPilotId,
              coPilotName: coPilotName,
            },
            {
              headers: {
                Authorization:`Bearer ${token}`,
              },
            }
          );
      
          console.log("CoPilot updated successfully:", data.message);
          return data;
        } catch (error) {
          console.error("Error updating pilot:", data?.message || error.message);
        }
      };


    const value = {
        token, setAToken,aToken,
        backendUrl, 
        changeAvailability,
        bookings, setBookings,
        getAllBokings,
        cancelAppointment,
        getDashData, dashData, drones, formatDate, removeDrone, updateDroneAvailability,
        reviews, setReviews, loading, setLoading, refunds, complaints, setComplaints, enquiry, setEnquiry, cancelledOrdersCount, getUpcomingBookings, upcomingBookings, setUpComingBookings, getOrdersInProgress, ordersInProgress, setOrdersInProgress,
        allUsers, crops,updatePilot,updateCoPilot,cancelledBookings,setModalIsOpen,modalIsOpen,customMessage, setCustomMessage,cancellationReason, setCancellationReason,setSelectedDrone,selectedDrone,cancelledBy,setCancelledBy,permissions,dtoken,setSidebarVisible,sidebarVisible

    }

    return (
        <AdminContext.Provider value={value} >
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider