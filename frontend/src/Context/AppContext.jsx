import { createContext, useEffect, useState } from "react";
import axios from 'axios'


export const AppContext = createContext()

const AppContextProvider = (props) => {

    const [token, setToken] = useState(false)
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [user, setUser] = useState(null)
    const [drones, setDrones] = useState([])
    const [crops, setCrops] = useState([])
    const [userData, setUserData] = useState(false)
    const [refunds, setRefunds] = useState([])

    
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    
    useEffect(() => {
        setToken(localStorage.getItem('token') ? localStorage.getItem('token') : false)
    }, [])




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
        console.log(drones); // Logs updated state when it changes
    }, [drones]);

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleDateString("en-GB"); // en-GB uses dd/mm/yyyy format
    }

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
    const fetchRefunds = async (userId) => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/refunds`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (data.success) {
                setRefunds(data.refunds);

            }
            else {
                toast.error(data.error);
            }

        } catch (error) {
            console.log(error);
            console.log(error.message)

        }
    }

    useEffect(() => {
        fetchRefunds()
    }, [token])
    useEffect(() => {
        console.log(crops); // Logs updated state when it changes
    }, [crops]);


    const loadUserProfileData = async () => {
        try {

            const { data } = await axios.get(`${backendUrl}/api/auth/get-profile`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (data.success) {
                setUserData(data.user);
                setUser(data.user);
            }




            else {
                toast.error(data.error);
            }

        } catch (error) {
            console.log(error)
            console.error(error.message)

        }
    }
    useEffect(() => {
        if (token) {
            loadUserProfileData();
        }
        else {
            setUserData(false);
        }
    }, [token])
    const value = {
        token, setToken, setUser, user,
        setStartDate, setEndDate, startDate, endDate,
        drones, formatDate, crops, user, userData, setUserData, loadUserProfileData, setRefunds, refunds, backendUrl
    }



    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}


export default AppContextProvider