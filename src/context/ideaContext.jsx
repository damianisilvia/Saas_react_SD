import React, { createContext, useContext, useState } from 'react';

const IdeaContext = createContext();

export function IdeaProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [idea, setIdea] = useState('');

  return (
    <IdeaContext.Provider
      value={{
        isLoading,
        setIsLoading,
        isloading: isLoading, // in caso l'utente preferisca tutto in minuscolo
        setIsloading: setIsLoading,
        idea,
        setIdea,
      }}
    >
      {children}
    </IdeaContext.Provider>
  );
}

export function useIdea() {
  const context = useContext(IdeaContext);
  if (context === undefined) {
    throw new Error('useIdea deve essere usato all\'interno di un IdeaProvider');
  }
  return context;
}
