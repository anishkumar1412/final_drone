import React, { useState } from "react";

function AddWorkingDay() {
    const [startAcre, setStartAcre] = useState("");
    const [endAcre, setEndAcre] = useState("");
    const [workingDays, setWorkingDays] = useState("");
    const [workingDaysList, setWorkingDaysList] = useState([]);

    const handleAddWorkingDay = () => {
        if (!startAcre || !endAcre || !workingDays) {
            alert("Please fill all fields.");
            return;
        }

        const newEntry = {
            startAcre,
            endAcre,
            workingDays,
        };

        setWorkingDaysList([...workingDaysList, newEntry]);
        setStartAcre("");
        setEndAcre("");
        setWorkingDays("");
    };

    return (
        <div className="max-w-lg  p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold mb-4 text-center">
                Set Working Days for Acres
            </h2>
            <div className="mb-4">
                <label className="block text-gray-700 font-medium">Start Acre</label>
                <input
                    type="number"
                    className="w-full p-2 border rounded-lg"
                    value={startAcre}
                    onChange={(e) => setStartAcre(e.target.value)}
                    placeholder="Enter starting acre"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 font-medium">End Acre</label>
                <input
                    type="number"
                    className="w-full p-2 border rounded-lg"
                    value={endAcre}
                    onChange={(e) => setEndAcre(e.target.value)}
                    placeholder="Enter ending acre"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 font-medium">Working Days</label>
                <input
                    type="number"
                    className="w-full p-2 border rounded-lg"
                    value={workingDays}
                    onChange={(e) => setWorkingDays(e.target.value)}
                    placeholder="Enter number of working days"
                />
            </div>

            <button
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700"
                onClick={handleAddWorkingDay}
            >
                Add Working Days
            </button>

            {workingDaysList.length > 0 && (
                <div className="mt-6">
                    <h3 className="text-lg font-semibold">Saved Working Days</h3>
                    <ul className="mt-2">
                        {workingDaysList.map((item, index) => (
                            <li
                                key={index}
                                className="border-b p-2 flex justify-between items-center"
                            >
                                <span>
                                    Acres: {item.startAcre} - {item.endAcre} | {item.workingDays}{" "}
                                    days
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default AddWorkingDay;
