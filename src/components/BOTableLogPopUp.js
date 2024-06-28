import React from "react";
import Link from "next/link";
import { useAppContext } from "@/contexts/AppContext";

function BOTableLogPopUp({ funcion, elementos, claseActual }) {
  const { setDatosFormularioActual, campoPopUpActual, setPopUpSelectorActivo } =
    useAppContext();
  const arrayFromJson = Object.values(elementos);

  return (
    <tbody>
      <tr
        className="cursor-pointer bg-white border-b dark:bg-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-100"
        onClick={() => {
          setDatosFormularioActual((prevState) => ({
            ...prevState,
            [campoPopUpActual]: elementos.CODIGO,
          }));
          setPopUpSelectorActivo(false);
        }}
      >
        {arrayFromJson.map((elemento, index) => (
          <td
            key={index}
            scope="row"
            className="px-6 text-black font-normal py-3"
          >
            {Array.isArray(elemento)
              ? `${elemento.length}`
              : typeof elemento === "string" && !isNaN(Date.parse(elemento))
              ? new Date(elemento).toLocaleString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })
              : elemento !== null && elemento !== undefined
              ? elemento.toString().length > 100
                ? elemento.toString().substring(0, 100) + "..."
                : elemento
              : ""}
          </td>
        ))}
      </tr>
    </tbody>
  );
}

export default BOTableLogPopUp;
