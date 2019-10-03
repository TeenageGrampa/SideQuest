import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'


class NavBar extends React.Component{

    state = {
        AllCharacters: []
    }


    checkCharacters = () => {
        fetch(`http://localhost:3000/users/${this.props.currentUser.id}`)
        .then(r => r.json())
        .then(user => this.setState({
            AllCharacters: user.characters
        }, () => {
            for(let i = 0; i < this.state.AllCharacters.length; i++){
                if(this.state.AllCharacters[i].race.length > 0 && this.state.AllCharacters[i].class.length > 0){
                    console.log('checked')
                } else {
                    fetch(`http://localhost:3000/characters/${this.state.AllCharacters[i].id}`, {
                        method: 'DELETE'
                    }).then(r => r.json()).then(console.log('deleted'))
                }
            }
        }))
    }

    handleLogout = () => {
        localStorage.clear()
        this.props.history.push('/')
    }
    


    render(){
        return(
            <div className="columns container box field is-grouped" style={{ backgroundImage: `url(http://fanaru.com/fantasy-art/image/232259-fantasy-art-a-burning-rose.gif)`, backgroundSize: 'cover', borderStyle: 'ridge', boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)', borderRadius: 10}}>
                    <Link className="column control is-white is-small navHead" style={{margin: 50}}to={{pathname:'./profile'}} >Profile Page</Link>
                    <Link className="column control is-white is-small navHead" style={{margin: 50}} to={{pathname:'./NewGame'}} >New Game</Link>
                    <Link className="column control is-white is-small navHead" style={{margin: 50}} to={{pathname:'./AllCharacters'}} >All Characters</Link>
                    <Link className="column control is-white is-small navHead" style={{margin: 50}} to={{pathname:'./AllGames'}} >All Campaigns</Link>
                    <Link className="column control is-white is-small navHead" style={{margin: 50}} to={{pathname:'./NewClass'}} >Create New Character</Link>
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

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);