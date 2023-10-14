import "./styles.css";

import PropTypes from "prop-types";

const StyledSelect = ({
  className,
  value,
  options,
  name,
  onChange,
  ...props
}) => {
  return (
    <>
      <select
        className={"styledSelect__root " + className}
        onChange={(event) => onChange({ name, value: event.target.value })}
        value={value}
        {...props}
      >
        {options.map((option) => (
          <option
            className="styledSelect__option"
            value={option.value}
            key={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </>
  );
};

StyledSelect.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default StyledSelect;
