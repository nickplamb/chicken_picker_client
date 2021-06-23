import React from 'react';
import axios from 'axios';
import {BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import { toLower } from 'lodash';

// Components
import { ChickenNavbar } from '../layout/navbar'
import { LoginView } from '../login-view/login-view';
import { MultiBreedView } from '../multi-breed-view/multi-breed-view'
import { BreedCard } from '../breed-card/breed-card';
import { BreedView } from '../breed-view/breed-view';
import { RegistrationView } from '../registration-view/registration-view';
import { ClassView } from '../class-view/class-view';
import { PurposeView } from '../purpose-view/purpose-view';
import { ProfileView } from '../profile-view/profile-view';

// Bootstrap components
import { Row, Col } from 'react-bootstrap';

// Styling
import './main-view.scss';

let baseUrl = 'https://chickens-api.herokuapp.com';

export class MainView extends React.Component {

  constructor(){
    super();
    this.state = {
      breeds: [],
      userEmail: null,
      username: null,
      token: null,
      userFavorites: []
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        userEmail: localStorage.getItem('userEmail'),
        username: localStorage.getItem('username'),
        token: accessToken
      });
      this.getBreeds(accessToken);
      this.getUserFavorites(accessToken);
    }
  }

  getBreeds(token) {
    axios.get(`${baseUrl}/breeds`, {
      headers: {Authorization: `Bearer ${token}`}
    })
    .then(res => {
      this.setState({
        breeds:res.data
      });
      // console.log(re s.data)
    })
    .catch(err => {
      console.log('error at getBreeds' + err);
      // if error, log user out. this deletes local storage items and sets user back to blank.
      this.onLoggedOut();
    });
  }

  getUserFavorites(token) {
    axios.get(`${baseUrl}/users/favorites`, {
      headers: {Authorization: `Bearer ${token}`}
    })
    .then(res => {
      this.setState({
        userFavorites: res.data
      });
      // console.log(res.data)
    })
    .catch(err => {
      console.log('error getting favorites:' + err);
    });
  }

  onLoggedIn(authData) {
    // console.log(authData);
    this.setState({
      userEmail: authData.user.email,
      username: authData.user.username,
      token: authData.token
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('userEmail', authData.user.email);
    localStorage.setItem('username', authData.user.username);
    this.getBreeds(authData.token);
    window.open('/', '_self');
  }

  onLoggedOut() {
    console.log('attempting to log out.')
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('username');
    this.setState({
      userEmail: null,
      username: null,
      token: null,
      userFavorites: [],
      breeds: []
    });
    window.open('/login', '_self');
  }

  // onGoRegister() {
  //   this.setState({
  //     register: true
  //   });
  // }

  render() {
    const { breeds, userEmail, username, userFavorites, token } = this.state;

    return (
      <Router>
        <ChickenNavbar logout={() => {this.onLoggedOut()}}/> 
        <Row className="main-view justify-content-sm-center mt-1">
          
          <Route exact path="/" render={() => {
            if (!userEmail) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
            if (breeds.length === 0) return <div className='main-view'><h1>Loading...</h1></div>;
            return <MultiBreedView breeds={ breeds } token={ token } favoriteBreeds={ userFavorites }/>;
          }} />
          
          <Route exact path="/login" 
            render={() => 
              <LoginView 
                onLoggedIn={user => this.onLoggedIn(user)} 
              />
            }
          />
          
          <Route exact path="/register" render={() => {
            if (userEmail) return <Redirect to="/" />;
            return <RegistrationView />;
          }} />
          
          <Route exact path="/profile" 
            render={({ history }) => {
              if (!userEmail) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
              if (breeds.length === 0) return <div className='main-view'><h1>Loading...</h1></div>;
              return <ProfileView 
                username={ username } 
                userEmail={ userEmail } 
                userFavorites={ userFavorites }
                token={ token }
                onLoggedOut={ this.onLoggedOut }
                onBackClick={ ()=> history.goBack() } 
              />;
          }} />

          <Route path="/breeds/:breedName" 
            render={({ match, history }) => {
              if (!userEmail) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
              if (breeds.length === 0) return <div className='main-view'><h1>Loading...</h1></div>;
              return <BreedView 
                breed={ breeds.find(b => b.breed === match.params.breedName) } 
                onBackClick={ () => history.goBack() } 
              />;
          }} />
           
          <Route path="/apaclass/:apaClass" 
            render={({ match, history }) => {
              if (!userEmail) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
              if (breeds.length === 0) return <div className='main-view'><h1>Loading...</h1></div>;
              return <ClassView 
                apaClass={ match.params.apaClass } 
                breeds={ breeds }
                token={ token }
                userFavorites={ userFavorites } 
                onBackClick={ () => history.goBack() } 
              />;
          }} />

          <Route path="/purpose/:purpose" 
            render={({ match, history }) => {
              if (!userEmail) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
              if (breeds.length === 0) return <div className='main-view'><h1>Loading...</h1></div>;
              return <PurposeView 
                purpose={ match.params.purpose } 
                breeds={ breeds }
                token={ token }
                userFavorites={ userFavorites } 
                onBackClick={ ()=> history.goBack() } 
              />;
          }} />
          
        </Row>
      </Router>
    );
  }
}