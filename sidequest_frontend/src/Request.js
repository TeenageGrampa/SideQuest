import React from  'react'
import { connect } from 'react-redux'
import PartyMember from './PartyMember'



class Inbox extends React.Component{
    // state = {
    //     requests: []
    // }

    // componentDidMount(){
    //     for(let i=0; i < this.props.location.state.requests.length; i++){
    //         fetch(`http://localhost:3000/requests/${this.props.location.state.requests[i].id}`)
    //         .then(r => r.json())
    //         .then(request => this.setState({
    //             requests: [...this.state.requests, request]
    //         }))
    //     }
    // }

    
    handleLogout = () => {
        localStorage.clear()
        this.props.history.push('/')
    }

    handleJoin = () => {
        fetch('http://localhost:3000/party_members', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            },
            body: JSON.stringify({
                game_id: this.props.request.game.id,
                character_id: this.props.request.character.id,

            })
        }).then(r => r.json()).then(this.handleDecline())
    }

    handleDecline = () => {
        this.props.handleDelete(this.props.request)
        fetch(`http://localhost:3000/requests/${this.props.request.id}`, {
        method: 'DELETE'
        }).then(r => r.json()).then(console.log)
    }



    render(){
        // console.log(this.props)
        return(
            <div className="container">
                <div className="box brick-bg" style={{borderStyle: 'ridge', boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)', borderRadius: 10}}>
                <div className="columns" >
                    <div className="column is-4">
                        <h2 className="subtitle" style={{color: 'white'}}>
                            Campaign Name:
                        </h2>
                        <h2>{this.props.request.game.name}</h2>
                        <h3 className="subtitle" style={{color: 'white'}}>Location</h3>
                        <p className="subtitle" style={{color: 'white'}}>{this.props.request.game.location}</p>
                        <h3 className="subtitle" style={{color: 'white'}}>exp level:</h3>
                        <p className="subtitle" style={{color: 'white'}}>{this.props.request.game.explevel}</p>
                        <h3 className="subtitle" style={{color: 'white'}}>Role Playing Intensity:</h3>
                        <p className="subtitle" style={{color: 'white'}}>{this.props.request.game.rplevel}</p>
                    </div>
                    <div className="column is-4">
                        <div className="columns">
                            <div className="column is-6">
                                <h2 className="subtitle" style={{color: 'white'}}>
                                From:
                            </h2>
                            <h3 className="title" style={{color: 'white'}}>
                                {this.props.request.user.username}
                            </h3>
                            </div>
                            <div className="column is-3">
                                <button className="button is-black" style={{borderStyle: 'ridge', boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)', borderRadius: 10}} onClick={this.handleJoin}>Accept</button>
                            </div>
                            <div className="column is-3">
                                <button className="button is-black" style={{borderStyle: 'ridge', boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)', borderRadius: 10}} onClick={this.handleDecline}>Decline</button>
                            </div>
                        </div>
                        <h3 className="subtitle" style={{color: 'white'}}>
                            Using:
                        </h3>
                        <PartyMember character={this.props.request.character} player={this.props.request.user}/>
                    </div>
                    <div className="column is-4">
                        <h3 className="subtitle" style={{color: 'white'}}>
                            Message:
                        </h3>
                        <div className="box subtitle" style={{borderStyle: 'ridge', boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)', borderRadius: 10}}>
                            {this.props.request.message ? <p>{this.props.request.message}</p> : <p>{this.props.request.user.username} did not send a message</p>}
                        </div>
                    </div>
                </div> 
                </div>
            </div>
        )
    }
}

const mapStateToProps = (store) => {
    return {
      currentUser: store.currentUser,
    }
}
  
const mapDispatchToProps = (dispatch) => {
    return {
      LogIn: (loggedInUser) => {
        dispatch({ type: 'LOGIN_CURRENT_USER', user: loggedInUser })
      }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Inbox);