import React, { useState } from 'react';
import { memo } from 'react';
import TareasForm from "@/components/TareasForm";
import TareasTable from '@/components/TareasTable';
import ClaseForm from '@/components/ClaseForm';
import ClaseTable from '@/components/ClaseTable';
const ClaseElegidaContainer = memo(({clase, isTabla, page}) => {

  const [isChecked, setIsChecked] = useState(isTabla);
  if (!clase) {
    return null; // or return a loading spinner
  }

  // Step 5: Event handler to update the state variable when the checkbox changes
  const handleCheckboxChange = (event) => {
    if(isTabla)
    {
      window.location.replace('/' + clase.DISPLAYLABEL);
    }
    else{
      window.location.replace('/' + clase.DISPLAYLABEL + '/page/1');

    }

  };
  return (
    <section className="text-gray-600 bg-white body-font relative">
      <div className="container px-3 py-12 mx-auto">
        <div className="flex flex-col text-center w-full mb-3">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
          {clase ? clase.DISPLAYLABEL : '...'}
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
          {clase ? clase.DESCRIPTION : '...'}

          </p>
        </div>
        <div className="flex justify-center w-full mb-2 borde">
          <label
            htmlFor="Toggle3"
            className="inline-flex items-center p-2 rounded-md cursor-pointer dark:text-gray-800">
            <input id="Toggle3" type="checkbox" className="hidden peer"  checked={isChecked} onChange={handleCheckboxChange} />
            <span className="md:py-2 rounded-l-md md:px-16 px-7 py-4 verdetgbg text-white peer-checked:dark:bg-gray-300  peer-checked:text-black">
              Crear {clase ? clase.DISPLAYLABEL : '...'}
            </span>
            <span className=" md:py-2 rounded-r-md md:px-16 px-7 py-4 dark:bg-gray-300 text-black peer-checked:dark:bg-gray-500 w- peer-checked:text-white">
              Ver {clase ? clase.DISPLAYLABEL : '...'}
            </span>
          </label>
        </div>
        {isChecked ? <ClaseTable campos={clase.WS_ATRIBUTOS} endpointURL={clase.DISPLAYLABEL} endpoint={clase.WS_ENDPOINT_GET}  page={page}></ClaseTable>   : <ClaseForm campos={clase.WS_ATRIBUTOS } endpoint={clase.WS_ENDPOINT}></ClaseForm>}

        {/*isChecked ? <TareasTable campos={clase.WS_ATRIBUTOS} endpoint={clase.WS_ENDPOINT}></TareasTable> : <TareasForm></TareasForm>*/}
      </div>
    </section>
  );
});

export default ClaseElegidaContainer;

//* Empresa (req) * Responsable (req - responsable asignado al usuario logueado) * Hs. invertidas (opc) * Descripción (req) * Notificar a (opc) * Detalle de tarea (opc) * Estado (req. Defecto: 'P') Opciones: P|1.Pendiente|E|2.En proceso|S|3.Stand by|C|4.Cumplida|X|5.Cancelada|L|6.Pend. cliente|I|7.Pend. Itris
//rad rad text area rad area rad