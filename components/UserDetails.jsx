"use client";

import React, { useEffect, useState } from "react";
import { GetUserDetails } from "@/lib/utilites";

export default function UserDetails({ toggle, details }) {
  const [data, setData] = useState();
  const [imgSrc,setSrc] = useState(null);

  useEffect(() => {
    const GetUserData = async (uid) => {
      try {
        const _data = await GetUserDetails(uid);
        if(_data.profile_image && _data.profile_image!="None"  )
        {
          setSrc(`data:image/jpeg;base64,${_data.profile_image}`)
        }
        else{
          setSrc('/profile.jpg')
        }
        setData(_data)
      } catch (error) {
        console.log(error);
      }
    };

    const uid = details().userID;
    if (uid) GetUserData(uid);
  }, [details]);

  return (
    <div className="flex justify-center flex-col w-64 gap-2 bg-neutral-800  rounded-lg shadow-[0_0_30px_7px_rgba(_38,_38,_38,_0.7)] ">
      {data && (
        <>
          <div className="object-contain w-full rounded-lg">
            <img src={imgSrc} alt="" className="rounded-lg w-full" />
          </div>
          <div className="flex flex-col  gap-4 justify-center text-center rounded-lg  bg-neutral-800 ">
            <span className="p-2">{data.username}</span>
            <span className="p-2">{data.email}</span>
            <span className="p-2">{data.dob?data.dob:"Not Set"}</span>
          </div>
          <button className="p-2 bg-red-700 rounded-md" onClick={toggle}>
            Edit
          </button>
        </>
      )}
    </div>
  );
}
