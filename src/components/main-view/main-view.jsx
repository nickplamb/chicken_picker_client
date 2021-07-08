import React from 'react';
import axios from 'axios';
import {BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setBreeds, setUser, setToken, setUserFavorites, userLogout } from '../../actions/actions';

// Components
import ChickenNavbar from '../layout/navbar';
import LoginView from '../login-view/login-view';
import MultiBreedView from '../multi-breed-view/multi-breed-view';
import BreedView from '../breed-view/breed-view';
import RegistrationView from '../registration-view/registration-view';
import ClassView from '../class-view/class-view';
import PurposeView from '../purpose-view/purpose-view';
import ProfileView from '../profile-view/profile-view';

// Bootstrap components
import { Row } from 'react-bootstrap';

// Styling
import './main-view.scss';

let baseUrl = 'https://chickens-api.herokuapp.com';


class MainView extends React.Component {

  constructor(){
    super();
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.props.setUser({
        userEmail: localStorage.getItem('userEmail'),
        username: localStorage.getItem('username'),
      });
      this.props.setToken(accessToken);

      // loadAllData()
      this.getBreeds(accessToken);
      this.getUserFavorites(accessToken);
    }
  }

  getBreeds(token) {
    axios.get(`${baseUrl}/breeds`, {
      headers: {Authorization: `Bearer ${token}`}
    })
    .then(res => {
      this.props.setBreeds(res.data)
    })
    .catch(err => {
      console.log('error at getBreeds ' + err);
      console.log(err)
      // if error, log user out. this deletes local storage items and sets user back to blank.
      this.onLoggedOut();
    });
  }

  getUserFavorites(token) {
    axios.get(`${baseUrl}/users/favorites`, {
      headers: {Authorization: `Bearer ${token}`}
    })
    .then(res => {
      this.props.setUserFavorites(res.data);
    })
    .catch(err => {
      console.log('error getting favorites:' + err);
    });
  }

  onLoggedIn(authData) {
    // console.log(authData);
    this.props.setUser({
      userEmail: authData.user.email,
      username: authData.user.username,
    });
    this.props.setToken(authData.token)

    localStorage.setItem('token', authData.token);
    localStorage.setItem('userEmail', authData.user.email);
    localStorage.setItem('username', authData.user.username);
    // this.getBreeds(authData.token);
    // this.getUserFavorites(authData.token);
    window.open('/', '_self');
  }

  onLoggedOut() {
    console.log('attempting to log out.')
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('username');

    console.log(this)
    this.props.userLogout();
    window.open('/login', '_self');
  }

  render() {
    const { allBreeds, user } = this.props;

    return (
      <Router>
        <ChickenNavbar logout={ () => this.onLoggedOut() }/> 
        <Row className="main-view justify-content-sm-center mt-1">
          
          <Route exact path="/" render={ () => {
            if (!user.userEmail) return <LoginView onLoggedIn={ user => this.onLoggedIn(user) } />;
            if (allBreeds.length === 0) return <div className='main-view'><h1>Loading...</h1></div>;
            return <MultiBreedView breedsToDisplay={ allBreeds } />;
          }} />
          
          <Route exact path="/login" 
            render={() => 
              <LoginView 
                onLoggedIn={user => this.onLoggedIn(user)} 
              />
            }
          />
          
          <Route exact path="/register" render={ () => {
            if (user.userEmail) return <Redirect to="/" />;
            return <RegistrationView onLoggedIn={ user => this.onLoggedIn(user) } />;
          }} />
          
          <Route exact path="/profile" 
            render={({ history }) => {
              if (!user.userEmail) return <LoginView onLoggedIn={ user => this.onLoggedIn(user) } />;
              if (allBreeds.length === 0) return <div className='main-view'><h1>Loading...</h1></div>;
              return <ProfileView 
                onLoggedOut={ () => this.onLoggedOut() }
                onBackClick={ () => history.goBack() } 
              />;
          }} />

          <Route path="/breeds/:breedName" 
            render={({ match, history }) => {
              if (!user.userEmail) return <LoginView onLoggedIn={ user => this.onLoggedIn(user) } />;
              if (allBreeds.length === 0) return <div className='main-view'><h1>Loading...</h1></div>;
              return <BreedView 
                breed={ allBreeds.find(b => b.breed === match.params.breedName) } 
                onBackClick={ () => history.goBack() } 
              />;
          }} />
           
          <Route path="/apaclass/:apaClass" 
            render={({ match, history }) => {
              if (!user.userEmail) return <LoginView onLoggedIn={ user => this.onLoggedIn(user) } />;
              if (allBreeds.length === 0) return <div className='main-view'><h1>Loading...</h1></div>;
              return <ClassView 
                apaClass={ match.params.apaClass } 
                onBackClick={ () => history.goBack() } 
              />;
          }} />

          <Route path="/purpose/:purpose" 
            render={({ match, history }) => {
              if (!user.userEmail) return <LoginView onLoggedIn={ user => this.onLoggedIn(user) } />;
              if (allBreeds.length === 0) return <div className='main-view'><h1>Loading...</h1></div>;
              return <PurposeView 
                purpose={ match.params.purpose } 
                onBackClick={ ()=> history.goBack() } 
              />;
          }} />
          
        </Row>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return { 
    allBreeds: state.breeds,
    user: state.user,
  }
}

const actionCreators = {
  setBreeds,
  setToken,
  setUser,
  setUserFavorites,
  userLogout
}

export default connect(mapStateToProps, actionCreators)(MainView);

MainView.propTypes = {
  allBreeds: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired
};