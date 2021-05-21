import React from 'react';
import PropTypes from 'prop-types';

// Styling
import './breed-view.scss';
import { Button, Card } from 'react-bootstrap';

const Frankie =  require('url:../../../assets/frankie2.jpeg');

export class BreedView extends React.Component {

  render() {
    const { breed, onBackClick } = this.props;

    return (
      <Card>
        <Card.Header>
          <h1>
            {breed.breed}
          </h1>
        </Card.Header>
        <Card.Body>
          <Card.Img variant="top" src={Frankie} alt="a photo of a chicken"/>
          <Card.Text>
            <p>
              <span className="label">APA Class: </span>
              <span className="value">{breed.apaClass.name}</span>
            </p>
            <p>
              <span className="label">Egg Color: </span>
              <span className="value">{breed.eggColor}</span>
            </p>
            <p>
              <span className="label">Egg Size: </span>
              <span className="value">{breed.eggSize}</span>
            </p>
          </Card.Text>
          <Button onClick={() => onBackClick(null)}>Back</Button>
        </Card.Body>

      </Card>
      // <div className="breed-view">
      //   <div className="breed-image">
      //     <img src={Frankie} alt="a photo of a chicken"/>
      //   </div>
      //   <div className="breed-name">
      //     <span className="label">Breed: </span>
      //     <span className="value">{breed.breed}</span>
      //   </div>
      //   <div className="breed-class">
          
      //   </div>
      //   <button onClick={() => onBackClick(null)} >Back</button>
      // </div>
    );
  }
}

BreedView.propTypes = {
  breed: PropTypes.shape({
    breed: PropTypes.string.isRequired,
    eggColor: PropTypes.string.isRequired,
    eggSize: PropTypes.string
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};