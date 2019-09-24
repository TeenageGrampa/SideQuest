import React from 'react';
import './App.css';
import ProfilePage from './ProfilePage';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';
import FourOhFourPage from './FourOhFourPage';
import NewClass from './NewClass'
import NewRace from './NewRace'
import StatRoll from './StatRoll'
import CharacterSheet from'./CharacterSheet'
import { Switch, Route, withRouter } from 'react-router-dom'
import NewCharacter from './NewCharacter';

class App extends React.Component{

  state = {
    currentUser: {}
  }

  componentDidMount() {
    if (localStorage.token) {
      fetch('http://localhost:3000/profile',{
        headers: {
          'Authorization': `Bearer ${localStorage.token}`
        }
      })
      .then(res => res.json())
      .then(user => this.setState({currentUser: user}))
    } else {
      
    }
  }

  render(){
    return (
      <Switch>

        <Route
          path={'/profile'}
          render={routerProps => <ProfilePage {...routerProps} />} />
        <Route path={'/login'} component={LoginPage} />
        <Route path={'/signup'} component={SignUpPage} />
        <Route path={'/NewClass'} component={NewClass}/>
        <Route path={'/NewRace'} component={NewRace}/>
        <Route path={'/StatRoll'} component={StatRoll}/>
        <Route path={'/NewCharacter'} component={NewCharacter}/>
        <Route path={'/'} component={HomePage} />
        <Route component={FourOhFourPage} />
      </Switch>
    )
  }
}

export default App;
