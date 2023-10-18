"use client";
import React from "react";
import { useRef, useState } from "react";
import { UserAuth } from "../lib/AuthContext";
import { auth } from "@/lib/firebase";
import { sendSignInLinkToEmail } from "firebase/auth";
export default function landing() {
  const [email, setEmail] = useState("");
  const [notice, setNotice] = useState("");
  const actionCodeSettings = {
    url: "http://localhost:3000/confirm",
    handleCodeInApp: true,
  };

  const { user } = UserAuth();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event.target.email.value);
    sendSignInLinkToEmail(auth, email, actionCodeSettings)
      .then(() => {
        setNotice(
          "An email was sent to your email address. Click the link in the email to login."
        );
      })
      .catch((error) => {
        console.log(error);
        setNotice(
          "An error occurred when sending a login link to your email address: ",
          error.name
        );
      });
  };

  return (
    <div>
      <div>{notice}</div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="email"
          className="text-black"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
