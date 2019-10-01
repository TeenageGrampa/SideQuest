import React from  'react'
import { connect } from 'react-redux'
import NavBar from './NavBar'
import PartyMember from'./PartyMember'



class AllCaracters extends React.Component{

    state = {
        characters: []
    }
    
    componentDidMount(){
        fetch(`http://localhost:3000/users/${this.props.currentUser.id}`)
        .then(r => r.json()).then(user  => {
            for(let i= 0; i < user.characters.length; i++){
                fetch(`http://localhost:3000/characters/${user.characters[i].id}`)
                .then( r => r.json()).then( character => {
                    this.setState({
                        characters: [...this.state.characters, character]
                    })
                })
            }
        })
        
    }

    handleLogout = () => {
        localStorage.clear()
        this.props.history.push('/')
    }

    



    render(){
        console.log(this.state)
        const characters = this.state.characters.map(character  =>
        <div className="column is-4"><PartyMember character={character} player={this.props.currentUser}/></div>)
        return(
            <div className="container">
                <NavBar />
                <button onClick={this.handleLogout} className="button is-black" style={{marginLeft: 100}}>Logout</button>
                <h1 className="title">All Characters:</h1>
                <div className="columns is-multiline box brick-bg" style={{borderStyle: 'ridge', boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)', borderRadius: 10}}>{characters}</div>
            </div>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        currentUser: store.currentUser,
        newCharClass: store.newCharClass,
        newCharRace: store.newCharRace,
        stats: store.stats,
        mods: store.mods,
        skills: store.skills
    }
}
  
const mapDispatchToProps = (dispatch) => {
    return {
      LogIn: (loggedInUser) => {
        dispatch({ type: 'LOGIN_CURRENT_USER', user: loggedInUser })
      },
      AddClass: (charClass) => {
          dispatch({ type: 'ADD_CLASS', attribute: charClass })
      }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllCaracters);