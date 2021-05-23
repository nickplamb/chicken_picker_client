import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

// Bootstrap
import { Form, Button, Row, Col, Card } from 'react-bootstrap';

// Custom Components
import ErrorValidationLabel from '../helperComponents/formError';

// Styling
import './registration-view.scss';

const baseURL = 'https://chickens-api.herokuapp.com';

// state fields that are not unique.
const defaultFieldState = {
  value: "",
  valid: true,
  typeMismatch: false,
  patternMismatch: false,
  tooShort: false,
  valueMissing: false,
  errMsg: "",
}

export function RegistrationView({ onRegistration }) {
  const [ registrationState, setRegistrationState ] = useState({
    username: {
      ...defaultFieldState,
      fieldName: 'username', 
      required: true,
      requiredTxt: 'Username is required',
      formatErrorTxt: 'Username can only contain letter and numbers',
      minLengthErrorTxt: 'Username must be at least 5 characters.',
    },
    email: {
      ...defaultFieldState, 
      fieldName: 'email', 
      required: true,
      requiredTxt: 'Email is required',
      formatErrorTxt: 'Incorrect email format',
    },
    password: {
      ...defaultFieldState,
      fieldName: 'password', 
      required: true,
      requiredTxt: 'Password is required',
      minLengthErrorTxt: 'Password must be at least 10 characters.',
    },
    birthday: {
      ...defaultFieldState,
      fieldName: 'birthday', 
    },
    allFieldsValid: false,
  });

  //Login validation
  reduceFormValues = formElements => {
    const arrElements = Array.prototype.slice.call(formElements); 
    const formValues = arrElements
      .filter(elem => elem.name.length > 0) // filter out non-input elements.
      .map(x => {
        const { typeMismatch, patternMismatch, tooShort, valueMissing } = x.validity; // .validity is part of constraint API
        const { name, type, value } = x;
        return {
          name,
          type,
          typeMismatch, // typeMismatch for incorrect format(e.g. incorrect email)
          patternMismatch, // patternMismatch for not matching regex in pattern attribute
          tooShort, // tooShort for being under minLength attribute
          valueMissing, // value missing for blank input, only works with required inputs.
          value,
          valid: x.checkValidity()
        };
      })
      .reduce((acc, currVal) => { // consolidate properties to single object with reduce.
        const { value, valid, typeMismatch, patternMismatch, tooShort, valueMissing } = currVal; // get properties from input
        const { fieldName, requiredTxt, formatErrorTxt, minLengthErrorTxt } = registrationState[currVal.name]; //get the rest of properties inside the state object
        acc[currVal.name] = {
          value,
          valid,
          typeMismatch,
          patternMismatch,
          tooShort,
          valueMissing,
          fieldName,
          requiredTxt,
          formatErrorTxt,
          minLengthErrorTxt
        };
        return acc;
      }, {});
      return formValues;
  }

  checkAllFieldsValid = (formValues) => {
    return !Object.keys(formValues) // highest nested keys, ie. email, username etc.
    .map(x => formValues[x])
    .some(field => !field.valid); // check the .valid property for each reduced element. match any non valid
  };

  onSubmit = e => {
    e.preventDefault();
    const form = e.target;
    const formValues = reduceFormValues(form.elements);
    const allFieldsValid = checkAllFieldsValid(formValues);

    // Send request to server for auth only if all fields are valid.
    if (allFieldsValid) {
      axios.post(`${baseURL}/users`, {
        email: formValues.email.value,
        password: formValues.password.value,
        birthday: formValues.birthday.value, // (formValues.birthday.value ? formValues.birthday.value : null)
        username: formValues.username.value,
      })
      .then(res => {
        const data = res.data;
        console.log('res data')
        console.log(data)
        onRegistration(data);
      })
      .catch(err => {
        console.log(err.response.data) //  ADD text to setRegistrationState({})
        err.response.data.errors.map(error => {
          console.log(error)
          let errorField = error.params;
          let errorMsg = error.msg;
          setRegistrationState({
            ...registrationState,
            [errorField]: {
              ...registrationState[errorField],
              errMsg: errorMsg,
              valid: false
            }
          })
        })
      }); 
    }

    setRegistrationState({ ...formValues, allFieldsValid }); //we set the state based on the extracted values from Constraint Validation API
  };

  const validationErrorsMsg = (field) => {
    if (registrationState[field].valueMissing) {
      return (registrationState[field].requiredTxt);
    }
    if (registrationState[field].tooShort) {
      return (registrationState[field].minLengthErrorTxt);
    }
    if (registrationState[field].patternMismatch) {
      return (registrationState[field].formatErrorTxt);
    }
  }

  // display error msg based on valid property in state.
  const renderUsernameValidationError = registrationState.username.valid ? "" : <ErrorValidationLabel labelTxt={validationErrorsMsg('username')} htmlFor="username"/>;
  const renderEmailValidationError = registrationState.email.valid ? "" : <ErrorValidationLabel labelTxt={validationErrorsMsg('email')} htmlFor="email"/>;
  const renderPasswordValidationError = registrationState.password.valid ? "" : <ErrorValidationLabel labelTxt={validationErrorsMsg('password')} htmlFor="password"/>;;

  return (
    <Row className="justify-content-md-center">
      <Col md={8}>
        <Card>
          <Card.Header>
            Register
          </Card.Header>
          <Card.Body>
            <Form 
              className="register-form"
              onSubmit={onSubmit} 
              noValidate
              validated={registrationState.allFieldsValid}
              >
              <Form.Group controlId="username">
                <Form.Label>Username:</Form.Label>
                <Form.Control 
                  type="text" 
                  name="username"
                  placeholder="Username"
                  pattern="[\w\d]*"
                  minLength="5"
                  required
                />
                <Form.Text className="text-muted">
                  Minimum 5 characters and can contain only letters and numbers.
                </Form.Text>
                {renderUsernameValidationError}
              </Form.Group>

              <Form.Group controlId="email">
                <Form.Label>Email:</Form.Label>
                <Form.Control 
                  type="email" 
                  name="email"
                  placeholder="Email"
                  required
                />
                {renderEmailValidationError}
              </Form.Group>

              <Form.Group controlId="birthday">
                <Form.Label>Birthday:</Form.Label>
                <Form.Control 
                  type="date" 
                  name="birthday"
                  placeholder="birthday"
                />
              </Form.Group>

              <Form.Group controlId="password">
                <Form.Label>Password:</Form.Label>
                <Form.Control 
                  type="password" 
                  name="password"
                  placeholder="Password"
                  minLength="10"
                  required
                />
                <Form.Text className="text-muted">
                  Password must be at least 10 characters in length.
                </Form.Text>
                {renderPasswordValidationError}
              </Form.Group>

              <Button type="submit">Submit</Button>

            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

RegistrationView.propTypes = {
  onRegistration: PropTypes.func.isRequired
};