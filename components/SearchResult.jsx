"use client";
import React from "react";

let _intance = null;

function SearchComp({ name, img }) {
    return (
      <div className="mx-auto flex flex-row justify-between rounded h-16 w-56  bg-neutral-800 p-2">
        <div className="flex flex-row gap-4">
          <div className="object-contain">
            <img src="/music.jpg" className="w-12 h-12" alt="" />
          </div>
          <div className="flex flex-col">
            <span className="text-md">{name}</span>
            <span className="text-sm">Autor</span>
          </div>
        </div>
        <div className="flex flex-row items-center h-full ">
          <button className="object-contain w-4 h-4">
            <img src="/play.png" className="w-4 h-4" alt="" />
          </button>
        </div>
      </div>
    );
  }

export default class SearchResult extends React.Component {
  constructor() {
    super();
    if (_intance != null) {
      return _intance;
    }
    this.state={
        active:false,
        result:[[]]
    }
    _intance = this;
  }

  handleSearch=(result,activity)=>
  { 
    this.setState({active:activity,result:result})
    console.log(this.state.result[0])
}



  render() {
    return (
      <div
        className={`grid grid-cols-0  grid-flow-row md:grid-cols-3 lg:grid-cols-4 mx-auto md:w-11/12  gap-2  overflow-y-auto no-scrollbar h-screen`}
      >
        {this.state.active &&
          this.state.result.length > 0 &&
          Object.keys(this.state.result[0]).map((k) => {
            return <SearchComp key={k} name={this.state.result[0][k]["name"]} />;
          })}
      </div>
    );
  }
}
