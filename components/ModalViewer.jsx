"use client";
import React from "react";

export default function Modal({ isOpen, onClose, data, children }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-gray-900 bg-opacity-50 absolute inset-0"></div>
      <div className="bg-gray-800 text-white p-6 rounded-lg max-w-3xl z-10 relative">
        {children}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="text-blue-500 hover:underline cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
