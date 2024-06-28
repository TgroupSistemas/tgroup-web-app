import React from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RegistroContainer from "@/containers/RegistroContainer";
const ClaseLog = () => {
  const router = useRouter(); // Define the router variable here
  const { clase, id } = router.query;

  return (
    <>
  <Navbar></Navbar>
  <RegistroContainer clase={clase} id={id}></RegistroContainer>
  <Footer></Footer>
  </>

  );
};

export default ClaseLog;
