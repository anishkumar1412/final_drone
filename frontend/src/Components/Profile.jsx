import React, { useContext, useState } from 'react';
import { AppContext } from '../Context/AppContext';
import { assset } from '../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Camera, Edit, Mail, Phone, MapPin, Map, Home } from 'lucide-react';

function Myprofile() {
    const { userData, setUserData, token, backendUrl, loadUserProfileData } = useContext(AppContext);
    const [isEdit, setIsEdit] = useState(false);
    const [image, setImage] = useState(null);

    const updateUserProfileData = async () => {
        try {
            const formData = new FormData();
            formData.append('userId', userData._id);
            formData.append('name', userData.name);
            formData.append('mobNumber', userData.mobNumber);
            formData.append('email', userData.email);
            formData.append('state', userData.state);
            formData.append('district', userData.district);
            formData.append('pin', userData.pin);
            formData.append('villageName', userData.villageName);
            if (image) formData.append('image', image);

            const { data } = await axios.post(`${backendUrl}/api/auth/update-profile`, formData, {
                headers: { Authorization:  `Bearer ${token}`},
            });

            if (data.success) {
                toast.success(data.message);
                await loadUserProfileData();
                setIsEdit(false);
                setImage(null);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };

    return userData && (
        <div className='w-full flex flex-col gap-6 text-sm bg-white  rounded-2xl  p-6 pt-32 max-w-3xl mx-auto'>
            <div className='flex flex-col items-center relative'>
                {isEdit ? (
                    <label htmlFor='image' className='cursor-pointer relative'>
                        <img className='w-36 h-36 rounded-full border-4 border-gray-300 object-cover shadow-md' src={image ? URL.createObjectURL(image) : userData.image || assset.upload} alt='Profile' />
                        <Camera 
                       
                        className='absolute curosr-pointer bottom-2 right-2 bg-white p-1 rounded-full text-gray-700 shadow-md' size={28} />
                        <input onChange={(e) => setImage(e.target.files[0])} type='file' id='image' hidden />
                    </label>
                ) : (
                    <img className='w-36 h-36 rounded-full border-4 border-gray-300 object-cover shadow-md' src={userData.image || assset.upload} alt='Profile' />
                )}
                {isEdit ? (
                    <input className='bg-gray-100 text-xl font-semibold text-center rounded-lg p-2 w-full mt-2' type='text' value={userData.name} onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))} />
                ) : (
                    <p className='font-semibold text-xl text-neutral-800 mt-2 flex items-center gap-2'>
                        {userData.name} <Edit
                         onClick={() => setIsEdit(true)} 
                         size={18} className='text-gray-500 cursor-pointer' />
                    </p>
                )}
            </div>
            
            <hr className='bg-gray-300 h-[1px] border-none' />

            <div>
                <p className='text-gray-500 uppercase text-xs font-semibold'>Contact Information</p>
                <div className='grid grid-cols-2 gap-y-2 mt-2 text-neutral-700'>
                    <p className='font-medium flex items-center gap-2'><Mail size={16} /> Email:</p>
                    <p className='text-blue-500'>{userData.email}</p>
                    <p className='font-medium flex items-center gap-2'><Phone size={16} /> Phone:</p>
                    {isEdit ? (
                        <input className='bg-gray-100 p-2 rounded-lg w-full' type='text' value={userData.mobNumber} onChange={e => setUserData(prev => ({ ...prev, mobNumber: e.target.value }))} />
                    ) : (
                        <p className='text-blue-400'>{userData.mobNumber}</p>
                    )}
                </div>
            </div>
            
            <div>
                <p className='text-gray-500 uppercase text-xs font-semibold'>Location Information</p>
                <div className='grid grid-cols-2 gap-y-2 mt-2 text-neutral-700'>
                    <p className='font-medium flex items-center gap-2'><MapPin size={16} /> State:</p>
                    {isEdit ? (
                        <input className='bg-gray-100 p-2 rounded-lg w-full' type='text' onChange={(e) => setUserData(prev => ({ ...prev, state: e.target.value }))} value={userData.state} />
                    ) : (
                        <p className='text-gray-400'>{userData.state}</p>
                    )}
                    <p className='font-medium flex items-center gap-2'><Map size={16} /> District:</p>
                    {isEdit ? (
                        <input className='bg-gray-100 p-2 rounded-lg w-full' type='text' onChange={(e) => setUserData(prev => ({ ...prev, district: e.target.value }))} value={userData.district} />
                    ) : (
                        <p className='text-gray-400'>{userData.district}</p>
                    )}
                    <p className='font-medium flex items-center gap-2'><Home size={16} /> Village Name:</p>
                    {isEdit ? (
                        <input className='bg-gray-100 p-2 rounded-lg w-full' type='text' onChange={(e) => setUserData(prev => ({ ...prev, villageName: e.target.value }))} value={userData.villageName} />
                    ) : (
                        <p className='text-gray-400'>{userData.villageName}</p>
                    )}
                </div>
            </div>
            
            <div className='mt-6 flex justify-center'>
                {isEdit ? (
                    <button className='bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all' onClick={updateUserProfileData}>Save Information</button>
                ) : (
                    <button className='bg-gray-700 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-all flex items-center gap-2' onClick={() => setIsEdit(true)}>
                        <Edit size={18} /> Edit
                    </button>
                )}
            </div>
        </div>
    );
}

export default Myprofile;
