import React, {useEffect} from "react";
import { useAppContext } from '@/contexts/AppContext';

function InputSelect({datos, setFormData, formData}) {
  const options = datos.EDITORPAR1.split('|');
  const { datosFormularioActual, setDatosFormularioActual } = useAppContext();

  useEffect(() => {
    if (datos && datos.ATTNAME) {
      setDatosFormularioActual(prevState => ({
        ...prevState,
        [datos.ATTNAME]: options[0]
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
  
          <select className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          required={datos.REQUIRED}
          readOnly={datos.READONLY}
          value={datosFormularioActual[datos.ATTNAME] || ''}
        onChange={handleChange}
          >
{options.map((option, index) => {
        if (index % 2 === 0) {
          return <option key={option} value={option}>{options[index + 1]}</option>
        }
        return null;
      })}
          </select>
  );
}

export default InputSelect;
