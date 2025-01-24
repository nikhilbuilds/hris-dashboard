import React, { createContext, useContext, useState } from "react";

interface LoaderContextType {
  isLoading: boolean;
  setLoading: (value: boolean) => void;
}

const LoaderContext = createContext<LoaderContextType | undefined>(undefined);

export const LoaderProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoaderContext.Provider value={{ isLoading, setLoading: setIsLoading }}>
      {children}
    </LoaderContext.Provider>
  );
};

export const useGlobalLoader = () => {
  const context = useContext(LoaderContext);
  if (!context) {
    throw new Error("useGlobalLoader must be used within a LoaderProvider");
  }
  return context;
};
