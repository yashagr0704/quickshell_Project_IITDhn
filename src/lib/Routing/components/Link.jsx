import { useCallback } from "react";

import PropTypes from "prop-types";

const Link = ({ to, children }) => {
  if (!to.startsWith("/")) {
    throw new Error(
      'Routing Error: A error ocurred in <Link/> component! "To" prop must start with a /'
    );
  }

  const handleClick = useCallback(
    (event) => {
      // if ctrl or meta key are held on click, allow default behavior of opening link in new tab
      if (event.metaKey || event.ctrlKey) {
        return;
      }

      // prevent full page reload
      event.preventDefault();

      // update url
      window.history.pushState({}, "", to);

      // communicate to Routes that URL has changed
      const navEvent = new PopStateEvent("popstate");
      window.dispatchEvent(navEvent);
    },
    [to]
  );

  return (
    <a href={to} onClick={handleClick}>
      {children}
    </a>
  );
};

Link.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Link;
