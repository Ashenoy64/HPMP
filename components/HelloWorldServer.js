import React from "react";



async function getData()
{
    const response =  await fetch("http://localhost:3000/api")

    const message = await response.json()

    return message.message
}



const  HelloWorldServer = async () => {
    

    const message = await getData()
    
    return (
        <div>
           {message}
        </div>
    )
}
export default HelloWorldServer;