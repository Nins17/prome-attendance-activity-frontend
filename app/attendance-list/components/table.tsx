'use client'

import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption
} from "@/components/ui/table"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

type Attendance = {
    id:number,
    fullname:string,
    schedule:string
}

export default function TableComponent(){
    const [attendance, setAttendance] = useState<Attendance[]>([]);
    const [isLoading,setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(()=>{
        fetch("http://localhost:3000/attendance")
        .then(res=>res.json())
        .then(data=>{
            setAttendance(data);
            setIsLoading(false);
        })
        .catch(err => {
            console.error(err);
            setIsLoading(false);
        });
    }, []);

    if (isLoading) return (
        <div className="flex items-center justify-center h-64">
            <p className="text-gray-500 text-lg">Loading attendance data...</p>
        </div>
    );

    return (
        <div className="min-h-screen flex flex-col items-center justify-start p-6 bg-gray-50">
            <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg p-6 space-y-4">
                
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-gray-800">Registered Attendees</h1>
                    {/* <Button onClick={()=>router.push("/attendance/add")} className="bg-blue-600 hover:bg-blue-700 text-white">
                        Add Attendee
                    </Button> */}
                </div>

                <div className="overflow-x-auto">
                    <Table className="w-full min-w-[600px] border border-gray-200">
                        <TableCaption className="text-left text-gray-500 font-medium">
                            List of all attendees and schedules
                        </TableCaption>

                        <TableHeader>
                            <TableRow className="bg-gray-100 text-gray-700 uppercase text-sm">
                                <TableHead className="px-4 py-3 text-center">ID</TableHead>
                                <TableHead className="px-4 py-3 text-left">Fullname</TableHead>
                                <TableHead className="px-4 py-3 text-center">Schedule Picked</TableHead>
                                <TableHead className="px-4 py-3 text-center">Action</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {attendance.map((data) => (
                                <TableRow key={data.id} className="hover:bg-gray-50 transition-colors">
                                    <TableCell className="px-4 py-3 text-center text-gray-700">{data.id}</TableCell>
                                    <TableCell className="px-4 py-3 text-gray-700">{data.fullname}</TableCell>
                                    <TableCell className="px-4 py-3 text-center text-gray-700">{data.schedule}</TableCell>
                                    <TableCell className="px-4 py-3 text-center">
                                        <Button 
                                            onClick={() => router.push(`../update/${data.id}`)} 
                                            className="bg-green-600 hover:bg-green-700 text-white"
                                        >
                                            Update
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    )
}
