import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { AdminContext } from "../../context/AdminContext";
import * as Icons from "lucide-react"; // Import all icons dynamically

const roles = [
  { name: "Super Admin", value: "superadmin" },
  { name: "Finance Admin", value: "finance" },
  { name: "Operations Admin", value: "operations" },
  { name: "Support Admin", value: "support" },
];

export default function AddAdmin() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState(roles[0].value);
  const [access, setAccess] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [groupedPermissions, setGroupedPermissions] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const { backendUrl, aToken, permissions: userPermissions, token } = useContext(AdminContext);
  const hasAccess = aToken || userPermissions.includes("Add Admins");
  if (!hasAccess) return null;

  // Fetch permissions from DB
  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/admin/permissions`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPermissions(res.data);

        // Group by category
        const grouped = {};
        res.data.forEach((perm) => {
          if (!grouped[perm.category]) {
            grouped[perm.category] = [];
          }
          grouped[perm.category].push(perm);
        });
        setGroupedPermissions(grouped);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Failed to Load Permissions",
          text: error.response?.data?.message || "Could not fetch permissions.",
        });
      }
    };
    fetchPermissions();
  }, [backendUrl, token]);

  const handleCheckboxChange = (permissionName, isParent, children = []) => {
    let updated = [...access];

    if (updated.includes(permissionName)) {
      updated = updated.filter((item) => item !== permissionName);
      if (isParent) {
        updated = updated.filter((item) => !children.includes(item));
      }
    } else {
      updated.push(permissionName);
      if (isParent) {
        children.forEach((child) => {
          if (!updated.includes(child)) updated.push(child);
        });
      }
    }

    setAccess(updated);
  };

  const handleAddAdmin = async () => {
    if (!name || !email || !password || !confirmPassword || !role) {
      Swal.fire({ icon: "warning", title: "Missing Fields", text: "Please fill all the fields." });
      return;
    }

    if (password !== confirmPassword) {
      Swal.fire({ icon: "error", title: "Password Mismatch", text: "Both password fields must match." });
      return;
    }

    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You are about to add a new admin!",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Add",
      cancelButtonText: "Cancel",
    });

   if (!confirm.isConfirmed) return;

setLoading(true);
setMessage("");
Swal.fire({
  title: "Adding Admin...",
  html: "Please wait while we add the admin.",
  allowOutsideClick: false,
  didOpen: () => {
    Swal.showLoading();
  },
});

try {
  const response = await axios.post(
    `${backendUrl}/api/admin/admins-register`,
    {
      name,
      email,
      password,
      role,
      access: access.length ? access : ["No Permissions"],
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );

  Swal.close(); // Close loader on success/failure

  if (response.status === 201) {
    Swal.fire({ icon: "success", title: "Success!", text: "Admin added successfully!" });
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
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
  Swal.close();
  Swal.fire({
    icon: "error",
    title: "Error!",
    text: error.response?.data?.message || "An error occurred. Please try again.",
  });
} finally {
  setLoading(false);
}
  };

  return (
    <div className="p-6 w-3/4 mx-auto">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Add New Admin</h2>
        {message && <p className="mb-4 text-red-500">{message}</p>}

        <input className="w-full p-2 border rounded-md mb-3" placeholder="Admin Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input className="w-full p-2 border rounded-md mb-3" placeholder="Admin Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <div className="relative mb-3">
          <input
            className="w-full p-2 border rounded-md pr-10"
            placeholder="Admin Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-blue-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        <input
          className="w-full p-2 border rounded-md mb-3"
          placeholder="Confirm Password"
          type={showPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <select className="w-full p-2 border rounded-md mb-3" value={role} onChange={(e) => setRole(e.target.value)}>
          {roles.map((r) => (
            <option key={r.value} value={r.value}>
              {r.name}
            </option>
          ))}
        </select>

        <div className="mb-6">
          <h3 className="font-semibold text-lg mb-3">Assign Access:</h3>
          {Object.keys(groupedPermissions).length === 0 ? (
            <p>Loading permissions...</p>
          ) : (
            Object.entries(groupedPermissions).map(([category, perms]) => (
              <div key={category} className="mb-4">
                <h4 className="font-semibold mb-2 text-gray-700">{category}</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {perms.map((perm) => {
                    const Icon = Icons[perm.icon] || Icons.ShieldCheck;
                    const isParent = perms.some((p) => p.category === perm.name);
                    const children = perms
                      .filter((p) => p.category === perm.name)
                      .map((child) => child.name);

                    return (
                      <div
                        key={perm.name}
                        className={`cursor-pointer p-4 pb-7 rounded-lg shadow-md border flex items-center justify-between gap-2 transition
                        ${access.includes(perm.name)
                            ? isParent
                              ? "bg-red-100 border-red-500"
                              : "bg-blue-100 border-blue-400"
                            : isParent
                              ? "bg-white hover:bg-red-50 border-red-300"
                              : "bg-white hover:bg-gray-100 border"}
                      `}
                        onClick={() => handleCheckboxChange(perm.name, isParent, children)}
                      >
                        <div className="flex items-center gap-2">
                          <Icon className={`w-5 h-5 ${isParent ? "text-red-500" : "text-blue-500"}`} />
                          <span className="font-medium text-sm">{perm.name}</span>
                        </div>
                        <input
                          type="checkbox"
                          className="form-checkbox"
                          checked={access.includes(perm.name)}
                          onChange={() => handleCheckboxChange(perm.name, isParent, children)}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>

        <button className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600" onClick={handleAddAdmin} disabled={loading}>
          {loading ? "Adding..." : "Add Admin"}
        </button>
      </div>
    </div>
  );
}
