import React, { useContext, useState } from 'react'
import {assets} from '../assets/assets_admin/assets.js'
import { AdminContext } from '../context/AdminContext.jsx'
import axios from 'axios'
import { toast } from 'react-toastify'
import { DoctorContext } from '../context/DoctorContext.jsx'


function Login() {

    const [state,setState] = useState('Super Admin')
    const [email,setEmail]=useState('')
    const [password,setPassword] = useState('')

    const {setAToken}=useContext(AdminContext)
    const {setDToken} = useContext(DoctorContext)

    const backendUrl = useContext(AdminContext)

    const onSubmitHandler = async(event)=>{
      event.preventDefault()

      try {
        if(state==='Super Admin'){
           const {data} = await axios.post(backendUrl+'/api/admin/login',{email,password})
           console.log(data.message)
           if(data.success){
            localStorage.setItem('aToken',data.token)
            setAToken(data.token)
           }else{
            toast.error(data.message)
           }
        }else {

          const {data}= await axios.post(backendUrl+'/api/admin/admins-login',{email,password})
          if(data.success){
            console.log("admin successfully login")
           localStorage.setItem('dToken',data.token)
           setDToken(data.token)
           console.log(data.token)
          }else{
           toast.error(data.message)
          }
          
        }
      } catch (error) {
        toast.error(error)
      }
     
    }

  return (
    <div>
      <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center' >
        <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg ' >
            <p className='text-2xl font-semibold m-auto ' ><span className='text-primary'>{state} </span>Login</p>
            <div className='w-full'>
                <p>Email</p>
                <input onChange={(e)=>setEmail(e.target.value)} value={email} className='border border-[#DADADA] rounded w-full p-2 mt-1 ' type="email" required />
            </div>
            <div className='w-full'>
                <p>Password</p>
                <input  onChange={(e)=>setPassword(e.target.value)} value={password} className='border border-[#DADADA] rounded w-full p-2 mt-1 ' type="password" required />
            </div>
            <button className='bg-primary text-white w-full py-2 rounded-md text-base' >Login</button>
            {state==='Super Admin'
            ? <p>Admins Login? <span className='text-primary underline cursor-pointer' onClick={()=>setState('Admins')} >Click here</span> </p>
            :<p>Super Admin Login? <span className='text-primary underline cursor-pointer' onClick={()=>setState('Super Admin')}  >Click here</span></p>
            }
        </div>
      </form>
    </div>
  )
}

export default Login
