"use client";

import TableComponent from "@/app/admin/component/table-components/attendance-list-table";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AdminViews = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      const admin = localStorage.getItem("admin");
      if (!admin) {
        router.push("/admin/login");
      } else {
        setIsLoggedIn(true);
      }
      setIsChecking(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [router]);

  if (isChecking)
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500 text-lg">Checking login...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full h-20 bg-linear-to-br from-black to-gray-950 shadow-md flex items-center px-8">
        <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
      </div>

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
