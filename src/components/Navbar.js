import Image from 'next/image';
import { useAppContext } from '@/contexts/AppContext';
import { RxHamburgerMenu } from 'react-icons/rx';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowsRotate, faGear, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import React from "react";
import {useState, useEffect} from "react";


const Navbar = () => {
  const [empresaa, setEmpresa] = useState("Usuario");
  const { getEmpresa, logout } = useAppContext();
  useEffect(() => {
    const fetchEmpresa = async () => {
      const empresa = await getEmpresa();
      console.loi
    setEmpresa(empresa);
    };
    fetchEmpresa();
  }, []);

  return (
    <header className="text-black bg-white body-font">
      <div className="shadownav">
    <div className="container mx-auto flex flex-wrap p-3 px-5 flex-col  md:flex-row items-center shadow-md">
    <Link className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0" href={`/`}>
      <img className="h-12 text-white" src='/assets/logo.png'></img>
      </Link>
      <nav className="md:ml-auto flex flex-wrap items-center text-black justify-center">
      </nav>
      <li className="block  text-center px-4 no-underline verdetg font-semibold">{empresaa}</li>

        <li className="block text-center px-3 no-underline verdetg">
  <a className="lis" href="#" onClick={logout}>
    <FontAwesomeIcon icon={faArrowRightFromBracket} />
  </a>
</li>      </div>
    </div>
  </header>
  );
};

export default Navbar;
