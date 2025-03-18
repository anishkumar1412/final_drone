import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export const AdminContext = createContext()

const AdminContextProvider = (props) => {

    const [aToken, setAToken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : false)
    const [doctors, setDoctors] = useState([])
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


    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [drones, setDrones] = useState([])
    useEffect(() => {
        const fetchReviews = async () => {
            setLoading(true);
            try {
                const { data } = await axios.get(`${backendUrl}/api/get-reviews`, { headers: { aToken } });
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
        if (aToken) fetchReviews();
    }, [aToken])
    useEffect(() => {
        const fetchRefunds = async () => {
            setLoading(true);
            try {
                const { data } = await axios.get(`${backendUrl}/api/get-refunds`, { headers: { aToken } });
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
        if (aToken) fetchRefunds();
    }, [aToken])
    useEffect(() => {
        const fetchComplains = async () => {
            setLoading(true);
            try {
                const { data } = await axios.get(`${backendUrl}/api/get-complaints`, { headers: { aToken } });
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
        if (aToken) fetchComplains();
    }, [aToken])
    useEffect(() => {
        const fetchEnquiry = async () => {
            setLoading(true);
            try {
                const { data } = await axios.get(`${backendUrl}/api/get-enquiry`, { headers: { aToken } });
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
        if (aToken) fetchEnquiry();
    }, [aToken])

    useEffect(() => {
        const fetchDrones = async () => {
            try {
                const { data } = await axios.get(`${backendUrl}/api/auth/getDrone`); // Ensure correct endpoint

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
                const { data } = await axios.get(`${backendUrl}/api/auth/getCrop`); // Ensure correct endpoint

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
            const { data } = await axios.get(`${backendUrl}/api/auth/getUsers`,
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

            const { data } = await axios.post(backendUrl + '/api/admin/changeAvailability', { docId }, { headers: { aToken } })
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

            const { data } = await axios.get(`${backendUrl}/api/admin/getBookings`)
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
            const { data } = await axios.get(`${backendUrl}/api/admin/getBookings`);
            if (data.success) {
                const today = new Date();
                today.setHours(0, 0, 0, 0); // Reset time to start of the day
    
                const sevenDaysLater = new Date();
                sevenDaysLater.setDate(today.getDate() + 7); // Get date 7 days ahead
    
                // Filter bookings for the next 7 days (including today)
                const filteredBookings = data.allBooking.filter(booking => {
                    const bookingDate = new Date(booking.startDate);
                    bookingDate.setHours(0, 0, 0, 0); // Reset time for accurate comparison
                    
                    return bookingDate >= today && bookingDate <= sevenDaysLater;
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
            const { data } = await axios.get(`${backendUrl}/api/admin/getBookings`);
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

            const { data } = await axios.get(backendUrl + '/api/admin/dashboard', { headers: { aToken } })

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
                    console.log(aToken); // Check if the token is logged properly
                    console.log(drone);

                    const id = drone.droneId;
                    const startDate = drone.startDate;
                    const endDate = drone.endDate;

                    // Make sure token is available and then pass it in the headers
                    const response = await axios.post(
                         `${backendUrl}/api/booking/cancelBooking/${id}`,
                        { startDate, endDate }, // Empty body if not needed
                        {
                            headers: { Authorization: `Bearer ${aToken}` }, // Pass the headers in the correct place
                        }
                    );

                    console.log(response.data);

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
            }
        });
    };


    const removeDrone = async (droneId) => {
        try {
            console.log(aToken)
            if (!droneId) {
                console.error("❌ Drone ID is missing!");
                return;
            }

            console.log(" Removing Drone ID:", droneId);

            const response = await axios.post(
                `${backendUrl}/api/admin/removeDrone/${droneId}`,
                {},
                {
                    headers: { Authorization: `Bearer ${aToken}` }, // Pass the headers in the correct place
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
                Authorization:`Bearer ${aToken}`,
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
                Authorization:`Bearer ${aToken}`,
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
        aToken, setAToken,
        backendUrl, doctors,
        changeAvailability,
        bookings, setBookings,
        getAllBokings,
        cancelAppointment,
        getDashData, dashData, drones, formatDate, removeDrone, updateDroneAvailability,
        reviews, setReviews, loading, setLoading, refunds, complaints, setComplaints, enquiry, setEnquiry, cancelledOrdersCount, getUpcomingBookings, upcomingBookings, setUpComingBookings, getOrdersInProgress, ordersInProgress, setOrdersInProgress,
        allUsers, crops,updatePilot,updateCoPilot,cancelledBookings

    }

    return (
        <AdminContext.Provider value={value} >
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider