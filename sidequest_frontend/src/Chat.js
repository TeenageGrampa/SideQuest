import React from  'react'
import { connect } from 'react-redux'


class NewGame extends React.Component{

    state = {
        content: ''
    }

    
    handleChange = (e) => {
        this.setState({
            content: e.target.value
        })
    } 


    handleSubmit = (e) => {
        e.preventDefault()
        fetch('http://localhost:3000/messages', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            },
            body: JSON.stringify({
                content: this.state.content,
                game_id: this.props.game.id,
                user_id: this.props.currentUser.id
            })
        }).then(r => r.json()).then(this.props.handleNewMsg())
        this.setState({
            content: ''
        })
    }

    render(){
        return(
            <div>
                <form>
                    <div className="box brick-bg" style={{width: 600, borderStyle: 'ridge', boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)', borderRadius: 10}}>
                    <h1>New Message:</h1><br></br>
                        <textarea id="message_area" cols="80" value={this.state.content} onChange={this.handleChange} style={{height: 200, color: 'black'}}></textarea><br></br>
                        <button onClick={this.handleSubmit} style={{borderStyle: 'ridge', boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)', borderRadius: 10}} className="button is-black" >Submit</button>
                    </div>
                </form>
                
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

export default connect(mapStateToProps, mapDispatchToProps)(NewGame)