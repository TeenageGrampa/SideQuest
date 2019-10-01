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
import { Switch, Route} from 'react-router-dom'
import NewCharacter from './NewCharacter';
import AllCharacters from'./AllCharacters';
import AllGames from'./AllGames';
import NewGame from './NewGame';
import Campaign from './Campaign';
import CharacterSheet from './CharacterSheet';
import Inbox from './Inbox'

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
        <Route path={'/inbox'} component={Inbox}/>
        <Route path={'/NewClass'} component={NewClass}/>
        <Route path={'/NewRace'} component={NewRace}/>
        <Route path={'/NewGame'} component={NewGame}/>
        <Route path={'/StatRoll'} component={StatRoll}/>
        <Route path={'/NewCharacter'} component={NewCharacter}/>
        <Route path={'/AllCharacters'} component={AllCharacters}/>
        <Route path={'/AllGames'} component={AllGames}/>
        <Route path={'/Campaign'} component={Campaign} />
        <Route path={'/CharacterSheet'} component={CharacterSheet}/>
        <Route path={'/'} component={HomePage} />
        <Route component={FourOhFourPage} />
      </Switch>
    )
  }
}

export default App;
