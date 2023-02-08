import React from "react";
import Annoucement from "./Annoucement";

const Input = ({
  id,
  placeholder,
  label,
  onChange,
  reference,
  value,
  err,
  name,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-lg font-semibold capitalize" htmlFor={id}>
        {label}
      </label>
      <input
        name={name || id}
        value={value}
        ref={reference}
        id={id}
        type="text"
        onChange={onChange}
        className="px-4 py-2 rounded-lg outline-none ring-2 ring-primary-400 focus:ring-4 focus:ring-primary-600"
        placeholder={placeholder}
      />

      {err && <Annoucement isError={true}>{err}</Annoucement>}
    </div>
  );
};

export default Input;
