import TableComponent from "@/app/attendance-list/components/table";

const AdminViews = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      
      <div className="w-full h-20 bg-gradient-to-r from-teal-600 to-teal-500 shadow-md flex items-center px-8">
        <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
      </div>

      <div className="max-w-6xl mx-auto p-6 space-y-6">
        
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Overview of Attendees</h2>
          <p className="text-gray-500 mt-1">
            Review and manage all registered attendees.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-4">
          <TableComponent />
        </div>
      </div>
    </div>
  );
};

export default AdminViews;
