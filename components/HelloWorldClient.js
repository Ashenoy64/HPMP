'use client'

import {useEffect, useState} from 'react'


export default function HelloWorldClient()
{
    const [message,setMessage] = useState("");
    useEffect(()=>{
        fetch('http://localhost:3000/api/').then(response=>response.json()).then(json=>setMessage(json.message)).catch(err=>setMessage("Error!"));
    })
    return(
        <div>
            {message}
        </div>
    )
}