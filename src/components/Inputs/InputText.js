import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import Link from "next/link";
import { useAppContext } from '@/contexts/AppContext';
import { useEffect } from 'react';

function InputText({datos}) {
  const { activarPopUp, datosFormularioActual, setDatosFormularioActual } = useAppContext();

  useEffect(() => {
    if (datos && datos.ATTNAME) {
      setDatosFormularioActual(prevState => ({
        ...prevState,
        [datos.ATTNAME]: ""
      }));
    }
  }, []);

  const handleChange = (event) => {
    setDatosFormularioActual(prevState => ({
      ...prevState,
      [datos.ATTNAME]: event.target.value
    }));
  };

  return (
    <div className="relative">
      <input
        type="text"
        id={datos.ATTNAME}
        name={datos.DISPLAYLABEL}
        className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out pr-10"
        required={datos.REQUIRED}
        readOnly={datos.WS_ITRIS_CLASSES !== "" || datos.READONLY}
        value={datosFormularioActual[datos.ATTNAME] || ''}
        onChange={handleChange}

      />
      {datos.WS_ITRIS_CLASSES !== "" && (
        <a 
  className="absolute right-3 top-1/2 transform -translate-y-1/2" 
  onClick={() => activarPopUp(datos.WS_ITRIS_CLASSES, 1, datos.ATTNAME)}
>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </a>
      )}
    </div>
  );
}

export default InputText;