import React from "react";

function TareasForm() {
  return (
    
    <div className="lg:w-1/2 md:w-2/3 mx-auto mt-12 rounded border-solid">
    <div className="flex flex-wrap -m-2 	">
      <div className="p-2 w-1/2">
        <div className="relative">
          <label htmlFor="name" className="leading-7 text-sm text-gray-600">
            Empresa
          </label>
          <select className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
            <option value="someOption">A</option>
            <option value="otherOption">B</option>
          </select>
        </div>
      </div>
      <div className="p-2 w-1/2 h-3">
        <div className="relative">
          <label htmlFor="email" className="leading-7 text-sm text-gray-600">
            Responsable
          </label>
          <select className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
            <option value="someOption">A</option>
            <option value="otherOption">B</option>
          </select>
        </div>
      </div>
      <div className="p-2 w-1/2">
        <div className="relative">
          <label htmlFor="message" className="leading-7 text-sm text-gray-600">
            Horas invertidas
          </label>
          <input
            type="number"
            step="0.5"
            id="text"
            name="text"
            className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
      </div>
      <div className="p-2 w-1/2 ">
        <div className="relative">
          <label htmlFor="email" className="leading-7 text-sm text-gray-600">
            Notificar a
          </label>
          <select className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
            <option value="someOption">A</option>
            <option value="otherOption">B</option>
          </select>
        </div>
      </div>
      <div className="p-2 w-1/2 ">
        <div className="relative">
          <label htmlFor="email" className="leading-7 text-sm text-gray-600">
            Estado
          </label>
          <select className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
            <option value="otherOption">1. Pendiente</option>
            <option value="someOption">2. En proceso</option>
            <option value="otherOption">3. Stand by</option>
            <option value="someOption">4. Cumplida</option>
            <option value="otherOption">5. Cancelada</option>
            <option value="someOption">6. Pend. cliente</option>
            <option value="otherOption">7. Pend. Itris</option>
          </select>
        </div>
      </div>
      <div className="p-2 w-full">
        <div className="relative">
          <label htmlFor="message" className="leading-7 text-sm text-gray-600">
            Descripción
          </label>
          <input
            type="text"
            id="text"
            name="text"
            className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
      </div>
     
      <div className="p-2 w-full">
        <div className="relative">
          <label htmlFor="message" className="leading-7 text-sm text-gray-600">
            Detalle de tarea
          </label>
          <textarea
            id="message"
            name="message"
            className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
          ></textarea>
        </div>
      </div>
      
      <div className="p-2 w-full">
        <button className="flex mx-auto text-white verdetgbg border-0 mt-4 py-2 px-8 focus:outline-none hover:bg-gray-500 rounded text-lg">
          Enviar
        </button>
      </div>
      
    </div>
  </div>
  );
}

export default TareasForm;

//* Empresa (req) * Responsable (req - responsable asignado al usuario logueado) * Hs. invertidas (opc) * Descripción (req) * Notificar a (opc) * Detalle de tarea (opc) * Estado (req. Defecto: 'P') Opciones: P|1.Pendiente|E|2.En proceso|S|3.Stand by|C|4.Cumplida|X|5.Cancelada|L|6.Pend. cliente|I|7.Pend. Itris
//rad rad text area rad area rad