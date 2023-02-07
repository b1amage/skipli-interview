import React from "react";

const Input = ({ id, placeholder, label, onChange }) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-semibold capitalize text-lg" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        type="text"
        onChange={(e) => onChange(e.target.value)}
        className="px-4 py-2 rounded-lg ring-2 ring-primary-400 outline-none focus:ring-4 focus:ring-primary-600"
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
