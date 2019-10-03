import React from  'react'
import { connect } from 'react-redux'
import NavBar from './NavBar'
import Chat from './Chat'
import CampaignMember from './CampaignMember'
import Geocode from "react-geocode"



class Campaign extends React.Component{

    state = {
        messages: []
    }

    componentDidMount(){
        fetch(`http://localhost:3000/games/${this.props.location.state.game.id}`)
        .then(r => r.json()).then(game => this.setState({
            messages: game.messages
        }, () => {
            if(game.latitude && game.longitude){
                this.getAddress(game.latitude, game.longitude)
            }
        }))
    }

    handleNewMsg = () => {
        fetch(`http://localhost:3000/games/${this.props.location.state.game.id}`)
        .then(r => r.json()).then(game => this.setState({
            messages: game.messages
        }))
    }

    getImg = (charClass) => {
        if(charClass === 'Rogue'){
            return require('./hooded-assassin.png')
        } else if(charClass === 'Barbarian'){
            return require('./barbarian.png')
        } else if(charClass === 'Paladin'){
            return require('./elf-helmet.png')
        } else if(charClass === 'Warlock'){
            return require('./warlock-hood.png')
        } else if(charClass === 'Ranger'){
            return require('./cowled.png')
        } else if(charClass === 'Bard'){
            return require('./musical-notes.png')
        } else if(charClass === 'Cleric'){
            return require('./pope-crown.png')
        } else if(charClass === 'Druid'){
            return require('./wolf-head.png')
        } else if(charClass === 'Fighter'){
            return require('./swordman.png')
        } else if(charClass === 'Monk'){
            return require('./monk-face.png')
        } else if(charClass === 'Sorcerer'){
            return require('./robe.png')
        } else if(charClass === 'Wizard'){
            return require('./wizard-staff.png')
        } else if(charClass === 'Dungeon Master'){ 
            return require('./boss-key.png')
        }
    }

    findMsgImg = (user_id) => {
        const charClass = this.props.location.state.game.party.filter(member => {
            if(member.user_id === user_id){
                return member.class[0].name
            }   
        })
        const img = this.getImg(charClass[0] ? charClass[0].class[0].name : 'Dungeon Master')
        return <img src={img} alt="" style={{width: 100, borderStyle: 'ridge', boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)', borderRadius: 10}}/>
        
    }

    getAddress = (latitude, longitude) => {
        Geocode.setApiKey(process.env.REACT_APP_API_KEY);
            Geocode.fromLatLng(latitude, longitude).then(
                response => {
                  const address = response.results[0].formatted_address;
                  this.setState({
                      gameAddress: address
                  })
                },
                error => {
                  console.error(error);
                }
              )
    }

    render(){
        const reverseMsgs = this.state.messages.reverse()
        const messages = reverseMsgs.map(message => 
            <div key={message.id} className="box columns brick-bg" style={{borderStyle: 'ridge', boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)', borderRadius: 10}}>
                <div className="column is-one-quarter" >
                {this.findMsgImg(message.user.id)}
                <p> - {message.user.username}</p>
                </div><div className="column box" style={{borderStyle: 'ridge', boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)', borderRadius: 10}}>
                    <p className="subtitle">{ message.content } </p>
                    
                </div>
            </div>)
        return(
            <div className="container">
                <NavBar /><br></br>
                <div>
                    <div  className="box columns brick-bg" style={{margin: 50, borderStyle: 'ridge', boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)', borderRadius: 10}}>
                        <div className="column box is-one-quarter" style={{backgroundColor: 'black', borderStyle: 'ridge', boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)', borderRadius: 10}}>
                            <h1 className="title" style={{color: 'white'}}>{this.props.location.state.game.name}</h1>
                        </div>
                        <div className="column">
                        <h2>Dungeon Master: {this.props.location.state.game.dungeon_master.name}</h2>
                        <img className="floating" src={require('./boss-key.png')} alt="" style={{width: 100, marginLeft: 30, borderStyle: 'ridge', boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)', borderRadius: 10}}/>
                        {this.state.gameAddress ? <p>Near: {this.state.gameAddress}</p> : null}
                        </div>
                        <div className="column box is-half" style={{color: 'black', borderStyle: 'ridge', boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)', borderRadius: 10}}>
                            <div className="columns">
                            <div className="column">
                            <h2 className="subtitle">Location: </h2>
                            <p>{this.props.location.state.game.location}</p>
                            </div>
                            <div className="column is-half">
                            <h2 className="subtitle">Description: </h2>
                            <p>{this.props.location.state.game.desc}</p>
                            </div>
                            <div className="column is-one-quarter" style={{color: 'black'}}>
                            <h2 className="subtitle">Role Playing Intensity: </h2>
                            <p>{this.props.location.state.game.rplevel}</p>
                            <h2 className="subtitle">Experience Level: </h2>
                            <p>{this.props.location.state.game.explevel}</p>
                            </div>
                            </div>
                        </div>
                    </div>
                    <div className="columns">
                    <div className="column" >
                        <h2 className="title">Party:</h2>
                        <div className="columns">
                            <div className="column">
                                {this.props.location.state.game.players[0] ? <div className="box brick-bg" style={{borderStyle: 'ridge', boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)', borderRadius: 10}}>
                                    <CampaignMember character={this.props.location.state.game.party[0]} player={this.props.location.state.game.players[0]}/>
                                </div> : null }
                                { this.props.location.state.game.players[1] ? <div className="box brick-bg" style={{borderStyle: 'ridge', boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)', borderRadius: 10}}>
                                <CampaignMember character={this.props.location.state.game.party[1]} player={this.props.location.state.game.players[1]}/>
                                </div> : null }
                            </div>
                            <div className="column">
                                {this.props.location.state.game.players[2] ? <div className="box brick-bg" style={{borderStyle: 'ridge', boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)', borderRadius: 10}}>
                                <CampaignMember character={this.props.location.state.game.party[2]} player={this.props.location.state.game.players[2]}/>
                                </div> : null}
                                {this.props.location.state.game.players[3] ? <div className="box brick-bg" style={{borderStyle: 'ridge', boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)', borderRadius: 10}}>
                                <CampaignMember character={this.props.location.state.game.party[3]} player={this.props.location.state.game.players[3]}/>
                                </div> : null }
                            </div>
                            <div className="column">
                            {this.props.location.state.game.players[4] ? <div className="box brick-bg" style={{borderStyle: 'ridge', boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)', borderRadius: 10}}>
                            <CampaignMember character={this.props.location.state.game.party[4]} player={this.props.location.state.game.players[4]}/>
                                </div> : null}
                                {this.props.location.state.game.players[5] ? <div className="box brick-bg" style={{borderStyle: 'ridge', boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)', borderRadius: 10}}>
                                <CampaignMember character={this.props.location.state.game.party[5]} player={this.props.location.state.game.players[5]}/>
                                </div> : null }
                            </div>
                        </div>
                    </div></div>
                </div>
                <div className="columns">
                    <div className="column" style={{ width: 300, margin: 50,}}>
                        <Chat game={this.props.location.state.game} handleNewMsg={this.handleNewMsg}/>
                    </div>
                    <div className="column" >
                        <h2>Messages:</h2>
                        <ul className="box" style={{borderStyle: 'ridge', boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)', borderRadius: 10}}>
                            {this.state.messages[0] ? 
                            messages : <h1 className="title">no messages yet</h1>}
                        </ul>
                    </div>
                </div>
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
      }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Campaign);