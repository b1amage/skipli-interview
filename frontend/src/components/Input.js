import React from "react";

const Input = ({ id, placeholder, label, onChange, reference }) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-lg font-semibold capitalize" htmlFor={id}>
        {label}
      </label>
      <input
        ref={reference}
        id={id}
        type="text"
        onChange={(e) => onChange(e.target.value)}
        className="px-4 py-2 rounded-lg outline-none ring-2 ring-primary-400 focus:ring-4 focus:ring-primary-600"
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
