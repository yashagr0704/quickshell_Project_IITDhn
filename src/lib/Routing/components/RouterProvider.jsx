import { createContext, useMemo } from "react";
import useLocationInternal from "../hooks/useLocationInternal";
import { findDuplicates } from "../../../helpers/array.helpers";
import PropTypes from "prop-types";

export const RouterContext = createContext({
  location: {
    pathname: window.location.pathname,
    hash: window.location.hash,
  },
  searchParams: new URLSearchParams(window.location.search),
});

const RouterProvider = ({ routes = [], PageNotFoundElement = () => null }) => {
  const currentLocation = useLocationInternal();

  const duplicateElements = useMemo(() => {
    return findDuplicates(routes.map((child) => child.path));
  }, [routes]);

  if (duplicateElements.length >= 1) {
    throw new Error(
      `Routing Error: A error ocurred in <RouterProvider/> component! Duplicate paths found: ${duplicateElements.join(
        ", "
      )}`
    );
  }

  const searchParams = useMemo(
    () => new URLSearchParams(window.location.search),
    []
  );

  const matchingRoute = useMemo(() => {
    return routes.find((route) => route.path === currentLocation.pathname);
  }, [routes, currentLocation.pathname]);

  return (
    <RouterContext.Provider
      value={{
        location: currentLocation,
        searchParams: searchParams,
      }}
    >
      {matchingRoute ? matchingRoute.Element : <PageNotFoundElement />}
    </RouterContext.Provider>
  );
};

RouterProvider.propTypes = {
  PageNotFoundElement: PropTypes.func,
  routes: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      Element: PropTypes.node.isRequired,
    })
  ),
};

export default RouterProvider;
