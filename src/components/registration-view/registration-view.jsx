import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

// Bootstrap
import { Form, Button, Col, Card } from 'react-bootstrap';

// Custom Components
import ErrorValidationLabel from '../helperComponents/form-error';

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

export default function RegistrationView({ onLoggedIn }) {
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
  const [status409Returned, setStatus409Returned] = useState({errorWasReturned: false, msg: ''})

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
        const { fieldName, requiredTxt, formatErrorTxt, minLengthErrorTxt, errMsg } = registrationState[currVal.name]; //get the rest of properties inside the state object
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
          minLengthErrorTxt,
          errMsg
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
    setStatus409Returned({
      ...status409Returned,
      errorWasReturned: false
    })

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
        // console.log(data);
        window.open('/login', '_self');
        // onLoggedIn(data)
      })
      .catch(err => {
        console.log(err);
        if (err.response.status === 409) {
          setStatus409Returned({
            errorWasReturned: true,
            msg: err.response.data
          });
        }
      }); 
    }

    setRegistrationState({ ...formValues, allFieldsValid }); //we set the state based on the extracted values from Constraint Validation API
  };

  const clientValidationErrorsMsg = (field) => {
    if (registrationState[field].errMsg) {
      console.log(registrationState[field].errMsg);
    }
    if (registrationState[field].valueMissing) {
      return (registrationState[field].requiredTxt);
    }
    if (registrationState[field].tooShort) {
      return (registrationState[field].minLengthErrorTxt);
    }
    if (registrationState[field].patternMismatch || registrationState[field].typeMismatch) {
      return (registrationState[field].formatErrorTxt);
    }
  }

  const handleEmailErrorText = (field) => {
    // client side validation ok and no server error 409, then return empty string.
    if (registrationState.email.valid && !status409Returned.errorWasReturned) return "";
    
    // populate proper client side error messages
    let errorLabelText = clientValidationErrorsMsg(field);

    // overwrite if there is a server side 409 error.
    if (status409Returned.errorWasReturned) {
      errorLabelText = status409Returned.msg;
    }

    return <ErrorValidationLabel labelTxt={ errorLabelText } htmlFor="email"/>;
  }

  // display error msg based on valid property in state.
  const renderEmailValidationError = handleEmailErrorText('email');
  const renderUsernameValidationError = registrationState.username.valid ? "" : <ErrorValidationLabel labelTxt={clientValidationErrorsMsg('username')} htmlFor="username"/>;
  const renderPasswordValidationError = registrationState.password.valid ? "" : <ErrorValidationLabel labelTxt={clientValidationErrorsMsg('password')} htmlFor="password"/>;;

  return (
      <Col md={10} lg={8} >
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
  );
}

RegistrationView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
};