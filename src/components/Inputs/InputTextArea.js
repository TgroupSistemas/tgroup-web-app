import React, {useEffect} from "react";
import { useAppContext } from '@/contexts/AppContext';

function InputTextArea({datos}) {
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
  
    <textarea
    id={datos.ATTNAME}
    name={datos.DISPLAYLABEL}
    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
    required={datos.REQUIRED}
    readOnly={datos.READONLY}
    value={datosFormularioActual[datos.ATTNAME] || ''}
    onChange={handleChange}
  />
  );
}

export default InputTextArea;
