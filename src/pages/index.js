import Navbar from '@/components/Navbar';
import HomeContainer from '@/containers/HomeContainer';
import Footer from '@/components/Footer';
import PopUpPassword from '@/components/PopUpPassword';

import { useEffect, useState } from "react";
import { useAppContext } from '@/contexts/AppContext';

export default function Home() {
  const { loginUser, responseLogin, loggedIn, isLoggedIn, itHasPassword, getClases, hasPassw} = useAppContext();
  const [hasPass, setHasPass] = useState(true );
  useEffect(() => {
    setHasPass(hasPassw)

    const checkLoginStatus = async () => {
      try {
        const logged = await isLoggedIn();
        const hasPassword = await itHasPassword();
        if (logged == false) {
          window.location.replace('/login');
        }
        if(hasPassword == true){
          setHasPass(true)
        }
      } catch (error) {
        console.error("Failed to check login status:", error);
      }

    };
    checkLoginStatus()
    const getClasesForHome = async () => {
      try {
        await getClases();
      } catch (error) {
        console.error("Failed to check login status:", error);
      }

    };
    getClasesForHome()
  }, [loggedIn, isLoggedIn, hasPassw]);
  

  return (
    <>
      
      <Navbar />
      {hasPass == false ? <PopUpPassword></PopUpPassword> : null}

      {hasPass == false ? null : null}
      {loginUser == false ? null : <HomeContainer/>}

      <Footer />
    </>
  );
}
