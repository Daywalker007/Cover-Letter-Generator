import React, { createContext, useContext, useState } from 'react';

// Create a context instance
const LetterContext = createContext();

// Create a custom hook to access the context
export const useLetterContext = () => {
  return useContext(LetterContext);
};

// Create a provider component
export const LetterContextProvider = ({ children }) => {
  const [letterData, setLetterData] = useState('');
  const [pdfData, setPdfData] = useState({})

  const data = {
    letterData,
    setLetterData,
    pdfData,
    setPdfData
  }

  return (
    <LetterContext.Provider value={data}>
      {children}
    </LetterContext.Provider>
  );
};
