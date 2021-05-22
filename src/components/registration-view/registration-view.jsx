import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Form, Button, Row, Col, Card } from 'react-bootstrap';
// Styling
import './registration-view.scss';



export function RegistrationView({ onRegistration }) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ birthday, setBirthday ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthday);
    // Send request to server
    onRegistration(username);
  }

  return (
    <Row className="justify-content-md-center">
      <Col md={8}>
        <Card>
          <Card.Header>
            Register
          </Card.Header>
          <Card.Body>
            <Form className="register-form">
              <Form.Group controlId="username">
                <Form.Label>
                  Username:
                  <Form.Control type="text" name="username" id="username" value={username} onChange={e => setUsername(e.target.value)}/>
                </Form.Label>
              </Form.Group>

              <Form.Group controlId="email">
                <Form.Label>
                  Email:
                  <Form.Control type="email" name="email" id="email" value={email} onChange={e => setEmail(e.target.value)}/>
                </Form.Label>
              </Form.Group>

              <Form.Group controlId="birthday">
                <Form.Label>
                  Birthday:
                  <Form.Control type="birthday" name="birthday" id="birthday" value={birthday} onChange={e => setBirthday(e.target.value)}/>
                </Form.Label>
              </Form.Group>

              <Form.Group controlId="password">
                <Form.Label>
                  Password:
                  <Form.Control type="password" name="password" id="password" value={password} onChange={e => setPassword(e.target.value)}/>
                </Form.Label>
              </Form.Group>

              <Button type="submit" onClick={handleSubmit}>Submit</Button>

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