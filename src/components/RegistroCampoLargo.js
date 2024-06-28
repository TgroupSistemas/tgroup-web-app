import React from "react";

function RegistroCampoLargo({ fieldKey, value }) {
  
  return (
    <>
      <div className="flex mb-4">
        <a className="flex-grow text-indigo-500 font-semibold border-b-2 border-indigo-500 py-2 px-1">
          {fieldKey}
        </a>
      </div>
      <p className="leading-relaxed mb-4">
        {value}
      </p>
    </>
  );
}

export default RegistroCampoLargo;
