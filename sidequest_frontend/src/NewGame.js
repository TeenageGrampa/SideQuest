import React from  'react'
import { connect } from 'react-redux'
import NavBar from './NavBar'

class NewGame extends React.Component{

    state = {
        title: '',
        explevel: '',
        rpintensity: '',
        game_id: 0,
        desc: '',
        location: ''
    }


    handleLogout = () => {
        localStorage.clear()
        this.props.history.push('/')
    }

    
    titleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    } 

    expChange = (e) => {
        this.setState({
            explevel: e.target.value
        })
    }

    intensityChange = (e) => {
        this.setState({
            rpintensity: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        fetch('http://localhost:3000/games', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: this.state.title,
                rplevel: this.state.rpintensity,
                explevel: this.state.explevel,
                location: this.state.location,
                desc: this.state.desc
            })
        }).then(r => r.json()).then(game => this.setState({
            game_id: game.id
        },() => {fetch('http://localhost:3000/dungeon_masters', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
                },
                body: JSON.stringify({
                    user_id: this.props.currentUser.id,
                    name: this.props.currentUser.username,
                    game_id: this.state.game_id
                })
            }).then(r => r.json()).then(this.props.history.push('/AllGames'))}))
    }

    render(){
        console.log(this.state)
        return(
            <div className="container">
                <NavBar />
                <button onClick={this.handleLogout} className="button is-black" style={{marginLeft: 100}}>Logout</button>
                <h1>New Game</h1>
                <form>
                    <div className="box">
                        <label>Campaign Name:</label><br></br>
                        <input type="text" name="title" placholder="title" value={this.state.title} onChange={this.titleChange}/><br></br>
                        <label>Location:</label><br></br>
                        <input type="text" name="location" value={this.state.location} onChange={this.titleChange}/><br></br>
                        <label>Description:</label><br></br>
                        <textarea name="desc" cols="80" value={this.state.desc} onChange={this.titleChange} style={{height: 200}}></textarea><br></br>
                    </div>
                    <div className="box">
                        <label>Experience Level:</label><br></br>
                        <select  onChange={this.expChange}>
                            <option value="Anyone is Welcome">Anyone is Welcome</option>
                            <option value="Some Experience Preferred">Some Experience Preferred</option>
                            <option value="Veterans">Veterans</option>
                        </select>
                    </div>
                    <div className="box">
                        <label>Role Playing Intensity:</label><br></br>
                        <select onChange={this.intensityChange}>
                            <option value="As intense (or not) as you want">As intense (or not) as you want</option>
                            <option value="We won't be breaking character">We won't be breaking character</option>
                        </select>
                    </div>
                    <button onClick={this.handleSubmit}>Submit</button>
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