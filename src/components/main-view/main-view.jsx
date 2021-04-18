import React from 'react';
import axios from 'axios';

// Components
import { LoginView } from '../login-view/login-view';
import { BreedCard } from '../breed-card/breed-card';
import { BreedView } from '../breed-view/breed-view';

let baseUrl = 'https://chickens-api.herokuapp.com';

export class MainView extends React.Component {

  constructor(){
    super();
    this.state = {
      breeds: null,
      selectedBreed: null,
      user: null,
    };
  }

  componentDidMount() {
    axios.get(`${baseUrl}/breeds`).then(res => {
      this.setState({breeds:res.data})
    }).catch(err => {
      console.log(err);
    });
  }

  setSelectedBreed(breed) {
    this.setState({
      selectedBreed:breed
    });
  }

  onLoggedIn(user) {
    this.setState({
      user: user
    });
  }

  render() {
    const { breeds, selectedBreed, user } = this.state;

    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    if (!breeds) return <div className='main-view' />;

    return (
      <div className='main-view'>
        {
          selectedBreed 
          ? <BreedView breed={selectedBreed} onBackClick={newSelectedBreed => {this.setSelectedBreed(newSelectedBreed)}} />
          :breeds.map(breed => 
            <BreedCard key={breed._id} breed={breed} onBreedClick={breed => {this.setSelectedBreed(breed)}} />
          )
        }
      </div>
    );
  }
}