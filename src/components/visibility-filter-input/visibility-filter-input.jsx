import React from 'react';
import { connect } from 'react-redux';

import { Form } from 'react-bootstrap';

import { setFilter } from '../../actions/actions';

function VisibilityFilterInput({ setFilter, visibilityFilter }) {
  return <Form.Control 
    onChange={ e=> setFilter(e.target.value) }
    value={ visibilityFilter }
    placeholder="Filter"
  />;
}

export default connect(null, { setFilter })(VisibilityFilterInput);