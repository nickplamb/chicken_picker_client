import React from 'react';
import PropTypes from 'prop-types';

export default function ErrorValidationLabel ({ labelTxt, htmlFor }){
  return (
    <label htmlFor={htmlFor} style={{ color: "red" }}>
      {labelTxt}
    </label>)
};

ErrorValidationLabel.propTypes = {
  labelTxt: PropTypes.string.isRequired,
  htmlFor: PropTypes.string.isRequired,
};