import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { AdminContext } from "../../context/AdminContext";
import Swal from "sweetalert2";

function AddWorkingDay() {
    const [startAcre, setStartAcre] = useState("");
    const [endAcre, setEndAcre] = useState("");
    const [workingDays, setWorkingDays] = useState("");
    const [workingDaysList, setWorkingDaysList] = useState([]);

    const { backendUrl, aToken } = useContext(AdminContext);

    // Fetch previously saved working days when the component mounts
    useEffect(() => {
        const fetchWorkingDays = async () => {
            try {
                const { data } = await axios.get(`${backendUrl}/api/admin/get-working-days`);

                if (data.success) {
                    setWorkingDaysList(data.workingDays); // Assuming API returns an array
                }
            } catch (error) {
                console.error("Error fetching working days:", error);
            }
        };

        fetchWorkingDays();
    }, [backendUrl, aToken]); // Runs once when the component mounts

    const handleAddWorkingDay = async () => {
        if (!startAcre || !endAcre || !workingDays) {
            Swal.fire({
                icon: "warning",
                title: "Missing Fields",
                text: "Please fill all fields before submitting.",
            });
            return;
        }

        const newEntry = { startAcre, endAcre, workingDays };

        try {
            const { data } = await axios.post(`${backendUrl}/api/admin/working-days`, newEntry, {
                headers: { Authorization: `Bearer ${aToken}` },
            });

            if (data.success) {
                setWorkingDaysList([...workingDaysList, data.workingDay]); // Update list
                setStartAcre("");
                setEndAcre("");
                setWorkingDays("");

                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Working days added successfully!",
                });

                window.location.reload()
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Something went wrong. Please try again.",
                });
            }
        } catch (error) {
            console.error("Error saving data:", error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Failed to save data. Please check your connection.",
            });
        }
    };


    const handleDeleteWorkingDay = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    // const {data} = await axios.delete(`http://your-api-url.com/working-days/${id}`);

                    const { data } = await axios.post(`${backendUrl}/api/admin/delete-working-days/${id}`,
                        {},

                        {
                        headers: { Authorization: `Bearer ${aToken}` },
                    });

                    if(data.success){
                        setWorkingDaysList(prevList => prevList.filter(item => item.id !== id));
                    
                        Swal.fire({
                            title: "Deleted!",
                            text: "The working day has been deleted.",
                            icon: "success",
                            timer: 2000, 
                            showConfirmButton: false
                        });
                        window.location.reload()
                    }else{
                        Swal.fire({
                            title: "Error!",
                            text: data.message,
                            icon: "error"
                        });
                    }
                   
                } catch (error) {
                    console.error("Error deleting working day:", error);
                    Swal.fire({
                        title: "Error!",
                        text: "Failed to delete the working day.",
                        icon: "error"
                    });
                }
            }
        });
    };

    return (
        <div className="flex justify-center items-start gap-8 p-6">
        {/* Form Section */}
        <div className="max-w-lg p-6 bg-white shadow-lg rounded-lg w-1/2">
            <h2 className="text-2xl font-semibold mb-4 text-center text-blue-600">
                Set Working Days for Acres
            </h2>
            <div className="mb-4">
                <label className="block text-gray-700 font-medium">Start Acre</label>
                <input
                    type="number"
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={startAcre}
                    onChange={(e) => setStartAcre(e.target.value)}
                    placeholder="Enter starting acre"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-medium">End Acre</label>
                <input
                    type="number"
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={endAcre}
                    onChange={(e) => setEndAcre(e.target.value)}
                    placeholder="Enter ending acre"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-medium">Working Days</label>
                <input
                    type="number"
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={workingDays}
                    onChange={(e) => setWorkingDays(e.target.value)}
                    placeholder="Enter number of working days"
                />
            </div>
            <button
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700 transition-all shadow-md"
                onClick={handleAddWorkingDay}
            >
                Add Working Days
            </button>
        </div>
        
        {/* Saved Working Days Section */}
        {workingDaysList.length > 0 && (
            <div className="w-1/2 bg-white shadow-lg rounded-lg p-6">
                <h3 className="text-lg font-semibold text-center text-blue-600">Saved Working Days</h3>
                <ul className="mt-4 divide-y divide-gray-300">
                    {workingDaysList.map((item, index) => (
                        <li key={index} className="p-3 bg-gray-50 rounded-md shadow-sm flex justify-between items-center">
                            <span>
                                <span className="font-medium text-gray-700">Acres:</span> {item.startAcre} - {item.endAcre} |
                                <span className="text-blue-600 font-semibold"> {item.workingDays} days</span>
                            </span>
                            <button onClick={() => handleDeleteWorkingDay(item._id)} className="text-red-500 hover:text-red-700">
                                ❌
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        )}
    </div>
    

    );
}

export default AddWorkingDay;
