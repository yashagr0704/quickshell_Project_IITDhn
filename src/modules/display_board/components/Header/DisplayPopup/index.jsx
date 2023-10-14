import { useCallback, useRef, useState } from "react";

import StyledSelect from "components/form_elements/StyledSelect";

import settingsIcon from "assets/icons/settings_icon.svg";
import expandIcon from "assets/icons/expand_icon.svg";

import "modules/display_board/styles/header.css";

import PropTypes from "prop-types";
import {
  gropingDropdown,
  orderingDropdown,
} from "modules/display_board/constants/sorting.constants";

const DisplayPopup = ({ sortStateValue, onSortStateChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDebounced, setIsOpenDebounced] = useState(false);

  const buttonRef = useRef(null);

  const expandIconStyle = {
    transition: "250ms ease-in-out",
    transform: `rotate(${isOpen ? "0deg" : "180deg"})`,
    marginTop: isOpen ? 0.5 : -0.5,
    marginBottom: isOpen ? -0.5 : 0,
    marginLeft: "-3px",
  };

  const displayPopupContentStyle = {
    top:
      buttonRef?.current?.offsetTop + buttonRef?.current?.offsetHeight + 10 ||
      0,
    left: buttonRef?.current?.offsetLeft, // this when the popup is on the left
    // right:
    //   window.innerWidth -
    //   buttonRef?.current?.offsetLeft -
    //   buttonRef?.current?.offsetWidth, // this when the popup is on the right
    animation: `${
      isOpen ? "slideIn" : "slideOut"
    } 0.5s ease-in-out 0s 1 normal forwards running`,
  };

  const handleSortStateChange = useCallback(
    ({ name, value }) => {
      const newSortState = {
        grouping: sortStateValue.grouping,
        ordering: sortStateValue.ordering,
        [name]: value,
      };

      onSortStateChange(newSortState);
    },
    [onSortStateChange, sortStateValue]
  );

  const handleOpen = useCallback(() => {
    setIsOpen(true);
    setIsOpenDebounced(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setTimeout(() => {
      setIsOpenDebounced(false);
    }, 500);
  }, []);

  return (
    <>
      <button
        type="button"
        className={`displayPopupBtn__root ${isOpen ? "open" : ""}`}
        onClick={handleOpen}
        ref={buttonRef}
      >
        <img src={settingsIcon} alt="sorting icon" />
        <span className="displayPopupBtn__text">Display</span>
        <img src={expandIcon} style={expandIconStyle} alt="expand icon" />
      </button>

      {isOpenDebounced ? (
        <div className={`displayPopup__root ${isOpen ? "open" : ""}`}>
          <div className="displayPopup__backdrop" onClick={handleClose} />
          <div
            className="displayPopup__content"
            style={displayPopupContentStyle}
          >
            <div className="displayPopup__contentRow">
              <label htmlFor="groping" className="displayPopup__contentLabel">
                Groping
              </label>

              <StyledSelect
                name="grouping"
                id="grouping"
                options={gropingDropdown}
                value={sortStateValue.grouping}
                onChange={handleSortStateChange}
              />
            </div>
            <div className="displayPopup__contentRow">
              <label htmlFor="" className="displayPopup__contentLabel">
                Ordering
              </label>
              <StyledSelect
                name="ordering"
                id="ordering"
                options={orderingDropdown}
                value={sortStateValue.ordering}
                onChange={handleSortStateChange}
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

DisplayPopup.propTypes = {
  sortStateValue: PropTypes.shape({
    grouping: PropTypes.string.isRequired,
    ordering: PropTypes.string.isRequired,
  }),
  onSortStateChange: PropTypes.func.isRequired,
};

export default DisplayPopup;
