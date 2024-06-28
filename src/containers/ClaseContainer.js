import { useEffect } from 'react';
import { useAppContext } from '@/contexts/AppContext';
import ClaseElegidaContainer from './ClaseElegidaContainer';

const ClaseContainer = ({ clase, isTabla, page }) => {
  const { clasesHabilitadas, getClases, clasesLoading } = useAppContext();

  useEffect(() => {
    const fetchClases = async () => {
      try {
        await getClases();
      } catch (error) {
        console.error("Failed to check login status:", error);
      }
    };
  
    fetchClases();
}, [clase, getClases]);


  return (
    <>
      {clasesLoading && <p>LOADING....</p>}
      {!clasesLoading && <ClaseElegidaContainer clase={clasesHabilitadas.find(item => item.DISPLAYLABEL === clase)} isTabla={isTabla} page={page} />}
    </>
  );
};

export default ClaseContainer;
