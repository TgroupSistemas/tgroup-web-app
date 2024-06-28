import React, { useEffect, useState } from "react";
import { useAppContext } from '@/contexts/AppContext';
import ClassAccess from "./ClassAccess";
const SelectorFuncion = () => {
  const [isClient, setIsClient] = useState(false);
  const [user, setUser] = useState("Usuario");
  const { getUsername, clasesHabilitadas, isLoggedIn } = useAppContext();
  useEffect(() => {
    // This will run only in client side
    setIsClient(true);
    const fetchUsername = async () => {
      const username = await getUsername();
      setUser(username);
    };
    if(isLoggedIn()){

    
      fetchUsername();

    }

  
  }, []);

  if (!isLoggedIn) {
    // This will render on server side
    return null;
  }
  return (
    <section className="text-gray-600 bg-white body-font">
  <div className="container px-5 py-24 mx-auto">
    <div className="flex flex-col text-center w-full mb-20">
      <h4 className=" text-indigo-500 tracking-widest font-medium title-font mb-1">¡Bienvenido!</h4>
      <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">{user}</h1>
    </div>
    <h3 className="pl-4 text-left mb-5 font-bold">Modulos</h3>
    <div className="flex flex-wrap -m-4 " >
      {clasesHabilitadas.map(clase => 
        <ClassAccess key={clase.CLANAME} clase={clase} />
      )}
    </div>
  </div>
</section>
  );
};

export default SelectorFuncion;
