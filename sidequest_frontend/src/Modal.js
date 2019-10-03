import React from  'react'
import { connect } from 'react-redux'




class Modal extends React.Component{

    state= {
        message: ''
    }

    messageChange= (e) => {
        this.setState({
            message: e.target.value
        })
    }

    handleJoin = (e) => {
        e.preventDefault()
        fetch('http://localhost:3000/requests', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            },
            body: JSON.stringify({
                game_id: this.props.game.id,
                character_id: this.props.character.id,
                dungeon_master_id: this.props.dm_id,
                message: this.state.message
            })
            }).then(r => r.json()).then(this.props.hideModal(this.props.game.id))
    }

    handleCancel = (e) => {
        e.preventDefault()
        this.props.hideModal(this.props.game.id)
    }
    


    render(){
        console.log(this.props)
        return(
            <div className="modal-background" style={{zIndex: 600, }}>
                <div className="modal-card">
                    <div className="modal-card-body floating" style={{marginTop: '25%', borderStyle: 'ridge', boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)', borderRadius: 10}}>
                    <h2 className="modal-title" style={{textAlign: 'center', color: 'black'}}>Request to Join: </h2><br></br>
                    <p className="title" style={{textAlign: 'center', color: 'black'}}>{this.props.game.name}</p> 
                        <form >
                            <label>Add a Message:</label><br></br>
                        <textarea name="message" cols="80" value={this.state.message} onChange={this.messageChange} style={{height: 200, marginLeft: '10%', borderStyle: 'ridge', boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)', borderRadius: 10}}></textarea><br></br>
                        <div className="columns">
                            <div className="column">
                            <button className="button is-black" style={{marginLeft: '25%', borderStyle: 'ridge', boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)', borderRadius: 10}} onClick={this.handleJoin}>Send</button> 
                            </div>
                            <div className="column">
                            <button className="button is-black" style={{marginLeft: '40%', borderStyle: 'ridge', boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)', borderRadius: 10}} onClick={this.handleCancel}>Cancel</button> 
                            </div>
                        </div>
                        </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(Modal);