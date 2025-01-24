import { useState } from "react";

export const useLoader = () => {
  const [isLoading, setIsLoading] = useState(false);

  const withLoader = async (callback: () => Promise<void>) => {
    setIsLoading(true);
    try {
      await callback();
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, withLoader };
};
