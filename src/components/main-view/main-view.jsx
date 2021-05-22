import React from 'react';
import axios from 'axios';

// Components
import { ChickenNavbar } from '../layout/navbar'
import { LoginView } from '../login-view/login-view';
import { BreedCard } from '../breed-card/breed-card';
import { BreedView } from '../breed-view/breed-view';
import { RegistrationView } from '../registration-view/registration-view';

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

  onRegistration(user) {
    this.setState({
      register: null
    });
    this.onLoggedIn(user);
  }

  render() {
    const { breeds, selectedBreed, user, register } = this.state;

    if (register) return <RegistrationView onRegistration={user => this.onRegistration(user)} />

    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} onGoRegister={() => this.onGoRegister()} />;

    if (!breeds) return <div className='main-view' />;

    return (
      <>
        <ChickenNavbar logout={() => {this.onLoggedOut()}}/> 
        <Row className="main-view justify-content-md-center mt-1">
          { selectedBreed 
            ? (
                <Col md={8}>
                  <BreedView breed={selectedBreed} onBackClick={newSelectedBreed => {this.setSelectedBreed(newSelectedBreed)}} />
                </Col>
            )
            : breeds.map(breed => 
              (
                <Col sm={10} md={6} lg={4} xl={3} className="mt-2" key={breed._id}>
                  <BreedCard breed={breed} onBreedClick={breed => {this.setSelectedBreed(breed)}} />
                </Col>
              )
            )
          }
        </Row>
      </>
    );
  }
}