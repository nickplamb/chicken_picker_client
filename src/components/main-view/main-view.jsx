import React from 'react';

// Components
import { BreedCard } from '../breed-card/breed-card';
import { BreedView } from '../breed-view/breed-view'

export class MainView extends React.Component {

  constructor(){
    super();
    this.state = {
      breeds: [
        {"_id":{"$oid":"606fabac4ecea6d979792bd1"},"breed":"Yokohama","eggColor":"cream","eggSize":"small","apaClass":{"name":"All Other Standard Breeds","abbreviation":"AOSB"},"purpose":"show, ornamental","eggProduction":"poor","eggsPerYear":"80","temperament":"active","coldTolerance":"poor","heatTolerance":"good","varieties":[],"__v":0},
        {"_id":{"$oid":"606fabac4ecea6d979792bd2"},"breed":"Java","eggColor":"brown","eggSize":"large","apaClass":{"name":"American"},"purpose":"meat, some eggs","eggProduction":"good","eggsPerYear":"150","temperament":"docile, but active","coldTolerance":"good","heatTolerance":"good","varieties":[{"_id":{"$oid":"606fabac4ecea6d979792bd3"},"variety":"black","comb":""},{"_id":{"$oid":"606fabac4ecea6d979792bd4"},"variety":"mottled","comb":""}],"__v":0},
        {"_id":{"$oid":"606fabac4ecea6d979792bd5"},"breed":"Campine","eggColor":"white","eggSize":"medium to large","apaClass":{"name":"Continental"},"purpose":"eggs","eggProduction":"good","eggsPerYear":"150","temperament":"very active","coldTolerance":"poor","heatTolerance":"good","varieties":[{"_id":{"$oid":"606fabac4ecea6d979792bd6"},"variety":"golden","comb":""},{"_id":{"$oid":"606fabac4ecea6d979792bd7"},"variety":"silver","comb":""}],"__v":0},
        {"_id":{"$oid":"606fabac4ecea6d979792bd8"},"breed":"Catalana","eggColor":"white to tinted","eggSize":"medium","apaClass":{"name":"Mediterranean"},"purpose":"eggs, meat","eggProduction":"good","eggsPerYear":"150","temperament":"active","coldTolerance":"poor","heatTolerance":"good","varieties":[{"_id":{"$oid":"606fabac4ecea6d979792bd9"},"variety":"buff","comb":""}],"__v":0},
        {"_id":{"$oid":"606fabac4ecea6d979792bda"},"breed":"Wyandotte","eggColor":"tinted to brown","eggSize":"medium to large","apaClass":{"name":"American"},"purpose":"eggs","eggProduction":"very good","eggsPerYear":"200","temperament":"calm, docile","coldTolerance":"good","heatTolerance":"good","varieties":[{"_id":{"$oid":"606fabac4ecea6d979792bdb"},"variety":"black","comb":""},{"_id":{"$oid":"606fabac4ecea6d979792bdc"},"variety":"blue","comb":""},{"_id":{"$oid":"606fabac4ecea6d979792bdd"},"variety":"buff","comb":""},{"_id":{"$oid":"606fabac4ecea6d979792bde"},"variety":"columbian","comb":""},{"_id":{"$oid":"606fabac4ecea6d979792bdf"},"variety":"golden laced","comb":""},{"_id":{"$oid":"606fabac4ecea6d979792be0"},"variety":"partridge","comb":""},{"_id":{"$oid":"606fabac4ecea6d979792be1"},"variety":"silver laced","comb":""},{"_id":{"$oid":"606fabac4ecea6d979792be2"},"variety":"silver penciled","comb":""},{"_id":{"$oid":"606fabac4ecea6d979792be3"},"variety":"white","comb":""}],"__v":0},
        {"_id":{"$oid":"606fabac4ecea6d979792be4"},"breed":"La Fleche","eggColor":"white","eggSize":"medium to large","apaClass":{"name":"Continental"},"purpose":"meat, eggs","eggProduction":"very good","eggsPerYear":"200","temperament":"active","coldTolerance":"good, no extremes","heatTolerance":"good, no extremes","varieties":[{"_id":{"$oid":"606fabac4ecea6d979792be5"},"variety":"black","comb":""}],"__v":0},
      ],
      selectedBreed: null
    };
  }

  setSelectedBreed(newSelectedBreed) {
    this.setState({
      selectedBreed:newSelectedBreed
    });
  }

  render() {
    const { breeds, selectedBreed } = this.state;

    if (breeds.length === 0) return <div className='main-view'>The list is empty!</div>;

    return (
      <div className='main-view'>
        {
          selectedBreed 
          ? <BreedView breed={selectedBreed} onBackClick={newSelectedBreed => {this.setSelectedBreed(newSelectedBreed)}} />
          :breeds.map(breed => 
            <BreedCard key={breed._id.$oid} breed={breed} onBreedClick={breed => {this.setSelectedBreed(breed)}} />
          )
        }
      </div>
    );
  }
}