import { useEffect, useReducer, useRef } from "react";

const Action = {
  LOADING: "loading",
  FETCHED: "fetched",
  ERROR: "error",
};

export function useFetch({ url, ...options }) {
  const cache = useRef({});

  // Used to prevent state update if the component is unmounted
  const cancelRequest = useRef(false);

  if (!url) {
    throw new Error("Please provide a URL to fetch data from.");
  }

  const initialState = {
    error: undefined,
    data: undefined,
  };

  // Keep state logic separated
  const fetchReducer = (state, action) => {
    switch (action.type) {
      case Action.LOADING:
        return { ...initialState };
      case Action.FETCHED:
        return { ...initialState, data: action.payload };
      case Action.ERROR:
        return { ...initialState, error: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {
    cancelRequest.current = false;

    let controller = new AbortController();

    const fetchData = async () => {
      dispatch({ type: Action.LOADING });

      // If a cache exists for this url, return it
      if (cache.current[url]) {
        dispatch({ type: Action.FETCHED, payload: cache.current[url] });
        return;
      }

      try {
        const response = await fetch(url, {
          ...options,
          defaultData: undefined,
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const data = await response.json();
        cache.current[url] = data;

        if (cancelRequest.current) {
          return;
        }

        dispatch({ type: Action.FETCHED, payload: data });
      } catch (error) {
        if (cancelRequest.current) {
          return;
        }

        dispatch({ type: Action.ERROR, payload: error });
      }
    };

    fetchData();

    // Use the cleanup function for avoiding a possibly...
    // ...state update after the component was unmounted
    return () => {
      cancelRequest.current = true;
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return {
    data: state?.data ?? options?.defaultData,
    error: state?.error,
    isLoading: !state.data && !state.error,
    isError: Boolean(state.error),
    isSuccess: Boolean(state.data),
  };
}
