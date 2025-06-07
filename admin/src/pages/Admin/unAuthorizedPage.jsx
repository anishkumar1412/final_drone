import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 flex flex-col items-center text-center max-w-md">
        <AlertTriangle className="text-red-500 w-16 h-16" />
        <h1 className="text-2xl font-bold text-gray-800 mt-4">Access Denied</h1>
        <p className="text-gray-600 mt-2">
          You do not have permission to view this page. Please contact the administrator if you think this is a mistake.
        </p>
        <Link to="/" className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition">
          Go to Home
        </Link>
      </div>
    </div>
  );
}
