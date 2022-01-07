import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Col, Form, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// Custom components
import ErrorValidationLabel from '../helperComponents/form-error';

// Styling
import './login-view.scss';

const baseURL = 'https://chickens-api.herokuapp.com';

// state fields that are not unique.
const loginFieldState = {
  value: "",
  valid: true,
  typeMismatch: false,
  errMsg: "",
  required: true,
}

export default function LoginView({ onLoggedIn }) {
  const [ loginState, setLoginState ] = useState({
    email: {
      ...loginFieldState, 
      fieldName: 'email', 
      requiredTxt: 'Email is required',
      formatErrorTxt: 'Incorrect Email Format',
    },
    password: {
      ...loginFieldState,
      fieldName: 'password', 
      requiredTxt: 'Password is Required'
    },
    allFieldsValid: false,
  });
  const [status400Returned, setStatus400Returned] = useState(false)

  //Login validation
   const reduceFormValues = formElements => {
    const arrElements = Array.prototype.slice.call(formElements); 
    const formValues = arrElements
      .filter(elem => elem.name.length > 0) // filter out non-input elements.
      .map(x => {
        const { typeMismatch } = x.validity; // .validity is part of constraint API
        const { name, type, value } = x;
        return {
          name,
          type,
          typeMismatch, //we use typeMismatch when format is incorrect(e.g. incorrect email)
          value,
          valid: x.checkValidity()
        };
      })
      .reduce((acc, currVal) => { //then we finally use reduce, ready to put it in our state
        const { value, valid, typeMismatch } = currVal;
        const { fieldName, requiredTxt, formatErrorTxt } = loginState[currVal.name]; //get the rest of properties inside the state object
        //we'll need to map these properties back to state so we use reducer...
        acc[currVal.name] = {
          value,
          valid,
          typeMismatch,
          fieldName,
          requiredTxt,
          formatErrorTxt
        };
        return acc;
      }, {});
      return formValues;
  }

  const checkAllFieldsValid = (formValues) => {
    return !Object.keys(formValues)
    .map(x => formValues[x])
    .some(field => !field.valid); // check the .valid property for each reduced element.
  };

  const onSubmit = e => {
    e.preventDefault();
    const form = e.target;
    const formValues = reduceFormValues(form.elements);
    const allFieldsValid = checkAllFieldsValid(formValues);
    setStatus400Returned(false);

    // Send request to server for auth only if all fields are valid.
    if (allFieldsValid) {
      axios.post(`${baseURL}/login`, {
        email: formValues.email.value,
        password: formValues.password.value,
      })
      .then(res => {
        const data = res.data;
        // console.log(data);
        onLoggedIn(data);
      })
      .catch(err => {
        if (err.response.status === 400) { 
          setStatus400Returned(true);
        }
      }); 
    }

    setLoginState({ ...formValues, allFieldsValid }); //we set the state based on the extracted values from Constraint Validation API
  };

  function handleEmailErrorText() {
    if (loginState.email.valid && !status400Returned) return "";

    let errorLabelText =  loginState.email.requiredTxt;

    if (loginState.email.typeMismatch) {
      errorLabelText = loginState.email.formatErrorTxt
    }

    if (status400Returned) {
      errorLabelText = 'Incorrect Email or Password'
    }

    return <ErrorValidationLabel labelTxt={ errorLabelText } htmlFor="email"/>;
  }

  // display error msg based on valid property in state.
  const renderEmailValidationError = handleEmailErrorText()

  const renderPasswordValidationError = loginState.password.valid ? "" : <ErrorValidationLabel labelTxt={loginState.password.requiredTxt} htmlFor="password"/>;

  return (
      <Col md={10} lg={8}>
        <Card>
          <Card.Header as="h1">
              Login
          </Card.Header>
          <Card.Body>
            <Form 
              className="login" 
              onSubmit={onSubmit} 
              noValidate
              validated={loginState.allFieldsValid}
              >
              <Form.Group controlId="email">
                <Form.Label className="form-label">
                  Email:
                </Form.Label>
                <Form.Control 
                  type="email" 
                  name="email" 
                  autoComplete="username" 
                  placeholder="Email"
                  required
                  />
                  
                {renderEmailValidationError}
              </Form.Group>

              <Form.Group controlId="password">
                <Form.Label className="form-label">
                  Password:
                </Form.Label>
                <Form.Control 
                  type="password" 
                  name="password" 
                  autoComplete="current-password" 
                  placeholder="Password"
                  required
                />
                {renderPasswordValidationError}
              </Form.Group>

              <Button className="mr-3" variant="primary" type="submit" >Submit</Button> 
              <Link to={'/register'}>
                <Button variant="info" type="button">Register</Button>
              </Link>
            </Form>

          </Card.Body>
        </Card>
      </Col>
  );
}

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
};