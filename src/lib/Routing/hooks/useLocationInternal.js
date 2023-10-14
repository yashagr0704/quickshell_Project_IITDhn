import { useCallback, useEffect, useState } from "react";

const useLocationInternal = () => {
  const [currentLocation, setCurrentLocation] = useState({
    pathname: window.location.pathname,
    hash: window.location.hash,
  });

  const onLocationChange = useCallback(() => {
    setCurrentLocation({
      pathname: window.location.pathname,
      hash: window.location.hash,
    });
  }, []);

  useEffect(() => {
    window.addEventListener("popstate", onLocationChange);

    return () => {
      window.removeEventListener("popstate", onLocationChange);
    };
  }, [onLocationChange]);

  return currentLocation;
};

export default useLocationInternal;
