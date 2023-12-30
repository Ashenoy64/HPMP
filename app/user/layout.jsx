"use client";
import SideBar from "@/components/SideBar";
import { useState, useEffect, createContext, useContext } from "react";
import { GetLocal } from "@/lib/utilites";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";
const UserContext = createContext();

export default function Layout({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [userID, setUserID] = useState(null);
  const [notice, setNotice] = useState("");
  const [noticeActive, setNoticeActive] = useState(false);

  
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const id = GetLocal(user.email);
        setUserID(id);
        setUser(user);
      } else {
        router.push("/");
      }
    });
  }, []);

  const GetUserDetails = () => {
    return {
      userID,
      user,
    };
  };

  const Notify = (notice) => {
    setNotice(notice);
    setNoticeActive(true);

    setTimeout(() => {
      setNoticeActive(false);
    }, 3000);
  };

  if (user) {
    return (
      <UserContext.Provider value={{ GetUserDetails, Notify }}>
        <div
          className={`absolute top-0 p-2 bg-neutral-900 border-2 text-white  left-0 rounded z-10  ${
            noticeActive ? "block" : "hidden"
          } `}
        >
          {notice}
        </div>

        <div className="flex flex-col h-auto sm:h-screen w-full">
          <SideBar />
          <div className="p-2 w-full">{children}</div>
        </div>
      </UserContext.Provider>
    );
  }
  else{
    return(
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <Loading/>
      </div>
    )
  }
}

export function useUser() {
  return useContext(UserContext);
}
