import React from "react";

const Annoucement = ({ children, isError }) => {
  return (
    <div
      className={`w-full px-5 py-3 ${isError ? "bg-red-300" : "bg-green-300"}`}
    >
      <h1
        className={`${
          isError ? "text-red-600" : "text-green-600"
        } text-xl rounded-lg`}
      >
        {children}
      </h1>
    </div>
  );
};

export default Annoucement;
