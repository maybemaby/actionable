import { useState, useEffect } from "react";

// Hook to deal with using zustand persist middleware. Have to wait until hydration
// has occurred or you get a server/clinet mismatch.
export const useHasHydrated = () => {
  const [hasHydrated, setHasHydrated] = useState<boolean>(false);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  return hasHydrated;
};
