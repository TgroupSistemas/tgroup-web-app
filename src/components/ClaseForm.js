import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import ChooseInput from "./ChooseInput";
import { useAppContext } from '@/contexts/AppContext';
import PopUpEndpointSelector from "./PopUpEndpointSelector";
//campos={clase.clase.WS_ATRIBUTOS} endpoint={clase.clase.WS_ENDPOINT}
function ClaseForm({campos, endpoint}) {
  const {enviarFormularioClase} = useAppContext();
  const handleSubmit = (e) => {
    e.preventDefault();
    enviarFormularioClase(endpoint);
  }

  return (
    
    <div className="lg:w-1/2 md:w-2/3 mx-auto mt-12 rounded border-solid">
      <PopUpEndpointSelector/>
    <form className="flex flex-wrap -m-2" onSubmit={handleSubmit}>
    {campos.map(campo => 
        <ChooseInput key={campo.ATTNAME} atributos={campo}/>
      )}
      <div className="p-2 w-full">
        <button  type="submit" className="flex mx-auto text-white verdetgbg border-0 mt-4 py-2 px-8 focus:outline-none hover:bg-gray-500 rounded text-lg"
            
            >
          Enviar
        </button>
      </div>
      
    </form>
  </div>
  );
}

export default ClaseForm;
