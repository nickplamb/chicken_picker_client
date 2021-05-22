import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';


// Styling
import './login-view.scss';
import { Col, Row, Form, Button, Card } from 'react-bootstrap';

const baseURL = 'https://chickens-api.herokuapp.com'

const loginFieldState = {
  value: "",
  valid: true,
  typeMismatch: false,
  errMsg: ""
}

export function LoginView(props) {
  const [ loginState, setLoginState ] = useState({
    email: {
      ...loginFieldState, 
      fieldName: 'email', 
      required: true,
      requiredTxt: 'Email is required',
      formatErrorTxt: 'Incorrect email format',
    },
    password: {
      ...loginFieldState,
      fieldName: 'password', 
      required: true, 
      requiredTxt: 'Password is required'
    },
    allFieldsValid: false,
  });

  //Login validation
  reduceFormValues = formElements => {
    const arrElements = Array.prototype.slice.call(formElements); 
    const formValues = arrElements
      .filter(elem => elem.name.length > 0)
      .map(x => {
        const { typeMismatch } = x.validity;
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

  checkAllFieldsValid = (formValues) => {
    return !Object.keys(formValues)
    .map(x => formValues[x])
    .some(field => !field.valid);
  };

  onSubmit = e => {
    e.preventDefault();
    const form = e.target;
    const formValues = reduceFormValues(form.elements);
    const allFieldsValid = checkAllFieldsValid(formValues);

    // Send request to server for auth
      axios.post(`${baseURL}/login`, {
        email: formValues.email.value,
        password: formValues.password.value,
      })
      .then(res => {
        const data = res.data;
        props.onLoggedIn(data);
      })
      .catch(err => {
        console.log(`${err}: no such user`)
      }); 

    setLoginState({ ...formValues, allFieldsValid }); //we set the state based on the extracted values from Constraint Validation API
  };

  const ErrorValidationLabel = ({ txtLbl, htmlFor }) => (
    <label htmlFor={htmlFor} style={{ color: "red" }}>
      {txtLbl}
    </label>
  );

  const renderEmailValidationError = loginState.email.valid ? "" : <ErrorValidationLabel txtLbl={loginState.email.typeMismatch ? loginState.email.formatErrorTxt : loginState.email.requiredTxt} htmlFor="email"/>;
  const renderPasswordValidationError = loginState.password.valid ? "" : <ErrorValidationLabel txtLbl={loginState.password.requiredTxt} htmlFor="password"/>;

  const handleRegister = (e) => {
    e.preventDefault();
    console.log('Going to Register!');
    props.onGoRegister();
  }

  return (
    <Row className="justify-content-md-center">
      <Col md={8}>
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
                  // value={loginState.email.value} 
                  autoComplete="username" 
                  placeholder="Email"
                  // onChange={e => setEmail(e.target.value)}
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
                  // value={loginState.password.value} 
                  autoComplete="current-password" 
                  placeholder="Password"
                  // onChange={e => setPassword(e.target.value)}
                  required
                />
                {renderPasswordValidationError}
              </Form.Group>

              <Button className="mr-3" variant="primary" type="submit" >Submit</Button> 
              {/* onClick={handleSubmit} */}
              <Button variant="info" type="button" onClick={handleRegister}>Register</Button>
            </Form>

          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
  onGoRegister: PropTypes.func.isRequired,
};