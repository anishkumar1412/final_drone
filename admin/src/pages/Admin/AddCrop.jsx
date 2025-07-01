import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets_admin/assets';
import { stateDistricts } from '../../assets/assets_admin/assets';
import { toast } from 'react-toastify';
import axios from 'axios';
import { AdminContext } from '../../context/AdminContext';
import Swal from 'sweetalert2';


function AddCrop() {
    const [cropImg, setCropImg] = useState(null);
    const [cropName, setCropeName] = useState('');
    const [cropPerAcer,setCropPerAcer] = useState(0)
    const {backendUrl,token} = useContext(AdminContext)

    const { crops,removeCrop } = useContext(AdminContext)
    console.log(crops)






    const onSubmitHandle = async (event) => {
    event.preventDefault();

    try {
        if (!cropImg) {
            return toast.error('Image not selected');
        }

        // Show SweetAlert2 loader
        Swal.fire({
            title: 'Uploading Crop...',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        const formData = new FormData();
        formData.append('image', cropImg);
        formData.append('cropName', cropName);
        formData.append('cropPerAcer', cropPerAcer);

        const { data } = await axios.post(
            `${backendUrl}/api/admin/addCrop`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        Swal.close(); // Close the loader

        if (data.success) {
            toast.success(data.message);
            // Reset all fields
            setCropImg(null);
            setCropeName('');
            setCropPerAcer(0);
            window.location.reload();

        } else {
            toast.error(data.message);
        }
    } catch (error) {
        Swal.close(); // Close loader in case of error
        toast.error(error.message);
        console.log(error);
    }
};

    

    return (
        <div className='flex flex-col '>
            <form className="m-5 w-full max-h-[80vh] overflow-y-auto" onSubmit={onSubmitHandle}>
                <p className="mb-3 text-lg font-medium">Add Crops</p>
                <div className="bg-white px-8 py-8 border  rounded w-full  ">


                    <div className="flex flex-wrap items-center gap-x-24 gap-y-6 w-full">
                        {/* Upload Section */}
                        <div className="flex items-center gap-4 text-gray-500">
                            <label htmlFor="crop-img">
                                <img
                                    className="w-16 bg-gray-100 rounded-full cursor-pointer"
                                    src={cropImg ? URL.createObjectURL(cropImg) : assets.upload_area}
                                    alt=""
                                />
                            </label>
                            <input
                                onChange={(e) => setCropImg(e.target.files[0])}
                                type="file"
                                id="crop-img"
                                hidden
                            />
                            <p>Upload Crop <br /> picture</p>
                        </div>

                        {/* Input Fields */}
                        <div className="flex flex-col gap-1 text-gray-600">
                            <p>Crop name</p>
                            <input
                                onChange={(e) => setCropeName(e.target.value)}
                                value={cropName}
                                className="border rounded px-3 py-2 w-60"
                                type="text"
                                placeholder="Name"
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-1 text-gray-600">
                            <p>Crop Price(Acer)</p>
                            <input
                                onChange={(e) => setCropPerAcer(e.target.value)}
                                value={cropPerAcer}
                                className="border rounded px-3 py-2 w-60"
                                type="numbar"
                                placeholder="Price per Acer"
                                required
                            />
                        </div>

                        {/* Button */}
                        <button className="bg-primary px-10 py-3 text-white rounded-full">
                            Add Crops
                        </button>
                    </div>



                </div>


            </form>

            <div className='m-5 max-h-[90vh] overflow-y-scroll'>
                <h1 className='text-lg font-medium'>All Crops</h1>
                <div className='w-full flex flex-wrap gap-4 gap-y-6'>
                    {
                        crops &&
                         crops.map((item, i) => (
                            <div className='border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group' key={i}>
                                <img className='bg-indigo-50 group-hover:bg-primary transition-all duration-500' src={item.image} alt="" />
                                <div className='p-4'>
                                    <p className='text-neutral-800 text-lg font-medium'>Name - {item.cropName}</p>
                                    <p className='text-neutral-800 text-lg font-medium'>Price (per acer) - {item.cropPerAcer}</p>
                                    <div className='flex justify-between items-center'>

                                        <button
                                            onClick={()=>removeCrop(item.id)}
                                            className='mt-2 bg-blue-400 px-4 py-1 rounded-full text-white text-sm'
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>

        </div>

    );
}

export default AddCrop;
