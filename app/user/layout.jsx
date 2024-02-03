"use client";
import SideBar from "@/components/SideBar";
import { useState, useEffect, createContext, useContext } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";
import { SessionRetrive, ValidateUser } from "@/lib/utilites";
const UserContext = createContext();

export default function Layout({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(" ");
  const [userID, setUserID] = useState("");
  const [token, setToken] = useState("");
  const [notice, setNotice] = useState("");
  const [noticeActive, setNoticeActive] = useState(false);

  useEffect(() => {
    const token = SessionRetrive("accessToken");
    if (!token) {
      return router.push("/login");
    }

    const AuthenticateUser = async () => {
      try {
        const response = await ValidateUser(token);

        if (response.status == "ok") {
          Notify("Welcome " + response.data.email);
          setUser(response.data);
          setToken(token);
          setUserID(SessionRetrive("userid"));
        } else {
          Notify("Something went wrong");
          router.push("/login");
        }
      } catch (error) {
        Notify("Something went wrong");
        router.push("/login");
      }
    };

    AuthenticateUser();
  }, []);

  const GetUserDetails = () => {
    return {
      userID,
      user,
      token,
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
  } else {
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <Loading />
      </div>
    );
  }
}

export function useUser() {
  return useContext(UserContext);
}
