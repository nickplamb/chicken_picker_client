import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Col } from 'react-bootstrap';
import { split } from 'lodash'
import { Link } from 'react-router-dom';

// Styling
import './breed-view.scss';

// import {
//   ancona,
//   andalusian,
//   australorp,
//   brahma,
//   buckeye,
//   campine,
//   chantecler,
//   cochin,
//   cornish,
//   cubalaya,
//   delaware,
//   dominique,
//   dorking,
//   faverolles,
//   hamburg,
//   holland,
//   houdan,
//   icelandic,
//   java,
//   jerseygiant,
//   lakenvelder,
//   langshan,
//   leghorn,
//   malay,
//   minorca,
//   moderngame,
//   newhampshire,
//   oldenglishgame,
//   phoenix,
//   plymouthrock,
//   polish,
//   redcap,
//   rhodeislandred,
//   rhodeislandwhite,
//   russianorloff,
//   shamo,
//   spanish,
//   spitzhauben,
//   sumatra,
//   sussex,
//   wyandotte,
//   yokohama,
// } from 'url:../../../assets/breed_photos/*.jpg';

// chicken Photos
// import ancona from 'url:../../../assets/breed_photos/ancona.jpg';
// import andalusian from 'url:../../../assets/breed_photos/andalusian.jpg';
// import australorp from 'url:../../../assets/breed_photos/australorp.jpg';
// import brahma from 'url:../../../assets/breed_photos/brahma.jpg';
// import buckeye from 'url:../../../assets/breed_photos/buckeye.jpg';
// import campine from 'url:../../../assets/breed_photos/campine.jpg';
// import chantecler from 'url:../../../assets/breed_photos/chantecler.jpg';
// import cochin from 'url:../../../assets/breed_photos/cochin.jpg';
// import cornish from 'url:../../../assets/breed_photos/cornish.jpg';
// import cubalaya from 'url:../../../assets/breed_photos/cubalaya.jpg';
// import delaware from 'url:../../../assets/breed_photos/delaware.jpg';
// import dominique from 'url:../../../assets/breed_photos/dominique.jpg';
// import dorking from 'url:../../../assets/breed_photos/dorking.jpg';
// import faverolles from 'url:../../../assets/breed_photos/faverolles.jpg';
// import hamburg from 'url:../../../assets/breed_photos/hamburg.jpg';
// import holland from 'url:../../../assets/breed_photos/holland.jpg';
// import houdan from 'url:../../../assets/breed_photos/houdan.jpg';
// import icelandic from 'url:../../../assets/breed_photos/icelandic.jpg';
// import java from 'url:../../../assets/breed_photos/java.jpg';
// import jerseygiant from 'url:../../../assets/breed_photos/jerseygiant.jpg';
// import lakenvelder from 'url:../../../assets/breed_photos/lakenvelder.jpg';
// import langshan from 'url:../../../assets/breed_photos/langshan.jpg';
// import leghorn from 'url:../../../assets/breed_photos/leghorn.jpg';
// import malay from 'url:../../../assets/breed_photos/malay.jpg';
// import minorca from 'url:../../../assets/breed_photos/minorca.jpg';
// import moderngame from 'url:../../../assets/breed_photos/moderngame.jpg';
// import newhampshire from 'url:../../../assets/breed_photos/ancona.jpg';
// import oldenglishgame from 'url:../../../assets/breed_photos/oldenglishgame.jpg';
// import phoenix from 'url:../../../assets/breed_photos/phoenix.jpg';
// import plymouthrock from 'url:../../../assets/breed_photos/plymouthrock.jpg';
// import polish from 'url:../../../assets/breed_photos/polish.jpg';
// import redcap from 'url:../../../assets/breed_photos/redcap.jpg';
// import rhodeislandred from 'url:../../../assets/breed_photos/rhodeislandred.jpg';
// import rhodeislandwhite from 'url:../../../assets/breed_photos/rhodeislandwhite.jpg';
// import russianorloff from 'url:../../../assets/breed_photos/russianorloff.jpg';
// import shamo from 'url:../../../assets/breed_photos/shamo.jpg';
// import spanish from 'url:../../../assets/breed_photos/spanish.jpg';
// import spitzhauben from 'url:../../../assets/breed_photos/spitzhauben.jpg';
// import sumatra from 'url:../../../assets/breed_photos/sumatra.jpg';
// import sussex from 'url:../../../assets/breed_photos/sussex.jpg';
// import wyandotte from 'url:../../../assets/breed_photos/wyandotte.jpg';
// import yokohama from 'url:../../../assets/breed_photos/yokohama.jpg';

// const breedImages = {
//     ancona,
//     andalusian,
//     australorp,
//     brahma,
//     buckeye,
//     campine,
//     chantecler,
//     cochin,
//     cornish,
//     cubalaya,
//     delaware,
//     dominique,
//     dorking,
//     faverolles,
//     hamburg,
//     holland,
//     houdan,
//     icelandic,
//     java,
//     jerseygiant,
//     lakenvelder,
//     langshan,
//     leghorn,
//     malay,
//     minorca,
//     moderngame,
//     newhampshire,
//     oldenglishgame,
//     phoenix,
//     plymouthrock,
//     polish,
//     redcap,
//     rhodeislandred,
//     rhodeislandwhite,
//     russianorloff,
//     shamo,
//     spanish,
//     spitzhauben,
//     sumatra,
//     sussex,
//     wyandotte,
//     yokohama
// }
// import images from "../../../assets/breed_photos/*.jpg";
// import Frankie from 'url:../../../assets/frankie2.jpeg';

export default class BreedView extends React.Component {
  
  render() {
    // a single breed is sent from main-view
    const { breed, onBackClick } = this.props;
    
    const purposeArray = split(breed.purpose, ', ');
    const isDualPurpose =  (purposeArray) => {
      return (purposeArray.indexOf('meat') > -1 && purposeArray.indexOf('eggs') > -1 );
    }
    
    const breedsPurpose = isDualPurpose(purposeArray) ? ["Dual-purpose"] : purposeArray;



    // function importAll(r) {
      //   let images = {};
      //   r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
      //   return images;
      // }
      // const images = importAll(require.context('../../../assets/breed_photos', false, /\.(png|jpe?g|svg)$/ ));
      
      // import imageURL from `url:${breedImageBaseURL}${breed.breed.replace(/\s+/g, '')}.jpg`;
      // const Frankie =  require('url:../../../assets/frankie2.jpeg');
      // const images = require("../../../assets/breed_photos/*")

      // console.log(images); //images[`${breed.breed.replace(/\s+/g, '')}.jpg`] breedImages[breed.breed.replace(/\s+/g, '')] 

    return (
      <Col md={8}>
        <Card>
          <Card.Header>
            <h1>
              {breed.breed}
            </h1>
          </Card.Header>
          <Card.Body>
            <Card.Img variant="top" src={ } alt="a photo of a chicken"/>
            <Card.Text as="div" className="mt-2">
              <p>
                <span className="label">APA Class: </span>
                <Link to={`/apaclass/${breed.apaClass.name}`}>
                  <span className="value">{breed.apaClass.name}</span>
                </Link>
              </p>
              <p>
                <span className="label">Purpose: </span>
                {breedsPurpose.map((purpose, index, array) => {
                  const correctedPurpose = (purpose === 'show' ? 'exhibition' : purpose)
                  return (
                    <Link to={`/purpose/${correctedPurpose}`} key={correctedPurpose}>
                      <span className="value">{purpose}</span>
                      {index < array.length && array.length > 1 ? ", ": ""}
                    </Link>
                  )
                })}
              </p>
              <p>
                <span className="label">Egg Color: </span>
                <span className="value">{breed.eggColor}</span>
              </p>
              <p>
                <span className="label">Egg Size: </span>
                <span className="value">{breed.eggSize}</span>
              </p>
              {
                breed.origin &&
                <p>
                  <span className="label">Origin: </span>
                  <span className="value">{breed.origin}</span>
                </p>
              }
              {
                breed.description &&
                <p>
                  <span className="label">Description: </span>
                  <span className="value">{breed.description}</span>
                </p>
              }
              </Card.Text>
            <Button onClick={onBackClick} >Back</Button>
          </Card.Body>
        </Card>
      </Col>
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
    _id: PropTypes.string.isRequired,
    breed: PropTypes.string.isRequired,
    purpose: PropTypes.string.isRequired,
    eggColor: PropTypes.string.isRequired,
    eggSize: PropTypes.string,
    origin: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};