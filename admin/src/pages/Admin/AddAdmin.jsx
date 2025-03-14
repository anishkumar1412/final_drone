import { useContext, useState } from "react";
import axios from "axios"; // ✅ Import axios
import Swal from "sweetalert2";
import { AdminContext } from "../../context/AdminContext";


const roles = [
  { name: "Super Admin", value: "superadmin" },
  { name: "Finance Admin", value: "finance" },
  { name: "Operations Admin", value: "operations" },
  { name: "Support Admin", value: "support" },
];

const permissions = [
  "Manage Users",
  "View Reports",
  "Edit Settings",
  "Access Financial Data",
  "Handle Support Tickets",
];

export default function AddAdmin() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(roles[0].value);
  const [access, setAccess] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const {backendUrl} = useContext(AdminContext)

  const handleCheckboxChange = (permission) => {
    setAccess((prev) =>
      prev.includes(permission)
        ? prev.filter((item) => item !== permission)
        : [...prev, permission]
    );
  };

  const handleAddAdmin = async () => {
    if (!name || !email || !password || !role) {
      Swal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "Please fill all the fields.",
      });
      
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post(`${backendUrl}/api/admin/admins-register`, {
        name,
        email,
        password,
        role,
        access: access.length ? access : ["No Permissions"],
      });

      if (response.status == 201) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Admin added successfully!",
        });
  
        setName("");
        setEmail("");
        setPassword("");
        setRole(roles[0].value);
        setAccess([]);
      } else {
        
        Swal.fire({
          icon: "error",
          title: "Failed!",
          text: response.data.message || "Failed to add admin.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error.response?.data?.message || "An error occurred. Please try again.",
      });
    } finally {
      setLoading(false); // ✅ Ensure loading is set to false in all cases
    }
  };

  // ✅ The return statement should be outside handleAddAdmin
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Add New Admin</h2>
        {message && <p className="mb-4 text-red-500">{message}</p>}
        <input
          className="w-full p-2 border rounded-md mb-3"
          placeholder="Admin Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="w-full p-2 border rounded-md mb-3"
          placeholder="Admin Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full p-2 border rounded-md mb-3"
          placeholder="Admin Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <select
          className="w-full p-2 border rounded-md mb-3"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          {roles.map((r) => (
            <option key={r.value} value={r.value}>
              {r.name}
            </option>
          ))}
        </select>
        <div className="mb-3">
          <h3 className="font-semibold">Assign Access:</h3>
          {permissions.map((permission) => (
            <label key={permission} className="block mt-1">
              <input
                type="checkbox"
                className="mr-2"
                checked={access.includes(permission)}
                onChange={() => handleCheckboxChange(permission)}
              />
              {permission}
            </label>
          ))}
        </div>
        <button
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          onClick={handleAddAdmin}
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Admin"}
        </button>
      </div>
    </div>
  );
}
