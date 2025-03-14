import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { assets } from '../../assets/assets_admin/assets'


function Copilot() {

    const {allUsers,deleteUser} = useContext(AdminContext)

  return (
    <div className='w-full max-w-6xl m-5'>
    <p className='mb-3 text-lg font-medium'>All Co Pilots</p>

    <div className='bg-white border rounded text-sm min-h-[60vh] max-h-[80vh] overflow-y-scroll' >
      <div className='hidden sm:grid grid-cols-[0.5fr_2fr_3fr_3fr_2fr_1fr_1fr] grid-flow-col py-3 border-b' >
        <p>#</p>
        <p>Name</p>
        <p>Email</p>
        <p>Mobile</p>
        <p>State</p>
        <p>District</p>
        <p>Remove</p>
      </div>

      {
        allUsers.filter(user => user.role === "Co Pilot").map((item,i)=>(
           <div className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_2fr_3fr_3fr_2fr_1fr_1fr] items-center text-gray-500  py-3 px-6 border-b hover:bg-gray-50' key={i} >
             <p className='max-sm:hidden'>{i+1}</p>
             {/* <div className='flex items-center gap-2'>
               <img className='w-20 rounded-md' src={item.droneImg} alt="" /> <p>Drone A</p>
             </div> */}
             <p className='max-sm:hidden'>{item.name}</p>
             <p>{item.email}</p>
             <div className='flex items-center gap-2'>
               {/* <img className='w-8 rounded-full bg-gray-200' src={item.user.} alt="" />  */}
               <p>{item.mobNumber}</p>
             </div>
             <p>{item.state}</p>
             
             <p>{item.district}</p>
             <p><img onClick={()=>deleteUser(item._id)} className='cursor-pointer' src={assets.cancel_icon} alt="" /></p>

           </div>
        ))
      }
    </div>
  </div>
  )
}

export default Copilot
