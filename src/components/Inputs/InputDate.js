import React, {useEffect} from "react";
import { useAppContext } from '@/contexts/AppContext';
function InputDate({datos}) {
  const now = new Date().toISOString().slice(0,16);
  const value = datos.ATTDEFVALUE == "Now" ? now : datos.ATTDEFVALUE;
  const { datosFormularioActual, setDatosFormularioActual } = useAppContext();
  useEffect(() => {
    if (datos && datos.ATTNAME && !datos.READONLY  ) {
      setDatosFormularioActual(prevState => ({
        ...prevState,
        [datos.ATTNAME]: value || ""
      }));
    }
    else{

    }
  }, []);

  const handleChange = (event) => {
    setDatosFormularioActual(prevState => ({
      ...prevState,
      [datos.ATTNAME]: event.target.value
    }));
  };

  return (
    <input
      type="datetime-local"
      id={datos.ATTNAME}
      name={datos.DISPLAYLABEL}
      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
      value={datos.READONLY == false ?  datosFormularioActual[datos.ATTNAME] : value}
      required={datos.REQUIRED}
      readOnly={datos.READONLY}
      onChange={handleChange}
    />
  );
}

export default InputDate;
