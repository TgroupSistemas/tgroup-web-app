import React, { useState } from "react";
import { useAppContext } from "@/contexts/AppContext";
import BOTableHead from "./BOTableHead";
import BOTableLogPopUp from "./BOTableLogPopUp";
const PopUpEndpointSelector = () => {
  const {
    endpointDataActual,
    campoPopUpActual,
    endpointLoading,
    popUpSelectorActivo,
    setPopUpSelectorActivo,
    endpointFiltroActual,
    setEndpointFiltroActual,
    getEndpoint,
    paginaActualComponente,
    endpointActualPopUp,
    siguientePaginaPopUp,
    anteriorPaginaPopUp,
    
  } = useAppContext();
  const [filteredEndpointLoading, setFilteredEndpointLoading] = useState(false);

  if (!popUpSelectorActivo || !endpointDataActual) {
    return null;
  }

  const getFilteredEndpoint = async (pagina) => {
    try {
      await getEndpoint(endpointActualPopUp, pagina, endpointFiltroActual,endpointDataActual[0]);
    } catch (error) {
      console.error("Failed to get endpoint:", error);
    } finally {
    }
  };

  return (
    <>
      <div
        id="overlay"
        className="fixed inset-0 bg-black bg-opacity-50 z-10 cursor-pointer"
        onClick={() => {
          setPopUpSelectorActivo(false);
        }}
      >
        <div
          id="text"
          className="absolute top-5 left-1/2 max-h-[90vh] overflow-auto rounded-xl  text-white transform bg-gray-400 -translate-x-1/2 "
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          <div className="flex justify-between flex-row-reverse ">
            <nav
              className="flex items-center justify-between pt-0 pr-3"
              aria-label="Table navigation"
            >
              <ul className="inline-flex -space-x-px text-sm h-8">
                <li>
                  <button
                    href="#"
                    className="flex items-center justify-center px-4 h-10 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 "
                    onClick={() => anteriorPaginaPopUp(endpointActualPopUp, paginaActualComponente, endpointFiltroActual, (endpointDataActual)[0])} // Replace with your search function
                  >
                    Anterior
                  </button>
                </li>

                <li>
                  <button className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 "
                  onClick={() => siguientePaginaPopUp(endpointActualPopUp, paginaActualComponente, endpointFiltroActual,(endpointDataActual)[0])} >
                    Siguiente
                  </button>
                </li>
              </ul>
            </nav>
            <div className="flex justify-end pt-2 pl-3">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>

                <input
                  type="text"
                  id="table-search"
                  className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-50 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                  onChange={(e) => setEndpointFiltroActual(e.target.value)}
                />
              </div>
              <button
                type="button"
                className="block p-2 text-sm px-4 ml-2 text-gray-500 bg-gray-50 rounded-lg"
                onClick={() => getFilteredEndpoint(1)} // Replace with your search function
              >
                Buscar
              </button>
            </div>
          </div>
          {endpointLoading ? (
            <p>Cargando...</p> 
          ) : endpointDataActual.length == 0 ? ( <p className="text-center p-5">No hay datos.</p>) : (
            <table className="m-3 rounded-md">
              {(endpointDataActual).map((elemento, index) => (
                <BOTableLogPopUp
                  elementos={elemento}
                  key={index}
                  claseActual={"WS_TAREAS"}
                />
              ))}
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default PopUpEndpointSelector;
