import { useEffect, useState } from "react";
import { useAppContext } from "@/contexts/AppContext";
import ClaseElegidaContainer from "./ClaseElegidaContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import RegistroCampoCorto from "@/components/RegistroCampoCorto";
import RegistroCampoLargo from "@/components/RegistroCampoLargo";
import Link from "next/link";
const RegistroContainer = ({ clase, id }) => {
  const {
    getClaseRegistro,
    registroActual,
    clasesHabilitadas,
    getClases,
    claseLoading,
    registroLoading,
  } = useAppContext();
  const [claseActualNom, setClaseActualNom] = useState("");
  let position = 0;
  useEffect(() => {
    const fetchClases = async () => {
      try {
        await getClases();

      } catch (error) {
        console.error("Failed to check login status:", error);
      }
    };
    fetchClases();
  }, [clase, getClaseRegistro]);
  useEffect(() => {
    const fetchRegistro = async (endp) => {
      try {
        await getClaseRegistro(id, endp);
      } catch (error) {
        console.error("Failed to check login status:", error);
      }
    };
    if (claseLoading == false) {
      const position = clasesHabilitadas.findIndex(
        (claseHabilitada) => claseHabilitada.DISPLAYLABEL === clase
      );
      if (registroActual.FK_CNM_VISITAS !== id) {
        setClaseActualNom(clasesHabilitadas[position].DISPLAYLABEL);
        fetchRegistro(clasesHabilitadas[position].WS_ENDPOINT_GET);
      }
    }
  }, [claseLoading]);
  return (
    <>
      <section className="text-gray-600 body-font bg-white overflow-hidden">
        <div className="container px-4 py-20 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <div className=" w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
              <Link href={`/${clase}/page/${1}`} className="mt-3 text-indigo-500 inline-flex items-center mb-4">
                <FontAwesomeIcon icon={faArrowLeft} className="mr-2 " />
                Volver
              </Link>
              {registroLoading ? (
  <h2>Loading...</h2>
) : (
  <>
    <h2 className="text-sm title-font text-gray-500 tracking-widest">
      {registroActual
        ? claseActualNom.endsWith("s")
          ? claseActualNom.slice(0, -1)
          : claseActualNom
        : "..."}{" "}
      #{id}
    </h2>
    <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">
      {registroActual ? registroActual.DESCRIPCION : "..."}
    </h1>
    {!registroLoading &&
      registroActual &&
      Object.entries(registroActual)
        .sort(
          ([keyA, valueA], [keyB, valueB]) =>
            String(valueB).length - String(valueA).length
        )
        .map(([key, value], index) => {
          const dateRegex = /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(.\d{3})?Z?)?$/;
          const isDate = dateRegex.test(value) && !isNaN(Date.parse(value));
          const formattedValue = isDate
            ? new Date(value).toLocaleString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })
            : value;

          // Find the corresponding DISPLAYLABEL for the fieldKey
          const attribute = clasesHabilitadas[position].WS_ATRIBUTOS.find(
            (attr) => attr.ATTNAME === key
          );
          let displayLabel = "";

          if(!attribute)
          {
            let displayLabel = key + "A";
            console.log(key, attribute)
            console.log
          }
          else{
            if(attribute.WS_ES_ID_CLASE == true)
              {
                console.log( Object.entries(registroActual)
                .sort(
                  ([keyA, valueA], [keyB, valueB]) =>
                    String(valueB).length - String(valueA).length
                ))
                console.log( clasesHabilitadas[position].WS_ATRIBUTOS)
              }
              if(attribute.WS_VISIBLE_AL_VISUALIZAR == true)
              {
                displayLabel = attribute ? attribute.DISPLAYLABEL : key;
              }
          }
         

            if (String(formattedValue).length <= 100) {
              return (
                <RegistroCampoCorto
                  key={index}
                  fieldKey={displayLabel}
                  value={formattedValue}
                />
              );
            } else {
              return (
                <RegistroCampoLargo
                  key={index}
                  fieldKey={displayLabel}
                  value={formattedValue}
                />
              );
            }
          }
          
        )}
  </>
)}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RegistroContainer;
