import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export const useEmpStatus = () => {
    
  const [loggedIn, setLoggedIn] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);

  const { emp } = useSelector((state) => state.employee);

  useEffect(() => {
    if (emp) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
    setCheckingStatus(false);
  }, [emp]);

  return { loggedIn, checkingStatus };
};
