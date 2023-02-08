import React from "react";

const Button = ({ onClick, type, children }) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className="bg-primary-400 text-lg px-5 py-2 rounded-lg text-white font-semibold max-w-[240px]"
    >
      {children}
    </button>
  );
};

export default Button;
