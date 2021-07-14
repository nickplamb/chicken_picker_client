import React from 'react';
import { connect } from 'react-redux';

import { Dropdown, DropdownButton } from 'react-bootstrap';

import { setSortOrder } from '../../actions/actions';

import './list-sort-input.scss';

function SortOrderInput({ setSortOrder, sortOrder }) {
  function handleSelect(eventKey) {
    setSortOrder(eventKey)
  }
  return <DropdownButton 
    id="sort-order-dropdown"
    title="Sort"
    onSelect={ handleSelect }
    alignRight={ true }
  >
    <Dropdown.Item eventKey="nameUp">Name A - Z</Dropdown.Item>
    <Dropdown.Item eventKey="nameDown">Name Z - A</Dropdown.Item>
    <Dropdown.Item eventKey="class">APA Class</Dropdown.Item>
    <Dropdown.Item eventKey="purpose">Breed Purpose</Dropdown.Item>
  </DropdownButton>
}

export default connect(null, { setSortOrder })(SortOrderInput);