import ClaseContainer from '@/containers/ClaseContainer';
import { useRouter } from 'next/router';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAppContext } from '@/contexts/AppContext';
import { useEffect, useState } from "react";
const Page = () => {
  const { loginUser, responseLogin, loggedIn, isLoggedIn, itHasPassword, getClases } = useAppContext();
  const [hasPass, setHasPass] = useState(false);
  const router = useRouter();
  const { clase, page } = router.query;
 useEffect(() => {
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
    checkLoginStatus();
  }, []); // Empty dependency array means this effect runs once on mount

  

  return (<>
  <Navbar></Navbar>
  <ClaseContainer clase={clase} isTabla={true} page={page}/>
  <Footer></Footer>
  </>);
};

export default Page;
