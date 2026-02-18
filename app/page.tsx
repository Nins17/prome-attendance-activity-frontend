'use client';

import { useState } from "react";

export default function Home() {
  const [fullname, setFullname] = useState("");
  const [schedule, setSchedule] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmitSched = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic validation
    if (!fullname.trim() || !schedule) {
      setMessage("⚠️ Please fill out all fields.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:3000/attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullname, schedule }),
      });

      if (!res.ok) throw new Error("Failed to submit");

      setFullname("");
      setSchedule("");

      setMessage("  Attendance submitted successfully!");
    } catch (err) {
      console.error(err);
      setMessage("Error submitting attendance.");
    }

    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 font-sans">
      <main className="w-full max-w-lg bg-white p-10 shadow-xl rounded-xl">
        
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Attendance Registration
        </h1>

        {message && (
          <div
            className={`mb-4 p-3 rounded-lg text-center font-medium ${
              message.startsWith("❌")
                ? "bg-red-100 text-red-700"
                : message.startsWith("⚠️")
                ? "bg-yellow-100 text-yellow-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmitSched} className="space-y-4">

          {/* Full Name */}
          <div className="flex flex-col">
            <label htmlFor="fullname" className="text-gray-700 font-medium">
              Full Name
            </label>
            <input
              type="text"
              id="fullname"
              placeholder="e.g. Juan Dela Cruz"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              className="border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          {/* Schedule */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-2">
              Select Schedule
            </label>

            <label className="flex items-center mb-2">
              <input
                type="radio"
                name="schedule"
                value="Day1"
                checked={schedule === "Day1"}
                onChange={(e) => setSchedule(e.target.value)}
                className="mr-2"
              />
              Day 1
            </label>

            <label className="flex items-center">
              <input
                type="radio"
                name="schedule"
                value="Day2"
                checked={schedule === "Day2"}
                onChange={(e) => setSchedule(e.target.value)}
                className="mr-2"
              />
              Day 2
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 mt-4 rounded-lg text-white font-semibold transition ${
              loading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {loading ? "Submitting..." : "Submit Attendance"}
          </button>
        </form>
      </main>
    </div>
  );
}
