import "../../styles/header.css";
import DisplayPopup from "./DisplayPopup";

import PropTypes from "prop-types";

const Header = ({ sortStateValue, onSortStateChange }) => {
  return (
    <div className="header__root">
      {/* <h3 className="header__title">Kanban Board</h3> */}
      <DisplayPopup
        sortStateValue={sortStateValue}
        onSortStateChange={onSortStateChange}
      />
    </div>
  );
};

Header.propTypes = {
  sortStateValue: PropTypes.shape({
    grouping: PropTypes.string.isRequired,
    ordering: PropTypes.string.isRequired,
  }),
  onSortStateChange: PropTypes.func.isRequired,
};

export default Header;
