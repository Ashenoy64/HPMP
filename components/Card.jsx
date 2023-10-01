"use client";
import React from "react";

export default class Card extends React.Component {
  constructor(props)
  {
    super(props)
  }
  render() {
    return (
      <div className="flex flex-col  bg-neutral-800  rounded-lg w-40 h-56 transition-shadow hover:shadow-white hover:shadow-sm "  onClick={this.props.onClick}>
        <div className="w-32 h-32 object-contain m-auto">
            <img src="/music.jpg" alt="" className="w-32 h-32" />
        </div>
        <div className="w-32 m-auto over">
            <p className="font-semibold">Music Name</p>
            <p className="text-xs">Author Name</p>
        </div>
        
      </div>
    );
  }
}
