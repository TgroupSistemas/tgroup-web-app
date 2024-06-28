import React from "react";
import Link from "next/link";
function BOTableLog({ funcion, elementos, campos, claseActual }) {
  const handleEliminarClick = () => {
    // Call the provided function when the "Eliminar" header is clicked
    if (funcion) {
      funcion(Object.values(elementos)[0]);
    }
  };
  let newArray = campos.map((campo) => elementos[campo]);
  const arrayFromJson = Object.values(elementos);
  return (
    <tr  onClick={() => window.location.href = `/${claseActual}/${elementos.FK_CNM_VISITAS}`}className="cursor-pointer bg-white border-b dark:bg-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-100">
      {newArray.map((elemento, index) => (
        
        <td key={index} scope="row" className="px-6 font-normal py-4">

{
  Array.isArray(elemento)
    ? `${elemento.length}`
    : typeof elemento === 'string' && !isNaN(Date.parse(elemento))
    ? new Date(elemento).toLocaleString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        /*hour: '2-digit',
        minute: '2-digit'*/
      })
    : elemento !== null && elemento !== undefined
    ? elemento.toString().length > 100
      ? elemento.toString().substring(0, 100) + "..."
      : elemento.toString()
    : ""
}{" "}
</td>
      ))}
    </tr>
  );
}

export default BOTableLog;
