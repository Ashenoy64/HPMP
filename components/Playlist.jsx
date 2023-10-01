"use client";
import React,{useState} from "react";
import Card from "./Card";
import Modal from "./ModalViewer";



export default function Playlist() {
  const [isModalOpen, setModal] = useState(false);


  function handleModalOpen() {
    setModal(true);
  }

 
  function handleModalClose() {
    setModal(false);
  }

  return (
    <div className="flex flex-col justify-center">
      <div className="flex flex-col p-4">
        <span className="font-bold text-lg">Playlist</span>
      </div>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={handleModalClose} data={'This is a data'} />
      )}
      <div className="grid grid-flow-col justify-start w-full md:mx-8 gap-4 rounded-lg h-64 no-scrollbar overflow-x-auto">
        {/* Use onClick to open the modal */}
        <Card onClick={handleModalOpen} />
        <Card onClick={handleModalOpen} />
        <Card onClick={handleModalOpen} />
        <Card onClick={handleModalOpen} />
      </div>
    </div>
  );
}
