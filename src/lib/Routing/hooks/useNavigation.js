import { useCallback } from "react";

const useNavigation = () => {
  const push = useCallback((path) => {
    // update url
    window.history.pushState({}, "", path);

    // communicate to Routes that URL has changed
    const navEvent = new PopStateEvent("popstate");
    window.dispatchEvent(navEvent);
  }, []);

  const replace = useCallback((path) => {
    // update url
    window.history.replaceState({}, "", path);

    // communicate to Routes that URL has changed
    const navEvent = new PopStateEvent("popstate");
    window.dispatchEvent(navEvent);
  }, []);

  const back = useCallback(() => {
    // update url
    window.history.back();

    // communicate to Routes that URL has changed
    const navEvent = new PopStateEvent("popstate");
    window.dispatchEvent(navEvent);
  }, []);

  const forward = useCallback(() => {
    // update url
    window.history.forward();

    // communicate to Routes that URL has changed
    const navEvent = new PopStateEvent("popstate");
    window.dispatchEvent(navEvent);
  }, []);

  return {
    push,
    replace,
    back,
    forward,
  };
};

export default useNavigation;
