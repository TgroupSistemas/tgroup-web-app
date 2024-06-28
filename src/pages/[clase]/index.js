import ClaseContainer from '@/containers/ClaseContainer';
import { useRouter } from 'next/router';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAppContext } from '@/contexts/AppContext';
import React, { useState, useEffect } from 'react';
const Show = () => {
  const { loginUser, responseLogin, loggedIn, isLoggedIn, itHasPassword, getClases, claseLoading, classesHabilitadas } = useAppContext();
  const [hasPass, setHasPass] = useState(false);
  const router = useRouter();
  const { clase } = router.query;



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
  useEffect(() => {
    checkLoginStatus();
  }, []);
    return (<>
  <Navbar></Navbar>
  <ClaseContainer clase={clase} isTabla={false} /> 
  <Footer></Footer>
  </>);
};

export default Show;
