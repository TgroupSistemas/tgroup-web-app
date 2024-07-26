import React, { useEffect, useState } from 'react';
import { useAppContext } from "@/contexts/AppContext";
const Alerts = () => {
    const {alerts, removeAlert} = useAppContext();

    useEffect(() => {
        const timers = alerts.map((alert, index) => 
            setTimeout(() => removeAlert(index), 5000)
        );

        // Cleanup function to clear timeouts if the component unmounts
        return () => {
            timers.forEach(timer => clearTimeout(timer));
        };
    }, [alerts, removeAlert]);
    
    return (
        <div className="alerts-container bg-white fixed right-3 ">
            {alerts.map((alert, index) => (
               <div className="mt-4 p-4 border border-green-400 border-r-8 text-green-700 rounded">
               {alert}
             </div>
            ))}
        </div>
    );
};

export default Alerts;