import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Col } from 'react-bootstrap';
import { upperFirst, toLower } from 'lodash';
import { connect } from 'react-redux';

// Styling
// import './class-view.scss';

import MultiBreedView from '../multi-breed-view/multi-breed-view';
import { ColoredLine } from '../helperComponents/colored-line';
import Frankie from 'url:../../../assets/frankie2.jpeg';
// const Frankie =  require('url:../../../assets/frankie2.jpeg');

// apaClass and onBackClick from parent, rest from state.
export function ClassView({ apaClass, onBackClick, allBreeds}) {

  // Need to put these in DB
  const classDescriptions = {
    "American": "The American Class contains thirteen breeds which originated in Canada or the United States. All are heavy breeds, and most lay brown eggs; most are cold-hardy",
    "Asiatic": "These three breeds originate in China; they are large, feather legged, and lay brown eggs.",
    "Continental": "This group consists of eleven breeds from Belgium, France, Germany, and the Netherlands. They are mostly sprightly birds, the Faverolles being an exception.",
    "All Other Standard Breeds": "Other breeds are grouped in this class, which has three subclasses: Game, Oriental, and Miscellaneous. The Game subclass includes the non-oriental game birds, the Oriental subclass includes mainly birds from Asia; the Cubalaya, however, is from Cuba. The Miscellaneous subclass holds the remaining breeds.",
    "Mediterranean": "These breeds originating in Italy and Spain have white earlobes and tend to be productive layers of white eggs. In general they are flighty, and exceptional free-range birds, with both evasion and foraging skills.",
    "English": "This class consists of five breeds from the United Kingdom and one from Australia.",
    "Not Listed": "There are many breeds not listed in the American Poultry Association's Standards of Perfection."
  };

  const displayClass = upperFirst(apaClass)

  return (
    <>
      <Col md={10}>
        <Card>
          <Card.Header>
            <h1>
              {displayClass}
            </h1>
          </Card.Header>
          <Card.Body>
            <Card.Img variant="top" src={Frankie} alt="a photo of a chicken"/>
            <Card.Text as="div" className="mt-1" >
              {
                apaClass !== "Not Listed" && 
                <p>
                  <span className="label">Class Description: </span>
                </p>
              }
              <p>
                <span className="value">{classDescriptions[apaClass]}</span>
              </p>
              
            </Card.Text>
            <Button onClick={onBackClick}>Back</Button>
          </Card.Body>
        </Card>
      </Col>
      <Col xs={12}>
        <ColoredLine color="grey"/>
      </Col>
      <Col xs={12} mt={2}>
        <h3>
          {
            apaClass === "Not Listed" 
            ? "Other breeds not listed by the APA:"
            : `Breeds in the ${apaClass} class:`
          }
        </h3>
      </Col>

      <MultiBreedView breedsToDisplay={ allBreeds.filter(breed => (toLower(breed.apaClass.name) === toLower(apaClass))) } />
    </>
  );
}

const mapStateToProps = state => {
  return { 
    allBreeds: state.breeds
  }
};

export default connect(mapStateToProps)(ClassView);

ClassView.propTypes = {
  allBreeds: PropTypes.array.isRequired,
  apaClass: PropTypes.string.isRequired,
  onBackClick: PropTypes.func.isRequired
};