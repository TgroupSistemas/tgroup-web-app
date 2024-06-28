import React, { useEffect } from "react";
import BOTableHead from "./BOTableHead";
import BOTableLog from "./BOTableLog";
import Link from "next/link";
import PopUpFiltroTable from "./PopUpFiltroTable";
import { useAppContext } from "@/contexts/AppContext";
function ClaseTable({ campos, endpoint, page, endpointURL }) {
  const {
    tareas,
    getRegistroClase,
    tareasLoading,
    activarPopUpFiltro,
    setPopUpSelectorActivo,
  } = useAppContext();
  const params = new URLSearchParams(window.location.search);
  function getNextPageUrl() {
    window.location = `${window.location.origin}/${endpointURL.replace(
      "clases/",
      ""
    )}/page/${Number(page) + 1}?${params}`;
  }

  function getPreviousPageUrl() {
    if (Number(page) == 1) {
      return; // if page is 1, do nothing and return
    }
    window.location = `${window.location.origin}/${endpointURL.replace(
      "clases/",
      ""
    )}/page/${Number(page) - 1}?${params}`;
  }

  const updateElemento = (elemento, campos) => {
    campos.forEach((campo) => {
      if (campo.EDITORPAR1) {
        const pairs = campo.EDITORPAR1.split("|");
        for (let i = 0; i < pairs.length; i += 2) {
          if (elemento[campo.ATTNAME] === pairs[i]) {
            elemento[campo.ATTNAME] = pairs[i + 1];
            break;
          }
        }
      }
    });
    return elemento;
  };

  useEffect(() => {
    getRegistroClase(page, params, endpoint);
  }, []);
  if (tareasLoading) {
    return <div>Loading...</div>;
  }
  if (tareasLoading == false) {
    if (tareas.length === 0) {
      return <p>Los valores de búsqueda no coinciden con ningún registro</p>;
    }
  }
  let visibleLabels = campos
    .filter((item) => item.WS_VISIBLE_AL_VISUALIZAR)
    .map((item) => item.ATTNAME);
  return (
    <div>
      <PopUpFiltroTable
        visibleLabels={visibleLabels}
        endpoint={endpoint}
        campos2={Object.keys(tareas[0])}
        campos={campos}
        endpointURL={endpointURL}
      />

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex items-center justify-end pb-4">
          <div
            className="flex items-center space-x-4"
            onClick={() => activarPopUpFiltro()}
          >
            <button
              className="flex items
                -center justify-center px-10 py-2 text-sm font-medium text-white bg-gray-500 rounded-lg hover:bg-gray-600"
            >
              Búsqueda
            </button>
          </div>
        </div>
        <table className="w-full text-sm text-left text-gray-200 dark:text-gray-800">
          <BOTableHead
            campos={campos}
            elementos={Object.keys(tareas[0])}
          ></BOTableHead>
          <tbody>
            {tareas.map((elemento, index) => {
              const updatedElemento = updateElemento(elemento, campos);
              return (
                <BOTableLog
                  elementos={updatedElemento}
                  key={index}
                  campos={visibleLabels}
                  claseActual={endpointURL}
                />
              );
            })}
          </tbody>
        </table>
      </div>
      <nav
        className="flex items-center justify-between pt-4"
        aria-label="Table navigation"
      >
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
          Mostrando <span className="font-bold">{tareas.length} </span>
          registros. Página <span className="font-bold ">{page}</span>
        </span>
        <ul className="inline-flex -space-x-px text-sm h-8">
          <li>
            <button
              onClick={getPreviousPageUrl}
              href="#"
              className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Anterior
            </button>
          </li>

          <li>
            <button
              onClick={getNextPageUrl}
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Siguiente
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default ClaseTable;
