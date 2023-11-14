"use client";
import React from "react";
import { useState, useEffect } from "react";
import { GetUserDetails, BlobToBase64, HandleFileChange } from "@/lib/utilites";
import Loading from "./Loading";

export default function EditUserDetails({ toggle, details }) {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [dob, setDob] = useState("");
  const [profile, setProfile] = useState();
  const [profileName, setProfileName] = useState();

  useEffect(() => {
    const GetUserData = async (uid) => {
      try {
        const _data = await GetUserDetails(uid);
        setData(_data);
        setUsername(_data.username);
        setEmail(_data.email);
        setDob(_data.dob);
      } catch (error) {
        console.log(error);
      }
    };

    const uid = details().userID;
    if (uid) GetUserData(uid);
  }, [details]);

  const handleFileChange = async (event) => {
    setLoading(true);

    const res = await HandleFileChange(event);

    if (res) {
      setProfile(res);
      setProfileName(event.target.files[0].name);
    }

    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email == "" || username == "" || dob == "") return;

    const profile = await BlobToBase64(podcastBlob);

    try {
    } catch (error) {
      console.log(error);
    }

    toggle();
  };




  return (
    <form className=" w-80 flex justify-center flex-col  p-4  gap-4 bg-[rgba(0,_112,_184,_0.7)] rounded-lg shadow-[0_0_20px_10px_rgba(0,_112,_184,_0.7)]">
      {data && (
        <>
          <div className="flex flex-col  gap-4 justify-center text-center rounded-lg text-black  ">
            <input
              className="p-2 rounded"
              defaultValue={data.username}
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="email"
              className="p-2 rounded"
              defaultValue={data.email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="date"
              className="p-2 rounded-sm"
              defaultValue={data.dob}
              placeholder="DD-MM-YYYY"
              onChange={(e) => setDob(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2 items-center justify-center w-full">
            <div>
              <span>Profile</span>
            </div>
            <label className="flex flex-col items-center justify-center w-full h-54 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  PNG, JPG
                </p>
              </div>
              <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} />
            </label>
            {profileName && (
            <div className="mt-2  text-white">{profileName}</div>
          )}
          </div>
          {loading ? (
            <div className="flex justify-center w-full">
              <Loading />
            </div>
          ) : (
            <button
              className="p-2 bg-red-700 rounded-md"
              onClick={handleSubmit}
            >
              Submit
            </button>
          )}
        </>
      )}
    </form>
  );
}
