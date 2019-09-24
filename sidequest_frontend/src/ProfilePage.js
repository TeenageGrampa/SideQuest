import React, { Component } from 'react';
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'

class ProfilePage extends Component {

    state = {
        username: ''
    }

  handleClick = () => {
    localStorage.clear()
    this.props.history.push('/login')
  }

  componentDidMount(){
    fetch('http://localhost:3000/profile',{
    headers: {
      'Authorization': `Bearer ${localStorage.token}`
    }
    })
    .then(res => res.json())
    .then(user => this.props.LogIn(user)
    )
    
  }

  newChar = () => {
      this.props.history.push('/NewClass')
  }

  render() {
    // console.log(this.props.currentUser.currentUser)
    console.log(this.state)
    console.log(this.props)
    return (
      <div>
        <button onClick={this.handleClick}>Logout</button>
        {
          this.state.username ?
          <h1>Welcome {this.state.username}!</h1> :
          <h1>getting your info...</h1>
        }
        <button onClick={this.newChar}>Add Character</button>
      </div>
    );
  }
}

const mapStateToProps = (store) => {
    return {
      currentUser: store.currentUser
    }
}
  
const mapDispatchToProps = (dispatch) => {
    return {
      LogIn: (loggedInUser) => {
        dispatch({ type: 'LOGIN_CURRENT_USER', user: loggedInUser })
      }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);