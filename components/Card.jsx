"use client";
import React from "react";

export default class Card extends React.Component {
  render() {
    return (
      <div className="flex flex-col bg-yellow-600  rounded-lg bg-[url('/music.jpg')] bg-no-repeat bg-cover w-32  h-32 mx-auto">
        <div className="flex flex-row-reverse mx-2">
          <img src="/info.png" alt="" className=" w-6 h-6" />
        </div>
        <div className="text-center my-auto">Music Name</div>
      </div>
    );
  }
}
