import React from 'react';
import axios from 'axios';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import { toLower } from 'lodash';

// Components
import { ChickenNavbar } from '../layout/navbar'
import { LoginView } from '../login-view/login-view';
import { AllBreedsView } from '../all-breeds-view/all-breeds-view'
import { BreedCard } from '../breed-card/breed-card';
import { BreedView } from '../breed-view/breed-view';
import { RegistrationView } from '../registration-view/registration-view';
import { ClassView } from '../class-view/class-view';

// Bootstrap components
import { Row, Col } from 'react-bootstrap';

// Styling
import './main-view.scss';

let baseUrl = 'https://chickens-api.herokuapp.com';

export class MainView extends React.Component {

  constructor(){
    super();
    this.state = {
      breeds: null,
      selectedBreed: null,
      user: null,
      register: null,
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getBreeds(accessToken);
    }
  }

  getBreeds(token){
    axios.get(`${baseUrl}/breeds`, {
      headers: {Authorization: `Bearer ${token}`}
    })
    .then(res => {
      this.setState({
        breeds:res.data
      });
    })
    .catch(err => {
      console.log('error at getBreeds' + err);
    });
  }

  setSelectedBreed(breed) {
    this.setState({
      selectedBreed:breed
    });
  }

  onLoggedIn(authData) {
    console.log(authData)
    this.setState({
      user: authData.user.email
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.email);
    this.getBreeds(authData.token)
  }

  onLoggedOut() {
    console.log('attempting to log out.')
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }

  onGoRegister() {
    this.setState({
      register: true
    });
  }

  onRegistration(authData) {
    console.log(authData)
    this.setState({
      register: null
    });
    // this.onLoggedIn(authData);
  }

  render() {
    const { breeds, selectedBreed, user, register } = this.state;
    
    if (!user) return (
      <Row>
        <Col>
          <LoginView onLoggedIn={user => this.onLoggedIn(user)} onGoRegister={() => this.onGoRegister()} />;
        </Col>
      </Row>
    )
    if (!breeds) return <div className='main-view' />;
    if (register) return <RegistrationView onRegistration={user => this.onRegistration(user)} />

    return (
      <Router>
        <ChickenNavbar logout={() => {this.onLoggedOut()}}/> 
        <Row className="main-view justify-content-md-center mt-1">
          <Route exact path="/" render={() => <AllBreedsView breeds={breeds} />} />
          <Route path="/breeds/:breedName" render={({ match, history }) => <BreedView breed={breeds.find(b => b.breed === match.params.breedName)} onBackClick={() => history.goBack()} /> } />
          <Route path="/apaclass/:apaClass" render={({ match, history }) => <ClassView apaClass={match.params.apaClass} breeds={breeds} onBackClick={() => history.goBack()} /> } />
        </Row>
      </Router>
    );
  }
}
// <BreedView breed={selectedBreed} onBackClick={newSelectedBreed => {this.setSelectedBreed(newSelectedBreed)}} />