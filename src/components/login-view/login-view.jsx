import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Styling
import './login-view.scss';
import { Col, Row, Form, Button, Card } from 'react-bootstrap';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    // Send request to server for auth
    props.onLoggedIn(username);
  }

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
            <Form className="login">
              <Form.Group controlId="username">
                <Form.Label className="form-label">
                  Username:
                  <Form.Control type="text" name="username" value={username} autoComplete="username" onChange={e => setUsername(e.target.value)}/>
                </Form.Label>
              </Form.Group>

              <Form.Group controlId="password">
                <Form.Label className="form-label">
                  Password:
                  <Form.Control type="password" name="password" value={password} autoComplete="current-password" onChange={e => setPassword(e.target.value)}/>
                </Form.Label>
              </Form.Group>

              <Button variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>
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