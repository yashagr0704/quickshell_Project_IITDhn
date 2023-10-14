import { useContext } from "react";
import { RouterContext } from "../components/RouterProvider";

const useLocation = () => {
  const routerState = useContext(RouterContext);

  return {
    pathname: routerState.location.pathname,
    hash: routerState.location.hash,
  };
};

export default useLocation;
