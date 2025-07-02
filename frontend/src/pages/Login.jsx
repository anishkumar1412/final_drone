import React, { useContext, useState } from 'react'
import drone from '../assets/login_drone.png'
import axios from "axios";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../Context/AppContext';
import Swal from 'sweetalert2';



function Login() {
  const { backendUrl } = useContext(AppContext)


  const navigate = useNavigate()



  const { setUser, user } = useContext(AppContext)

  const [isRegistering, setIsRegistering] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    mobNumber: "",
    email: "",
    state: "",
    district: "",
    pin: "",
    villageName: "",
    password: "",
    confirmPassword: "", // ✅ NEW
    role: "",
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };



 const handleSubmit = async (e) => {
  e.preventDefault();

  const endpoint = isRegistering
    ? `${backendUrl}/api/auth/register`
    : `${backendUrl}/api/auth/login`;

  // Email regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Mobile number regex (10 digits)
  const mobileRegex = /^[0-9]{10}$/;

  try {
    if (isRegistering) {
      if (!emailRegex.test(formData.email)) {
        Swal.fire({
          icon: 'error',
          title: 'Invalid Email',
          text: 'Please enter a valid email address.',
        });
        return;
      }

      if (!mobileRegex.test(formData.mobNumber)) {
        Swal.fire({
          icon: 'error',
          title: 'Invalid Mobile Number',
          text: 'Mobile number must be exactly 10 digits.',
        });
        return;
      }

      if (formData.pin.length !== 6) {
        Swal.fire({
          icon: 'error',
          title: 'Invalid Pin Code',
          text: 'PIN must be exactly 6 digits.',
        });
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        Swal.fire({
          icon: 'error',
          title: 'Password Mismatch',
          text: 'Password and Confirm Password must match.',
        });
        return;
      }
    }

    const response = await axios.post(endpoint, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      setUser(response.data.user);

      toast.success(isRegistering ? "Registration successful" : "Login successful");

      navigate('/');
      window.location.reload();
    } else {
      toast.error(response.data.msg);
    }

  } catch (error) {
    console.error("Error:", error.response?.data?.msg || error.message);
    toast.error(error.response?.data?.msg || error.message);
  }
};



  const toggleForm = () => {
    setIsRegistering(!isRegistering);
  };






  return (
    <div className="flex flex-col md:flex-row md:px-10 sm:px-10 py-24 max-w-4xl mx-auto"  >
      <div className="flex-1 md:w-1/2 p-4 bg-teal-500 text-white rounded-l-lg flex flex-col justify-center items-center">
        <img src={drone} alt="Drone" className="w-44 h-20 mb-4" />
        <h2 className="text-3xl font-semibold">Book Your Drone</h2>
      </div>
      <div className="flex-1 md:w-1/2 p-8 bg-white rounded-r-lg shadow-md">
        <h2 className="text-3xl font-semibold text-teal-500 mb-6">
          {isRegistering ? "Farmer Registration" : "Login"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4 mb-4">
            {isRegistering && (
              <>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="p-2 border border-gray-300 rounded-md"
                />
                <input
                  type="number"
                  name="mobNumber"
                  placeholder="Enter Mob Number"
                  value={formData.mobNumber}
                  onChange={handleChange}
                  className="p-2 border border-gray-300 rounded-md"
                />
              </>
            )}
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md"
            />
            {isRegistering && (
              <>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="p-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select role</option>
                  <option value="normar">Normal User</option>
                  <option value="Farmer">Farmer</option>
                  <option value="Drone owner">Drone owner </option>
                  <option value="Pilot">Pilot</option>
                  <option value="Co Pilot">Co Pilot</option>

                </select>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="p-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select State</option>
                  <option value="Odisha">Odisha</option>
                </select>
                <select
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  className="p-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select District</option>
                  {/* Add options dynamically */}
                  <option value="Khorda">Khorda</option>
                </select>

                <input
                  type="text"
                  name="pin"
                  placeholder="Enter Pin"
                  value={formData.pin}
                  onChange={handleChange}
                  className="p-2 border border-gray-300 rounded-md"
                />
                <input
                  type="text"
                  name="villageName"
                  placeholder="Enter Village Name"
                  value={formData.villageName}
                  onChange={handleChange}
                  className="p-2 border border-gray-300 rounded-md"
                />
           
            
              </>
            )}
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md"
            />

            {isRegistering && (
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded-md"
              />

            )}


          </div>
          <button
            type="submit"
            className="w-full bg-teal-500 text-white py-2 rounded-md hover:bg-teal-600 transition"
          >
            {isRegistering ? "Register" : "Login"}
          </button>
        </form>
        <div className="mt-4 text-center">
          <span
            onClick={toggleForm}
            className="text-teal-500 cursor-pointer hover:underline"
          >
            {isRegistering
              ? "I have already an account"
              : "Create a new account"}
          </span>
        </div>
      </div>
    </div>
  )
}

export default Login
