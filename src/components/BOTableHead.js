import React from "react";

function BOTableHead({ elementos, campos }) {
  let visibleLabels = campos.filter(item => item.WS_VISIBLE_AL_VISUALIZAR).map(item => item.DISPLAYLABEL);
  if(elementos == undefined) {
      return <div>Loading...</div>;
  }
  return (
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-500 dark:text-gray-100">
          <tr>
              {visibleLabels.map((elemento, index) => (
                  <th key={index} scope="col" className="px-6 py-3">
                      {elemento}
                  </th>
              ))}
          </tr>
      </thead>        
  );
}
export default BOTableHead;

