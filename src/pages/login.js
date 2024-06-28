import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useAppContext } from '@/contexts/AppContext';
import  { Redirect } from 'react-router-dom'
import { useHistory } from "react-router-dom";
import { browserHistory } from 'react-router';


export default function Login({  }) {
  const { loginUser, responseLogin, loggedIn, isLoggedIn } = useAppContext();

  const [username, setUserName] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState("");

  useEffect(() => {
  }, []);  
  const handleSubmit = async e => {
    e.preventDefault();
    const response = await loginUser({
      username, // Make sure to use the state variables here
      empresa,
      password
    });
    if (!response) {
      setError("Error al iniciar sesión. Por favor, verifique los datos ingresados.");
  }
    

  }
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const logged = await isLoggedIn();
        if (logged == true) {
          window.location.replace('/');
        }
      } catch (error) {
        console.error("Failed to check login status:", error);
      }
    };
    checkLoginStatus()
  }, [loggedIn, isLoggedIn]);
  

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 bg-white">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <img className="mx-auto h-14 w-auto" src="/assets/logo.png" alt="Your Company"/>
      <h2 className="mt-8 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Accedé a tu cuenta</h2>
    </div>
  
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="empresa" className="block text-sm font-medium leading-6 text-gray-900">Empresa</label>
          <div className="mt-2">
            <input id="empresa" name="empresa" type="text" onChange={e => setEmpresa(e.target.value)}   required className="block pl-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
          </div>
        </div>
        <div>
          <label htmlFor="nombre" className="block text-sm font-medium leading-6 text-gray-900">Nombre</label>
          <div className="mt-2">
            <input id="nombre" name="name" type="text" onChange={e => setUserName(e.target.value)}   required className="block pl-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
          </div>
        </div>
  
        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Contraseña</label>
            <div className="text-sm">
             
            </div>
          </div>
          <div className="mt-2">
            <input id="password" name="password" onChange={e => setPassword(e.target.value)}  type="password" autoComplete="current-password" className="block pl-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
          </div>
        </div>
        <div className="text-red-500">{error}</div>

  
        <div>
          <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Acceder</button>
        </div>
      </form>
  
    </div>
  </div>

  )}
