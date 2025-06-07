import { useContext, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { AdminContext } from "../../context/AdminContext";
import {
  ShieldCheck,
  DollarSign,
  CalendarCheck2,
  RefreshCw,
  CheckCircle2,
  XCircle,
  Ban,
  Star,
  ClipboardCheck,
  Clock,
  AlarmClock,
  Loader2,
  Clock4,
  Filter,
  Hourglass,
  Pause,
  Users,
  CreditCard,
  XOctagon,
  Timer,
  Check,
  Activity,
  Settings,
  UserCircle,
  Ticket
} from "lucide-react";

const roles = [
  { name: "Super Admin", value: "superadmin" },
  { name: "Finance Admin", value: "finance" },
  { name: "Operations Admin", value: "operations" },
  { name: "Support Admin", value: "support" },
];

const parentPermissions = {
  "Master": ["Add Drone", "Add Crop", "Add Working Days"],
  "Users": [
    "Add Admins", "View Admins", "View Farmers",
    "View Pilots", "View Copilots", "View Drone's Owner"
  ],
  "Tickets": ["Total Refund Orders", "Reviews","View  Enquiry","View Complain","View Other"],
  "Dashboard":["Dashboard",
  "Master",
  "Users",
  "Tickets",
  "Total Drones",
  "Total Bookings",
  "Order Completed",
  "Total Refund Orders",
  "Approved Refunds",
  "Declined Refunds",
  "Total User Cancel Orders",
  "Reviews",
  "Today's Workings Orders",
  "Upcoming Bookings",
  "Today's Orders in Progress",
  "Today's Pending Orders",
  "Today's Bookings",
  "Filter Details",
  "Waiting for Confirmation",
  "Work on Hold",
  "UnAssigned Orders",
  "Successfull Payments",
  "Unsuccessfull Payments",
  "Pending Payments",
  "Add Drone",
  "Add Crop",
  "Add Working Days",
  "Add Admins",
  "View Admins",
  "View Farmers",
  "View Pilots",
  "View Copilots",
  "View Drone's Owner",
  "View Tickets",
  "View Other",
  "View Complain",
  "View  Enquiry","Partial Payments"]
};

const allPermissions = [
  "Dashboard",
  "Master",
  "Users",
  "Tickets",
  "Total Drones",
  "Total Bookings",
  "Order Completed",
  "Total Refund Orders",
  "Approved Refunds",
  "Declined Refunds",
  "Total User Cancel Orders",
  "Reviews",
  "Today's Workings Orders",
  "Upcoming Bookings",
  "Today's Orders in Progress",
  "Today's Pending Orders",
  "Today's Bookings",
  "Filter Details",
  "Waiting for Confirmation",
  "Work on Hold",
  "UnAssigned Orders",
  "Successfull Payments",
  "Unsuccessfull Payments",
  "Pending Payments",
  "Partial Payments",
  "Add Drone",
  "Add Crop",
  "Add Working Days",
  "Add Admins",
  "View Admins",
  "View Farmers",
  "View Pilots",
  "View Copilots",
  "View Drone's Owner",
  "View Tickets",
  "View Other",
  "View Complain",
  "View  Enquiry"
];

const permissionIcons = {
  "Master": Settings,
  "Users": UserCircle,
  "Tickets": Ticket,
  "Total Drones": Activity,
  "Total Bookings": ClipboardCheck,
  "Order Completed": CheckCircle2,
  "Total Refund Orders": RefreshCw,
  "Approved Refunds": Check,
  "Declined Refunds": XCircle,
  "Total User Cancel Orders": Ban,
  "Reviews": Star,
  "Today's Workings Orders": Loader2,
  "Upcoming Bookings": CalendarCheck2,
  "Today's Orders in Progress": Clock,
  "Today's Pending Orders": Clock4,
  "Today's Bookings": AlarmClock,
  "Filter Details": Filter,
  "Waiting for Confirmation": Hourglass,
  "Work on Hold": Pause,
  "UnAssigned Orders": Users,
  "Successfull Payments": CreditCard,
  "Unsuccessfull Payments": XOctagon,
  "Pending Payments": Timer,
  "Add Drone": ShieldCheck,
  "Add Crop": ShieldCheck,
  "Add Working Days": CalendarCheck2,
  "Add Admins": Users,
  "View Admins": Users,
  "View Farmers": Users,
  "View Pilots": Users,
  "View Copilots": Users,
  "View Drone's Owner": Users,
  "View Tickets": ClipboardCheck,
  "View Other":ClipboardCheck,
  "View Complain":ClipboardCheck,
  "View  Enquiry":ClipboardCheck
};

export default function AddAdmin() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState(roles[0].value);
  const [access, setAccess] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { backendUrl, aToken, permissions: userPermissions,token } = useContext(AdminContext);

  // const token = localStorage.getItem("aToken") || localStorage.getItem("dToken");

  const hasAccess = aToken || userPermissions.includes("Add Admins");
  if (!hasAccess) return null;

  const handleCheckboxChange = (permission) => {
    let updated = [...access];

    if (updated.includes(permission)) {
      updated = updated.filter((item) => item !== permission);

      // If parent is deselected, also remove all children
      if (parentPermissions[permission]) {
        updated = updated.filter((item) => !parentPermissions[permission].includes(item));
      }
    } else {
      updated.push(permission);

      // If parent is selected, also add all children
      if (parentPermissions[permission]) {
        parentPermissions[permission].forEach((child) => {
          if (!updated.includes(child)) updated.push(child);
        });
      }
    }

    setAccess(updated);
  };

  const handleAddAdmin = async () => {
    if (!name || !email || !password || !confirmPassword || !role) {
      Swal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "Please fill all the fields.",
      });
      return;
    }

    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Password Mismatch",
        text: "Both password fields must match.",
      });
      return;
    }

    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You are about to add a new admin!",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Add",
      cancelButtonText: "Cancel"
    });

    if (!confirm.isConfirmed) return;

    setLoading(true);
    setMessage("");

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
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Admin added successfully!",
        });

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

        <div className="mb-6">
          <h3 className="font-semibold text-lg mb-3">Assign Access:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {allPermissions.map((permission) => {
              const Icon = permissionIcons[permission] || ShieldCheck;
              const isParent = parentPermissions.hasOwnProperty(permission);

              return (
                <div
                  key={permission}
                  className={`cursor-pointer p-4 pb-7 rounded-lg shadow-md border flex items-center justify-between gap-2 transition
                    ${access.includes(permission)
                      ? isParent
                        ? "bg-red-100 border-red-500"
                        : "bg-blue-100 border-blue-400"
                      : isParent
                        ? "bg-white hover:bg-red-50 border-red-300"
                        : "bg-white hover:bg-gray-100 border"}
                  `}
                  onClick={() => handleCheckboxChange(permission)}
                >
                  <div className="flex items-center gap-2">
                    <Icon
                      className={`w-5 h-5 ${
                        isParent ? "text-red-500" : "text-blue-500"
                      }`}
                    />
                    <span className="font-medium text-sm">{permission}</span>
                  </div>
                  <input
                    type="checkbox"
                    className="form-checkbox"
                    checked={access.includes(permission)}
                    onChange={() => handleCheckboxChange(permission)}
                  />
                </div>
              );
            })}
          </div>
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
