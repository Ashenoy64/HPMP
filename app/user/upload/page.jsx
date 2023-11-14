"use client";

import { useState, useEffect } from "react";
import Loading from "@/components/Loading";
import { HandleFileChange,BlobToBase64 } from "@/lib/utilites";



export default function Upload() {
  const [podcastBlob, setPocastBlob] = useState(null);
  const [coverBlob, setCoverBlob] = useState(null);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [podcastFileName, setPodcastFileName] = useState("");
  const [coverFileName, setCoverFileName] = useState("");

  const handleFileChange = async (event, type) => {
    setLoading(true);

    const res = await HandleFileChange(event);

    if (res) {
      if (type == "podcast") {
        setPocastBlob(res);
        setPodcastFileName(event.target.files[0].name);
      } else {
        setCoverBlob(res);
        setCoverFileName(event.target.files[0].name);
      }
    }

    setLoading(false);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Blob:", podcastBlob);
    console.log("Blob:", coverBlob);
    console.log("Name:", name);

    const podcastBase64 = await BlobToBase64(podcastBlob);
    const coverBase64 = await BlobToBase64(coverBlob);

    try {
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mx-auto sm:w-full md:w-1/2 h-full flex flex-col justify-center items-center ">
      <form className="p-3 flex justify-center flex-col w-1/2  gap-4 bg-[rgba(0,_112,_184,_0.7)] rounded-lg shadow-[0_0_20px_10px_rgba(0,_112,_184,_0.7)]">
        <div className="flex flex-col  gap-4 justify-center text-center rounded-lg text-black  ">
          <input
            className="p-2 rounded"
            defaultValue=""
            placeholder="Name"
            onChange={handleNameChange}
          />
        </div>
        <div className="flex flex-col gap-2 items-center justify-center w-full">
          <div>Podcast</div>
          <label className="flex flex-col gap-2 items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
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
              <p className="text-xs text-gray-500 dark:text-gray-400">MP4</p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              onChange={(e) => handleFileChange(e, "podcast")}
            />
          </label>
          {podcastFileName && (
            <div className="mt-2  text-white">{podcastFileName}</div>
          )}
        </div>

        <div className="flex flex-col gap-2 items-center justify-center w-full">
          <div>
            <span>Cover</span>
          </div>
          <label className="flex flex-col gap-2 items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
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
                JPG/PNG
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              onChange={(e) => handleFileChange(e, "cover")}
            />
          </label>
          {coverFileName && (
            <div className="mt-2  text-white">{coverFileName}</div>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center w-full">          <Loading /> </div>

        ) : (
          <button className="p-2 bg-red-700 rounded-md" onClick={handleSubmit}>
            Upload
          </button>
        )}
      </form>
    </div>
  );
}
