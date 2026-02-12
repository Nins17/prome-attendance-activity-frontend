'use client'

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";



export default function UpdatePage(){
    const[fullname,setFullname]=useState("");
    const[schedule,setSchedule]=useState("");
    const { id } = useParams();

    useEffect(() => {
    fetch(`http://localhost:3000/attendance/${id}`)
    .then(res => res.json())
    .then(data => {
      setFullname(data.fullname);
      setSchedule(data.schedule);
    });
    }, [id]);

      const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        await fetch(`http://localhost:3000/attendance/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullname, schedule }),
        });

        alert("Updated successfully");
        window.location.href="../attendance-list";
    };

    return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center py-32 px-16 bg-white dark:bg-black ">
        <div className="flex text-center lg:items-center lg:justify-center">
          <form onSubmit={handleUpdate}>
            <div className="flex flex-col items-start">
              <label htmlFor="fullname" className="text-black py-2 px-3"> Full Name: </label>
              <input type="text" id="fullname" name="fullname" placeholder="e.g Juan Dela Cruz" value={fullname} onChange={(e)=>{setFullname(e.target.value)}}
              className="border-2 p-2 rounded-2xl"/>
            </div>

            <div className="flex flex-col items-start">
              <label htmlFor="schedule" className="text-black py-2 px-3"> Select Schedule: </label>
              <div className="flex px-5"><input type="radio" id="schedule" checked={schedule === "day1"} name="schedule" value="day1" onChange={(e)=>{setSchedule(e.target.value)}} className="border-2 p-2 rounded-2xl mr-3"/> <p>Day 1</p></div>
              <div className="flex px-5"><input type="radio" id="schedule" checked={schedule === "day2"} name="schedule" value="day2" onChange={(e)=>{setSchedule(e.target.value)}} className="border-2 p-2 rounded-2xl mr-3"/> <p>Day 2</p></div>
            </div>

            <button type="submit"  className=" px-5 rounded-2xl mt-5 bg-blue-400"> Update </button>
          </form>
        </div>
      </main>
    </div>
  );
}