'use client'
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useRouter } from "next/navigation";
import { useEffect,useState } from "react"

type Attendance = {
    id:number,
    fullname:string,
    schedule:string
}

export default function TableComponent(){
    const[attendance, setAttendance] = useState<Attendance[]>([]);
    const[isLoading,setIsLoading] = useState(true);
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
        if (isLoading) return <p>Loading attendance data...</p>;

        return (
            <div className="min-w-screen flex items-center justify-center p-6 bg-gray-50">
                <div className="space-y-3">
                    <div className="text-lg font-semibold">
                        List of Registered Attendees
                    </div>

                    <Table className="w-full border border-gray-300 border-collapse">
                        <TableHeader>
                        <TableRow className="border-b bg-gray-100">
                            <TableHead className="px-4 py-2">Id</TableHead>
                            <TableHead className="px-4 py-2">Fullname</TableHead>
                            <TableHead className="px-4 py-2">Schedule Picked</TableHead>
                            <TableHead className="px-4 py-2">Action</TableHead>
                        </TableRow>
                        </TableHeader>

                        <TableBody>
                          {attendance.map((data)=>(  
                            <TableRow key={data.id} className="border-b last:border-b-0">
                                    <TableCell  className="px-4 py-2 text-center">{data.id}</TableCell>
                                    <TableCell  className="px-4 py-2 text-center">{data.fullname}</TableCell>
                                    <TableCell className="px-4 py-2 text-center">{data.schedule}</TableCell>
                                    <TableCell className="px-4 py-2 text-center"><Button onClick={()=>router.push(`../update/${data.id}`)}>Update</Button></TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        )
}