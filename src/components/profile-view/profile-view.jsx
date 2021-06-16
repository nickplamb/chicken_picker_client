import React, {useState, useEffect} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Col, Image, Form, Button, Modal} from 'react-bootstrap';

import './profile-view.scss';

// Custom Components
import ErrorValidationLabel from '../helperComponents/formError';
import { MultiBreedView } from '../multi-breed-view/multi-breed-view';
import { ColoredLine } from '../helperComponents/colored-line';

const Frankie =  require('url:../../../assets/frankie2.jpeg');

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

export function ProfileView({ username, userEmail, token, userFavorites, onBackClick }) {
  const [showModal, setShowModal] = useState(false);
  const [ registrationState, setRegistrationState ] = useState({
    username: {
      ...defaultFieldState,
      fieldName: 'username', 
      requiredTxt: 'Username is required',
      formatErrorTxt: 'Username can only contain letter and numbers',
      minLengthErrorTxt: 'Username must be at least 5 characters.',
    },
    // email: {
    //   ...defaultFieldState, 
    //   fieldName: 'email', 
    //   required: true,
    //   requiredTxt: 'Email is required',
    //   formatErrorTxt: 'Incorrect email format',
    // },
    password: {
      ...defaultFieldState,
      fieldName: 'password', 
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

  checkAllFieldsValid = formValues => {
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
      let data = {}
      formValues.birthday.value && (data.birthday = formValues.birthday.value);
      formValues.password.value && (data.password = formValues.password.value);
      formValues.username.value && (data.username = formValues.username.value);

      axios.put(`${baseURL}/users`, data , {
        headers: {Authorization: `Bearer ${token}`}
      })
      .then(res => {
        const data = res.data;
        console.log(data);
        localStorage.setItem('userEmail', data.email);
        localStorage.setItem('username', data.username);
        window.open('/profile', '_self');
      })
      .catch(err => {
        console.log(err.response.data); //  ADD text to setRegistrationState({})
        console.log(err);
        // if (err.status === 409){
        //   formValues.email.errMsg = err.response.data;
        //   formValues.email.errMsg = false;
        //   // setRegistrationState({
          //   ...registrationState,
          //   email: {
          //     ...registrationState.email,
          //     errMsg: err.response.data,
          //     valid: false
          //   }
          // })
        // }
      }); 
    }
        // formValues[err.params].errMsg = err.response.data;
        // err.response.data.errors.map(error => {
          //   console.log(error)
          //   let errorField = error.params;
          //   let errorMsg = error.msg;
          //   setRegistrationState({
          //     ...registrationState,
          //     [errorField]: {
          //       ...registrationState[errorField],
          //       errMsg: errorMsg,
          //       valid: false
          //     }
          //   })
          // }) 

    setRegistrationState({ ...formValues, allFieldsValid }); //we set the state based on the extracted values from Constraint Validation API
  };

  const validationErrorsMsg = (field) => {
    if (registrationState[field].errMsg) {
      console.log(registrationState[field].errMsg);
    }
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
  // const renderEmailValidationError = registrationState.email.valid ? "" : <ErrorValidationLabel labelTxt={validationErrorsMsg('email')} htmlFor="email"/>;
  const renderPasswordValidationError = registrationState.password.valid ? "" : <ErrorValidationLabel labelTxt={validationErrorsMsg('password')} htmlFor="password"/>;;

  // Modal functions
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  onDeregister =() => {
    handleCloseModal();

    console.log("Account deleted")
  }

  return (
    <>
      <Col xs={12}>
        <h1>Hello {username}!</h1>
      </Col>
      <Col md={6}>
        <Form 
          className="profile-update-form"
          onSubmit={onSubmit} 
          noValidate
          // validated={registrationState.allFieldsValid}
          >
          <Form.Group controlId="username">
            <Form.Row>
              <Form.Label column >Username:</Form.Label>
              <Col xs={9}>
                <Form.Control 
                  type="text" 
                  name="username"
                  placeholder={username}
                  pattern="[\w\d]*"
                  minLength="5"
                  autoComplete="off"
                />
                <Form.Text className="text-muted">
                  Minimum 5 characters and can contain only letters and numbers.
                </Form.Text>
                {renderUsernameValidationError}
              </Col>
            </Form.Row>
          </Form.Group>

          {/* <Form.Group controlId="email">
            <Form.Label>Email:</Form.Label>
            <Form.Control 
              type="email" 
              name="email"
              placeholder={userEmail}
              required
            />
            {renderEmailValidationError}
          </Form.Group> */}

          <Form.Group controlId="birthday">
            <Form.Row>
              <Form.Label column >Birthday:</Form.Label>
              <Col xs={9}>
                <Form.Control 
                  type="date" 
                  name="birthday"
                  placeholder="birthday"
                  />
              </Col>
            </Form.Row>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Row>
              <Form.Label column >Password:</Form.Label>
              <Col xs={9}>
                <Form.Control 
                  type="password" 
                  name="password"
                  placeholder="Password"
                  minLength="10"
                  autoComplete="off"
                />
                <Form.Text className="text-muted">
                  Password must be at least 10 characters in length.
                </Form.Text>
                {renderPasswordValidationError}
              </Col>
            </Form.Row>
          </Form.Group>

          <Button type="submit">Update</Button>

        </Form>
      </Col>
      <Col md={6}>
        <Button variant="warning" onClick={handleShowModal}>Delete Account</Button>
      </Col>
      <Col xs={12}>
        <ColoredLine color="grey"/>
      </Col>
      <Col xs={12}>
        <h3>Your Favorite Breeds</h3>
      </Col>
      <MultiBreedView breeds={userFavorites}/>

      <Modal 
        show={showModal}
        onHide={handleCloseModal}
        centered
        aria-labelledby="confirm-deregister-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title id="confirm-deregister-modal">
            Delete Account?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Are you sure?</h4>
          <p>This action is permanent and cannot be undone.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="danger" onClick={onDeregister}>
            Permanently Delete Account
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

ProfileView.propTypes = {
  username: PropTypes.string.isRequired,
  userEmail: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  userFavorites: PropTypes.array.isRequired,
  onBackClick: PropTypes.func.isRequired
};
