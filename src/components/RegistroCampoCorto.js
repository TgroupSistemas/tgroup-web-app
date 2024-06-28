import React from "react";

function RegistroCampoCorto({ fieldKey, value }) {
  return (
    <div className="flex border-t border-gray-200 py-4">
      <span className="text-indigo-500 font-semibold  mr-4 ">{fieldKey}</span>
      <span className="ml-auto text-gray-900 text-right">{value}</span>
    </div>
  );
}

export default RegistroCampoCorto;
