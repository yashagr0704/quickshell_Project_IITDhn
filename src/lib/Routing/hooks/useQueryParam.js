import { useCallback, useContext, useEffect, useState } from "react";
import useLocation from "./useLocation";
import { RouterContext } from "../components/RouterProvider";

const useQueryParam = ({ paramName, paramPlaceholder }) => {
  const routerState = useContext(RouterContext);

  const searchParams = routerState.searchParams;

  const [paramValue, setParamValue] = useState(searchParams.get(paramName));

  const { pathname } = useLocation();

  const setParam = useCallback(
    (value) => {
      if (value !== null) {
        searchParams.set(paramName, value);
      } else {
        searchParams.delete(paramName);
      }

      window.history.pushState(
        {},
        "",
        `${pathname}?${searchParams.toString()}`
      );

      const navEvent = new PopStateEvent("popstate");
      window.dispatchEvent(navEvent);

      setParamValue(value);
    },
    [paramName, pathname, searchParams]
  );

  useEffect(() => {
    if (!paramValue && paramPlaceholder !== undefined) {
      setParam(paramPlaceholder);
    }
  }, [paramName, paramPlaceholder, paramValue, searchParams, setParam]);

  return [paramValue, setParam];
};

export default useQueryParam;
