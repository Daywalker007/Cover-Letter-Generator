import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a context instance
const LetterContext = createContext();

// Create a custom hook to access the context
export const useLetterContext = () => {
  return useContext(LetterContext);
};

// Create a provider component
export const LetterContextProvider = ({ children }) => {

  const APP_STATE = Object.freeze({
    Form:1,
    Output:2,
    Desktop:3
  })

  const [pdfData, setPdfData] = useState({})
  const [letterData, setLetterData] = useState('Please fill out the form on the left');
  const [appState, setAppState] = useState(APP_STATE.Form)

  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);

  const checkScreenSize = () => {
    if(window.innerWidth >= 1024) 
        setAppState(APP_STATE.Desktop)
      else
        setAppState(APP_STATE.Form)
  }

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
      checkScreenSize()
    };

    window.addEventListener('resize', handleWindowResize);
    checkScreenSize()

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  const data = {
    letterData,
    setLetterData,
    pdfData,
    setPdfData,
    APP_STATE,
    appState,
    setAppState,
  }

  return (
    <LetterContext.Provider value={data}>
      {children}
    </LetterContext.Provider>
  );
};
