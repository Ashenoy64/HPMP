"use client";
import React from "react";

export default function Modal({ isOpen, onClose, data }) {

    if (!isOpen) return null;
    return (
        <div className="absolute inset-0 flex items-center justify-center z-50">
          <div className="bg-gray-900 bg-opacity-50 absolute inset-0"></div>
          <div className="bg-gray-800 text-white p-6 rounded-lg max-w-3xl z-10 relative">
            <h2 className="text-2xl font-semibold mb-2">Music / Playlist</h2>
            <p className="text-gray-300 text-sm mb-4">Music Name</p>
            <p className="text-gray-300 text-sm mb-4">Author</p>
            <p className="text-gray-300 text-sm mb-4">Meta Data 1</p>
            <p className="text-gray-300 text-sm mb-4">Meta Data 2</p>
            <p className="text-gray-300 text-sm mb-4">Meta Data 3</p>
            <p className="text-gray-300 text-sm mb-4">Meta Data 4</p>
            
            <div className="flex justify-end">
              <button onClick={onClose} className="text-blue-500 hover:underline cursor-pointer">
                Close
              </button>
            </div>
          </div>
        </div>
      );
}


// {this.state.isModalOpen && (
//     <ProjectModal
//       isOpen={this.state.isModalOpen}
//       onClose={this.closeModal}
//       project={this.state.selectedProject}
//     />
//   )}

// closeModal = () => {
//     this.setState({
//       isModalOpen: false,
//       selectedProject: null,
//       autoplay: true,
//     });
//   };