import React from "react";
import InputSelect from "./Inputs/InputSelect";
import InputText from "./Inputs/InputText";
import InputDate from "./Inputs/InputDate";
import InputTextArea from "./Inputs/InputTextArea";
import InputInt from "./Inputs/InputInt";
import InputNumber from "./Inputs/InputNumber";
import { useAppContext } from '@/contexts/AppContext';

function ChooseInput({atributos}) {
  if (atributos.WS_VISIBLE_ALTA === false) {
    return null;
  }

  return (
    <div className={atributos.WS_SIZE == 2 ? 'p-2 w-full' : 'p-2 w-1/2'}>
      <div className="relative">
        <label forhtml="name" className="leading-7 text-sm text-gray-600">
          {atributos.DISPLAYLABEL} {atributos.REQUIRED && <span className="text-red-500">*</span>}

        </label>
        {atributos.EDITORTYPE == "L" ? 
        <InputSelect  datos={atributos}/> :
        <>
          {atributos.TYPE === "V" && <InputText datos={atributos}   />}
          {atributos.TYPE === "M" && <InputTextArea datos={atributos}   />}
          {atributos.TYPE === "D" && <InputDate datos={atributos}   />}
          {atributos.TYPE === "I" && <InputInt datos={atributos}   />}
          {atributos.TYPE === "N" && <InputNumber datos={atributos}   />}
        </>
      }
      </div>
    </div>
  );
}

export default ChooseInput;   