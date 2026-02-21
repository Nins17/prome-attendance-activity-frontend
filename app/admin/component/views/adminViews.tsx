"use client";

import TableComponent from "@/app/admin/component/table-components/attendance-list-table";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LayoutDashboard, User, Settings, LogOut, ChevronDown } from "lucide-react";

interface AdminData {
  id: number;
  username: string;
  password: string;
}

const AdminViews = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const [adminData, setAdminData] = useState<AdminData | null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const admin = localStorage.getItem("admin");
      if (!admin) {
        router.push("/admin/login");
      } else {
        const parsedAdmin = JSON.parse(admin);
          console.log("Parsed admin data:", parsedAdmin);
          setIsLoggedIn(true);
          setAdminData(parsedAdmin);
      }
      setIsChecking(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [router]);

  const handleSignOut = () => {
    localStorage.removeItem("admin");
    router.push("/admin");
  };

  if (isChecking)
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500 text-lg">Checking login...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with logo and account */}
      <div className="w-full h-20 bg-gradient-to-r from-teal-600 to-teal-500 shadow-md flex items-center justify-between px-8">
        {/* Logo and title */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            <LayoutDashboard className="w-5 h-5 text-teal-600" />
          </div>
          <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
        </div>

        {/* Account dropdown */}
        <div className="relative">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center space-x-3 bg-white/10 hover:bg-white/20 rounded-lg px-3 py-2 transition"
          >
            <div className="w-8 h-8 bg-teal-700 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <span className="text-white text-sm hidden md:block">{adminData?.username || "Admin"}</span>
            <ChevronDown className="w-4 h-4 text-white" />
          </button>

          {/* Dropdown menu */}
          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1">
              <button className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-100">
                <User className="w-4 h-4" />
                <span>Profile</span>
              </button>
              <button className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-100">
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </button>
              <hr className="my-1" />
              <button 
                onClick={handleSignOut}
                className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            Overview of Attendees
          </h2>
          <p className="text-gray-500 mt-1">
            Review and manage all registered attendees.
          </p>
        </div>

        {isLoggedIn && (
          <div className="bg-white rounded-lg shadow-lg p-4">
            <TableComponent />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminViews;