import React, { Component } from 'react';
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import NavBar from './NavBar';
import PartyMember from './PartyMember'


class ProfilePage extends Component {

    state = {
        username: '',
        AllGames: [],
        DMGames: [],
        requests: []
    }

  handleClick = () => {
    localStorage.clear()
    this.props.history.push('/')
  }

  componentDidMount(){
    fetch('http://localhost:3000/profile',{
    headers: {
      'Authorization': `Bearer ${localStorage.token}`
    }
    })
    .then(res => res.json())
    .then(user => 
      {this.props.LogIn(user)

        fetch(`http://localhost:3000/users/${this.props.currentUser.id}`)
        .then(r => r.json()).then(user => this.props.SelectCharacter(user.characters[0], this.getGames(user.games), this.setState({
          DMGames: user.dungeon_master_games
        }, () => this.getRequests(user.dungeon_master_games))))}
    )
    localStorage.removeItem('newCharClass')
    localStorage.removeItem('newCharRace')
    localStorage.removeItem('stats')
    localStorage.removeItem('mods')
    localStorage.removeItem('skills')
    if(this.props.currentUser){
      this.checkCharacters()
      }
  }

  getGames = (games) => {
    const gameArr = games.filter(function(ele){
      if(ele.game.length === 1){
        return ele
      }
    })
    for(let i =0; i < gameArr.length; i++){
      fetch(`http://localhost:3000/games/${gameArr[i].game[0].id}`)
      .then(r => r.json())
      .then(game => this.setState({
        AllGames: [...this.state.AllGames, game]
      }))
    }
  }

  getRequests = (games) => {
    for(let i =0; i < games.length; i++){
      fetch(`http://localhost:3000/dungeon_masters/${games[i].id}`)
      .then(r => r.json())
      .then(game => {if(game.game.requests.length > 0){
        this.setState({
          requests: [...this.state.requests, game.game.requests]
        }, () => this.props.AddRequests(game.game.requests))}
      })
    }
  }

  checkCharacters = () => {
    fetch(`http://localhost:3000/users/${this.props.currentUser.id}`)
    .then(r => r.json())
    .then(user => this.setState({
        AllCharacters: user.characters
    }, () => {
        if(this.state.AllCharacters){for(let i = 0; i < this.state.AllCharacters.length; i++){
            if(this.state.AllCharacters[i].race.length > 0 && this.state.AllCharacters[i].class.length > 0 && this.state.AllCharacters[i].stats.length > 0 && this.state.AllCharacters[i].skills.length > 0 && this.state.AllCharacters[i].mods.length > 0 ){
                console.log('checked')
            } else {
                fetch(`http://localhost:3000/characters/${this.state.AllCharacters[i].id}`, {
                    method: 'DELETE'
                }).then(r => r.json()).then(console.log('deleted'))
            }
        }
      }
    }))
  }
makeGames= (games) => {
  const AllGames = games.map(game => 
    <div key={game.id}><div key={game.id} className="columns card brick-bg" style={{margin: 20, borderStyle: 'ridge', boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)', borderRadius: 10}}>
        <div className="column is-2" >
            <h1 className="subtitle" style={{color: 'white'}}>Campaign Name:</h1>
            <p className="subtitle box"  style={{color: 'black', borderStyle: 'ridge', boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)', borderRadius: 10}}>{game.name}</p>
            <div className="columns">
            <h3 className="subtitle content is-small" style={{color: 'white'}}>Created by:</h3><br></br>
            <div className="column box" style={{borderStyle: 'ridge', boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)', borderRadius: 10}}>
                <img src={require('./boss-key.png')} alt="" style={{width:40, display: 'block', marginLeft: 'auto', marginRight: 'auto', borderStyle: 'ridge', boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)', borderRadius: 10}}/>
                <p style={{textAlign: 'center'}}>{game.dungeon_master.username}</p>
            </div>
            </div>
            <h2 className="subtitle" style={{color: 'white'}}>Description</h2>
            <p className="box" style={{color: 'black', borderStyle: 'ridge', boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)', borderRadius: 10}}>{game.desc}</p>
        </div>
        <div className="column is-1">
            <div style={{margin: 5}}>
            <h4 >EXP Level:</h4>
            <h5 > {game.explevel}</h5>
            </div><br></br>
            <div style={{margin: 5}}>
            <h4 >Role Playing Intensity:</h4>
            <h5 >{game.rplevel}</h5>
            </div><br></br>
        </div>
        <div className="column is-9">
        {game.party || game.dungeon_master.user_id === this.props.currentUser.id ? 
         <Link to={{pathname:"/Campaign", state: { game: game }}} >
            <button className="button is-black">Go To Campaign</button>
            </Link> : null}
            <div className="columns">
            <div className="column is-2">
            <h2>Free Spots: {6 - game.party.length}</h2>
            <h2>Party Members:</h2><br></br>
            </div>
            <div className="column is-10" style={{textAlign: 'center'}}>
            <h4 className="subtitle" style={{color: 'white'}}>Location:</h4>
            <h5 className="title" style={{color: 'white'}}>{game.location}</h5>
            </div>
            </div>
            <div className="columns" >
                <div className="column is-4">
                {game.party.length > 0 &&  game.players.length > 0 ? <div>
                    <PartyMember character={game.party[0]} player={game.players[0]}/>
                    </div> : null}
                {game.party.length > 1 &&  game.players.length > 1 ? <div style={{margin: 5}}>
                    <PartyMember character={game.party[1]} player={game.players[1]}/>
                </div> : null }
                </div>
                <div className="column is-4">
                {game.party.length > 2 &&  game.players.length > 2 ? <div style={{margin: 5}}>
                    <PartyMember character={game.party[2]} player={game.players[2]}/>
                </div> : null}
                {game.party.length > 3 &&  game.players.length > 3 ? <div style={{margin: 5}}>
                    <PartyMember character={game.party[3]} player={game.players[3]}/>
                </div> : null }
                </div>
                <div className="column is-4">
                {game.party.length > 4 &&  game.players.length > 4 ? <div style={{margin: 5}}>
                    <PartyMember character={game.party[4]} player={game.players[4]}/>
                </div> : null}
                {game.party.length > 5 &&  game.players.length > 5 ? <div style={{margin: 5}}>
                    <PartyMember character={game.party[5]} player={game.players[5]}/>
                </div> : null }
                </div>
            </div>
        </div>
    </div>
    
    </div>)
    return AllGames
  }
  

  render() {
    const AllGames = this.makeGames(this.state.AllGames)
    const DMGames = this.makeGames(this.state.DMGames)
    return (
      <div className="container" >
        <NavBar />
        {this.props.currentUser ? <div><button onClick={this.handleClick} className="button is-black" style={{marginLeft: 100, borderStyle: 'ridge', boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)', borderRadius: 10}} >Logout</button>
        {this.state.requests.length === 0 ? <Link to={{pathname:"/Inbox"}} >
          <button className="button is-black " style={{marginLeft: 3, borderStyle: 'ridge', boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)', borderRadius: 10}}>Requests</button>
        </Link> 
        :
        <Link to={{pathname:"/Inbox"}} >
          <button className="button is-black badge1" data-badge={this.state.requests.length} style={{marginLeft: 3, borderStyle: 'ridge', boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)', borderRadius: 10}}>Requests</button>
        </Link>}
        {
          this.props.currentUser.username ?
          <h1 className="title" style={{textAlign: 'center'}}>Welcome {this.props.currentUser.username}!</h1> :
          <h1>getting your info...</h1>
          
        }
        <h2 className="title" style={{textAlign: 'center', margin: 50}}>All Your Current Character Campaigns:</h2>
        {AllGames}
        <h2 className="title" style={{textAlign: 'center', margin: 50}}>All Your Current Dungeon Master Campaigns:</h2>
        {DMGames}</div> : <div><h1 className="title">Getting Your Info</h1></div>}
      </div>
    );
  }
}

const mapStateToProps = (store) => {
    return {
      currentUser: store.currentUser,
      SelectedCharacter: store.SelectedCharacter
    }
}
  
const mapDispatchToProps = (dispatch) => {
    return {
      LogIn: (loggedInUser) => {
        dispatch({ type: 'LOGIN_CURRENT_USER', user: loggedInUser })
      },
      SelectCharacter: (character) => {
          dispatch({
              type: 'CHARACTER_SELECT', character
          })
      }, 
      AddRequests: (requests) => {
        dispatch({ type: 'AddRequests', requests})
      }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);