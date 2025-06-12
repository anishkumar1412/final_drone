import React, { useContext, useState } from 'react';
import { AppContext } from '../Context/AppContext';
import { assset } from '../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Camera, Edit, Mail, Phone, MapPin, Map, Home } from 'lucide-react';
import drone from '../../public/drone5.jpg'


function MyProfile() {
    const { userData, setUserData, token, backendUrl, loadUserProfileData } = useContext(AppContext);
    const [isEdit, setIsEdit] = useState(false);
    const [image, setImage] = useState(null);

    const updateUserProfileData = async () => {
        try {
            const formData = new FormData();
            formData.append('userId', userData.id);
            formData.append('name', userData.name);
            formData.append('mobNumber', userData.mobNumber);
            formData.append('email', userData.email);
            formData.append('state', userData.state);
            formData.append('district', userData.district);
            formData.append('pin', userData.pin);
            formData.append('villageName', userData.villageName);
            if (image) formData.append('image', image);

            const { data } = await axios.post(`${backendUrl}/api/auth/update-profile`, formData, {
                headers: { Authorization: `Bearer ${token}` },
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
        <div className='w-full flex items-center justify-center bg-gray-50 py-24'>
            <div className='flex w-full max-w-4xl bg-white rounded-2xl shadow-lg overflow-hidden'>
                {/* Left Side - User Profile */}
                <div className='w-1/2 flex flex-col gap-4 p-6'>
                    <div className='flex flex-col items-center relative'>
                        {isEdit ? (
                            <label htmlFor='image' className='cursor-pointer relative group'>
                                <img 
                                    className='w-28 h-28 rounded-full border-4 border-gray-300 object-cover shadow-md transition-transform duration-300 group-hover:scale-105' 
                                    src={image ? URL.createObjectURL(image) : userData.image || assset.upload} 
                                    alt='Profile' 
                                />
                                <Camera 
                                    className='absolute cursor-pointer bottom-2 right-2 bg-white p-1 rounded-full text-gray-700 shadow-md transition-all duration-300 hover:bg-gray-100 hover:text-gray-900' 
                                    size={24} 
                                />
                                <input onChange={(e) => setImage(e.target.files[0])} type='file' id='image' hidden />
                            </label>
                        ) : (
                            <img 
                                className='w-28 h-28 rounded-full border-4 border-gray-300 object-cover shadow-md transition-transform duration-300 hover:scale-105' 
                                src={userData.image || assset.upload} 
                                alt='Profile' 
                            />
                        )}
                        {isEdit ? (
                            <input 
                                className='bg-gray-100 text-lg font-semibold text-center rounded-lg p-2 w-full mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500' 
                                type='text' 
                                value={userData.name} 
                                onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))} 
                            />
                        ) : (
                            <p className='font-semibold text-lg text-neutral-800 mt-2 flex items-center gap-2'>
                                {userData.name} 
                                <Edit 
                                    onClick={() => setIsEdit(true)} 
                                    size={16} 
                                    className='text-gray-500 cursor-pointer transition-all duration-300 hover:text-gray-700' 
                                />
                            </p>
                        )}
                    </div>
                    
                    <hr className='bg-gray-300 h-[1px] border-none' />

                    <div>
                        <p className='text-gray-500 uppercase text-xs font-semibold mb-2'>Contact Information</p>
                        <div className='grid grid-cols-2 gap-y-3 mt-2 text-neutral-700'>
                            <p className='font-medium flex items-center gap-2'><Mail size={14} /> Email:</p>
                            <p className='text-blue-500 text-sm'>{userData.email}</p>
                            <p className='font-medium flex items-center gap-2'><Phone size={14} /> Phone:</p>
                            {isEdit ? (
                                <input 
                                    className='bg-gray-100 p-1.5 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm' 
                                    type='text' 
                                    value={userData.mobNumber} 
                                    onChange={e => setUserData(prev => ({ ...prev, mobNumber: e.target.value }))} 
                                />
                            ) : (
                                <p className='text-blue-400 text-sm'>{userData.mobNumber}</p>
                            )}
                        </div>
                    </div>
                    
                    <div>
                        <p className='text-gray-500 uppercase text-xs font-semibold mb-2'>Location Information</p>
                        <div className='grid grid-cols-2 gap-y-3 mt-2 text-neutral-700'>
                            <p className='font-medium flex items-center gap-2'><MapPin size={14} /> State:</p>
                            {isEdit ? (
                                <input 
                                    className='bg-gray-100 p-1.5 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm' 
                                    type='text' 
                                    onChange={(e) => setUserData(prev => ({ ...prev, state: e.target.value }))} 
                                    value={userData.state} 
                                />
                            ) : (
                                <p className='text-gray-400 text-sm'>{userData.state}</p>
                            )}
                            <p className='font-medium flex items-center gap-2'><Map size={14} /> District:</p>
                            {isEdit ? (
                                <input 
                                    className='bg-gray-100 p-1.5 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm' 
                                    type='text' 
                                    onChange={(e) => setUserData(prev => ({ ...prev, district: e.target.value }))} 
                                    value={userData.district} 
                                />
                            ) : (
                                <p className='text-gray-400 text-sm'>{userData.district}</p>
                            )}
                            <p className='font-medium flex items-center gap-2'><Home size={14} /> Village Name:</p>
                            {isEdit ? (
                                <input 
                                    className='bg-gray-100 p-1.5 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm' 
                                    type='text' 
                                    onChange={(e) => setUserData(prev => ({ ...prev, villageName: e.target.value }))} 
                                    value={userData.villageName} 
                                />
                            ) : (
                                <p className='text-gray-400 text-sm'>{userData.villageName}</p>
                            )}
                            <p className='font-medium flex items-center gap-2'><Home size={14} /> Pin:</p>
                            {isEdit ? (
                                <input 
                                    className='bg-gray-100 p-1.5 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm' 
                                    type='text' 
                                    onChange={(e) => setUserData(prev => ({ ...prev, pin: e.target.value }))} 
                                    value={userData.pin} 
                                />
                            ) : (
                                <p className='text-gray-400 text-sm'>{userData.pin}</p>
                            )}
                        </div>
                    </div>
                    
                    <div className='mt-4 flex justify-center'>
                        {isEdit ? (
                            <button 
                                className='bg-blue-600 text-white px-5 py-1.5 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm' 
                                onClick={updateUserProfileData}
                            >
                                Save Information
                            </button>
                        ) : (
                            <button 
                                className='bg-gray-700 text-white px-5 py-1.5 rounded-lg hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 text-sm' 
                                onClick={() => setIsEdit(true)}
                            >
                                <Edit size={14} /> Edit
                            </button>
                        )}
                    </div>
                </div>

                {/* Right Side - Drone Image */}
                <div className='w-1/2'>
                    <img 
                        src={drone} // Replace with your drone image URL
                        alt='Drone' 
                        className='w-full h-full object-cover' 
                        
                    />
                </div>
            </div>
        </div>
    );
}

export default MyProfile;