import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Col, Nav, Navbar, NavDropdown, Row } from 'react-bootstrap';

import { userLogout } from '../../actions/actions';

export default function ChickenNavbar({ logout, user }){
  return (
    <Row>
      <Col>
        <Navbar bg="light" expand="lg" sticky="top">
          <Navbar.Brand>Chicken Picker</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link href="/" >Home</Nav.Link>
              {
                Object.keys(user).length !== 0
                ? <Nav.Link href="/profile">Profile</Nav.Link>
                : <Nav.Link href="/login">Login</Nav.Link>
              }
              {
                Object.keys(user).length !== 0 &&
                <Nav.Link href="#" onClick={()=>logout()}>Logout</Nav.Link>
              }
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Col>
    </Row>
  )
}

const mapStateToProps = state => {
  return { 
    user: state.user,
  }
}

export default connect(mapStateToProps)(ChickenNavbar);

ChickenNavbar.propTypes = {
  logout: PropTypes.func.isRequired,
};