'use client'

import { useEffect, useState } from "react"


export default function Tes1(){
    const[backendMessage, setbackendMessage] = useState(' ');

    useEffect(()=>{
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/healthcheck`)
        .then(res=>res.json())
        .then(data=>setbackendMessage(data.backend))
        .catch(() => setbackendMessage("Connection Failed"))

    },[])



    return(
        <div>
            {backendMessage}
        </div>
    )
}