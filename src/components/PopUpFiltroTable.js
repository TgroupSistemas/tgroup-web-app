import React, { useRef, useState, useEffect } from "react";
import { useAppContext } from "@/contexts/AppContext";

const PopUpFiltroTable = ({ visibleLabels, campos, campos2, endpoint, endpointURL }) => {
  const {
    endpointDataActual,
    endpointLoading,
    popUpFiltroActivo,
    setPopUpFiltroActivo,
  } = useAppContext();
  const formRef = useRef();
  let options = [];
  const [formData, setFormData] = useState({}); // Initialize formData with an empty object
  //console.log(visibleLabels, campos, campos2, endpoint, endpointURL)
  useEffect(() => {
    // This function now lives inside useEffect to avoid the rules of hooks violation
    function generateInitialFormData() {
      let initialFormData = {};
      let url = window.location.href;
      let urlObj = new URL(url);
      let parameters = new URLSearchParams(urlObj.search);

      for (let item of campos) {
        if (parameters.has(item.ATTNAME)) {
          initialFormData[item.ATTNAME] = parameters.get(item.ATTNAME);
        }
      }
      return initialFormData;
    }

    if (popUpFiltroActivo) {
      setFormData(generateInitialFormData()); // Populate formData after component mounts
    }
  }, [campos, popUpFiltroActivo]); // Dependency array ensures this effect runs only when campos or popUpFiltroActivo changes

  if (!popUpFiltroActivo) {
    return null;
  }



  async function handleSubmit(event) {
    event.preventDefault();
    let filteredFormData = Object.fromEntries(Object.entries(formData).filter(([key, value]) => value !== ""));

    const params = new URLSearchParams(filteredFormData).toString();

    window.location = `${window.location.pathname}?${params}`;
    window.location = `${window.location.origin}/${endpointURL}/page/${1}?${params}`;

  }

  return (
    <>
      <div
        id="overlay"
        className="fixed inset-0 bg-black bg-opacity-50 z-10 cursor-pointer"
        onClick={() => {
          setPopUpFiltroActivo(false);
        }}
      >
        <div
          id="text"
          className="absolute top-5 md:w-auto left-1/2 max-h-[90vh] overflow-auto rounded-xl  text-white transform bg-gray-400 cursor-auto -translate-x-1/2 "
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          <h1 className="text-center mt-4 text-lg font-semibold">
            Busqueda avanzada
          </h1>
          <form ref={formRef} onSubmit={handleSubmit}>
          {campos
  .filter((item) => item.WS_VISIBLE_AL_VISUALIZAR)
  .map((item) => {
    let inputType;
    switch (item.TYPE) {
      case 'D':
        inputType = 'datetime-local';
        break;
      case 'I':
        inputType = 'number';
        break;
      case 'N':
        inputType = 'number';
        break;
      case 'E':
        inputType = 'date';
        break;
      case 'T':
        inputType = 'time';
        break;
      case 'F':
        inputType = 'number';
        break;
      case 'V':
          inputType = 'select';
          const optionsArray = item.EDITORPAR1.split('|');
          options = [];
            for (let i = 0; i < optionsArray.length; i += 2) {
              options.push({
                value: optionsArray[i],
                displayName: optionsArray[i + 1],
              });
            }
        break;
      default:
        inputType = 'text';
    }
    console.log(item)
    return (
      <div className="md:flex justify-end p-7 pt-6 pb-2" key={item.ATTNAME}>
        <h4 className="text-md font-semibold  text-gray-200 pr-5 mt-1">
          {item.DISPLAYLABEL}
        </h4>
        
        {inputType === 'select' ? (
          <select
            id={`table-search-${item.ATTNAME}`}
            value={formData[item.ATTNAME] || ""}
            onChange={(e) =>
              setFormData({ ...formData, [item.ATTNAME]: e.target.value })
            }
            className="block p-1 pl-4 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-200 dark:border-gray-200 dark:placeholder-black  dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.displayName}
      </option>
    ))}
          </select>
        ) : (
          <input
            type={inputType}
            id={`table-search-${item.ATTNAME}`}
            value={formData[item.ATTNAME] || ""}
            onChange={(e) =>
              setFormData({ ...formData, [item.ATTNAME]: e.target.value })
            }
            className="block p-1 pl-4 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-200 dark:border-gray-200 dark:placeholder-black  dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        )}
      </div>
    );
  })}
            <div className="flex items-center justify-center pt-4 pb-5  w-full">
              <button
                onClick={handleSubmit}
                className="flex items
                -center justify-center px-7 py-3 text-sm font-semibold text-white bg-gray-500 rounded-xl hover:bg-gray-600 dark:bg-gray-500 dark:hover:bg-gray-600"
              >
                BUSCAR{" "}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default PopUpFiltroTable;
