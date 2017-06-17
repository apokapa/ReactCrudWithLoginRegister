import React, {PropTypes} from 'react';


//Presentaion component....
//Input component for numbers
//ToDo add number formating
const NumericInput = ({name, label, onChange, placeholder, value, error}) => {
  let wrapperClass = 'form-group';
  if (error && error.length > 0) {
    wrapperClass += " " + 'has-error';
  }

  return (
    <div className={wrapperClass}>
      <label htmlFor={name}>{label}</label>
      <div className="field">
        <input
          type="number"
          name={name}
          className="form-control"
          placeholder={placeholder}
          pattern="^\d+(?:\.\d{1,2})?$"
          step="0.01"
          min="0"
          value={value}
          onChange={onChange}/>
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </div>
  );
};

NumericInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string
};

export default NumericInput;
