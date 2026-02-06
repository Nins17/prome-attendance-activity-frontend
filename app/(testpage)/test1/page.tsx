'use client'

import { useEffect, useState } from "react"

export default function Tes1(){
    const[backendMessage, setbackendMessage] = useState(' ');

    useEffect(()=>{
        fetch('http://localhost:3000/healthcheck')
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