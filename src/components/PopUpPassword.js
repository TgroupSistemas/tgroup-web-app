import React from "react";
import {useState, useEffect} from "react";
import {useAppContext} from "@/contexts/AppContext";

function PopUpPassword({ funcion, elementos }) {

  const { changePassword } = useAppContext();

  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState('');
  useEffect(() => {
  }, []);  
  const handleSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      setError('Las contraseñas no coinciden');
    } else {
      const response = await changePassword({
        password,
        password2
      });
    }

  }

  return (
    <div className="fixed flex items-center justify-center w-full h-full bg-black bg-opacity-50">
    <form className="flex flex-col items-center justify-center p-8 bg-white rounded-md"  onSubmit={handleSubmit}>
    <p className="mb-4 mx-3 font-bold text-black">Establezca una contraseña para su cuenta</p>

      <label className="mb-2 w-full  text-black">
        Contraseña:
        <input onChange={e => setPassword(e.target.value)} type="password" name="password1" className="block w-full p-2 mt-1 border rounded-md" />
      </label>
      <label className="mb-2 w-full  text-black">
        Confirmar contraseña:
        <input onChange={e => setPassword2(e.target.value)} type="password" name="password2" className="block w-full p-2 mt-1 border rounded-md" />
      </label>
      {error && <p className="text-red-500">{error}</p>}
      <input type="submit" value="Actualizar" className="px-4 py-2 mt-3 text-white bg-blue-500 rounded-md cursor-pointer" />
    </form>
  </div>
  );
}

export default PopUpPassword;

