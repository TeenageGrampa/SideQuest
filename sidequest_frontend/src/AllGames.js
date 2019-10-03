import React from  'react'
import { connect } from 'react-redux'
import NavBar from './NavBar'
import CharacterSelect from './CharacterSelect'
import Modal from './Modal';
import PartyMember from './PartyMember'
import { Link} from 'react-router-dom'
import { geolocated } from 'react-geolocated'
import Geocode from "react-geocode"



class AllGames extends React.Component{

    state = {
        AllGames: [],
        myCharacters: [],
        filteredGames: [],
        onlyAvailable: false
    }

    showModal = (e) => {
        this.setState({ [e.target.value]: true });
    };
    
    hideModal = (game_id) => {
        this.setState({ [game_id]: false });
    };
    
    componentDidMount(){
        fetch(`http://localhost:3000/games`)
        .then(r => r.json()).then(games => this.setState({
            AllGames: games,
            filteredGames: games
        }, () => {
            for(let i =0; i < games.length; i++){
                this.setState({
                    [games[i].id]: false
                })
            }
        }))
        fetch(`http://localhost:3000/users/${this.props.currentUser.id}`)
        .then(r => r.json()).then(user => this.setState({
            myCharacters: user.characters
        }, () => this.onlyOpen()))
    }

    handleSearch = (e) => {
        const filteredGames = this.state.AllGames.filter(game => {
          return game.location.toLowerCase().includes(e.target.value.toLowerCase())
        })
        this.filterGames(filteredGames)
    }

    filterGames = (filteredGames) => {
    
        this.setState({
          filteredGames: filteredGames
        })
    }

    onlyOpen = () =>{
       const availableGames = this.state.filteredGames.filter(function(game){
           return game.party.length < 6
       })
       this.setState({
           onlyAvailable: true,
           filteredGames: availableGames
       })
    }

    showAll = () => {
        this.setState({
            filteredGames: this.state.AllGames,
            onlyAvailable: false
        })
    }



    handleLogout = () => {
        localStorage.clear()
        this.props.history.push('/')
    }

    handleJoin = (e) => {
        fetch(`http://localhost:3000/games/${e.target.value}`)
        .then(r => r.json()).then(game => 
            fetch('http://localhost:3000/requests', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            },
            body: JSON.stringify({
                game_id: game.id,
                character_id: this.props.selectedCharacter.id,
                dungeon_master_id: game.dungeon_master.id
            })
            }).then(r => r.json()).then(console.log)
            )
    }

    
    useLocation = () =>{
        !this.props.isGeolocationAvailable ? 
        console.log('Your browser does not support Geolocation')
        : !this.props.isGeolocationEnabled ? 
        console.log('Geolocation is not enabled')
        : this.props.coords ?
        this.setState({
            latitude: this.props.coords.latitude,
            longitude: this.props.coords.longitude
        }, () => {
            Geocode.setApiKey(process.env.REACT_APP_API_KEY);
            Geocode.fromLatLng(this.state.latitude, this.state.longitude).then(
                response => {
                  const address = response.results[0].formatted_address;
                  this.setState({
                      address: address
                  });
                },
                error => {
                  console.error(error);
                }
              )
            const closestGames = this.state.filteredGames.sort((a, b) => (this.PythagorasEquirectangular(this.state.latitude, this.state.longitude, a.latitude, a.longitude) > (this.PythagorasEquirectangular(this.state.latitude, this.state.longitude, b.latitude, b.longitude)) ? 1 : -1))
            this.setState({
                filterGames: closestGames
            })
            })
        : console.log('getting location')
    }

    degToRad = (deg) =>{
        return deg * Math.PI / 180
    }

    PythagorasEquirectangular = (latitude1, longitude1, latitude2, longitude2) => {
        let lat1 = this.degToRad(latitude1);
        let lat2 = this.degToRad(latitude2);
        let lon1 = this.degToRad(longitude1);
        let lon2 = this.degToRad(longitude2);
        let R = 6371; // km
        let x = (lon2 - lon1) * Math.cos((lat1 + lat2) / 2);
        let y = (lat2 - lat1);
        let d = Math.sqrt(x * x + y * y) * R;
        return d;
    }

    getAddress = (latitude, longitude) => {
        Geocode.setApiKey(process.env.REACT_APP_API_KEY);
            Geocode.fromLatLng(latitude, longitude).then(
                response => {
                  const address = response.results[0].formatted_address;
                  return address
                },
                error => {
                  console.error(error);
                }
              )
    }



    render(){
        const AllGames = this.state.filteredGames.map(game => 
            <div key={game.id}><div key={game.id} className="card columns brick-bg" style={{margin: 20, borderStyle: 'ridge', boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)', borderRadius: 10}}>
                <div className="column is-2" >
                    <h1 className="subtitle" style={{color: 'white'}}>Campaign Name:</h1>
                    <p className="subtitle box" style={{color: 'black', borderStyle: 'ridge', boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)'}} >{game.name}</p>
                    <div className="columns">
                    <h3 className="subtitle column content is-small" style={{color: 'white'}}>Created by:</h3>
                    <div className="column box">
                        <img src={require('./boss-key.png')} alt="" style={{width:40, display: 'block', marginLeft: 'auto', marginRight: 'auto', borderStyle: 'ridge', boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)', borderRadius: 10}}/>
                        <p style={{textAlign: 'center', color: 'black', borderRadius: 10}}>{game.dungeon_master.name}</p>
                    </div>
                    </div>
                    <h2 className="subtitle" style={{color: 'white'}}>Description</h2>
                    <p className="box" style={{color: 'black', borderStyle: 'ridge', boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)', borderRadius: 10}}>{game.desc}</p>
                </div>
                <div className="column is-1">
                    <div >
                    <h4 >EXP Level:</h4>
                    <h5 > {game.explevel}</h5>
                    </div><br></br>
                    <div >
                    <h4 >Role Playing Intensity:</h4>
                    <h5 >{game.rplevel}</h5>
                    </div><br></br>
                </div>
                <div className="column is-9">
                <div >
                    <h4 className="subtitle" style={{color: 'white'}}>Location:</h4>
                    <h5 className="title" style={{color: 'white'}}>{game.location}</h5>
                    </div>
                <div className="columns">
                    <div className="column is-4">
                    {game.party_ids.includes(this.props.currentUser.id) || game.dungeon_master.user_id === this.props.currentUser.id ? 
                 <Link to={{pathname:"/Campaign", state: { game: game }}} >
                    <button className="button is-black">Go To Campaign</button>
                    </Link> : null}
                    <h2>Free Spots: {6 - game.party.length}</h2>
                    <h2>Party Members:</h2><br></br>
                    </div>
                    <div className="column is-8">
                    {game.party.length < 6 && this.props.selectedCharacter && !game.party_ids.includes(this.props.currentUser.id) ? 
                    <div >
                    <h1>Join using:</h1>
                    <PartyMember character={this.props.selectedCharacter} player={this.props.currentUser}/>
                    <button onClick={this.showModal} value={game.id}>Request to Join Game</button>
                    {this.state[game.id] === true ? <Modal style={{zIndex: 1000}} hideModal={this.hideModal} className="modal" game={game} dm_id={game.dungeon_master.id} character={this.props.selectedCharacter}/> : null}
                    </div>
                 : null}
                    
                    </div>
                </div>
                    <div className="columns  " >
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
            
            </div>
        )
        return(
            <div className="container" >
                <NavBar />
                <button onClick={this.handleLogout} className="button is-black" style={{marginLeft: 100, borderStyle: 'ridge', boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)', borderRadius: 10}}>Logout</button>
                <div className="container columns box brick-bg" style={{margin: 50, borderStyle: 'ridge', boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)', borderRadius: 10}}>
                    <div className="column">
                    <CharacterSelect characters={this.state.myCharacters} handleCharChange={this.handleCharChange}/>
                    </div>
                    <div className="column">
                        <h1 className="title" style={{color: 'white'}}>Currently Selected</h1>
                        <PartyMember character={this.props.selectedCharacter} player={this.props.currentUser}/>
                    </div>
                </div>
                <div className="columns">
                <div className="column is-9">
                {this.state.onlyAvailable === true ? <div><h1 className="title">All Available Campaigns:</h1><br></br></div> : <div><h1 className="title">All Campaigns:</h1><br></br></div> }
                {this.state.latitude && this.state.longitude ? <div><h1 className="subtitle">Showing Closest Campaigns to {this.state.address}</h1><br></br></div> : null }
                {this.state.onlyAvailable === true ?
                <button className="button is-black" onClick={this.showAll} style={{borderStyle: 'ridge', boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)', borderRadius: 10}}>Show All Campaigns</button>
                :
                <button className="button is-black" onClick={this.onlyOpen} style={{borderStyle: 'ridge', boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)', borderRadius: 10}}>Only show Campaigns with free slots</button>}
                </div>
                <div className="column is-3">
                <p>Search by Location:</p>
                <input type="text" value={this.state.search} placeholder="search" onChange={this.handleSearch}/><br></br>
                <button className="button is-black" onClick={this.useLocation} style={{borderStyle: 'ridge', boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)', borderRadius: 10, marginTop: 10}}>Use Current Location</button>
                </div>
                </div>

                <div style={{margin:5}}>{AllGames}</div>
            </div>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        currentUser: store.currentUser,
        selectedCharacter: store.selectedCharacter
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
      }
    }
}

export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
})(connect(mapStateToProps, mapDispatchToProps)(AllGames));