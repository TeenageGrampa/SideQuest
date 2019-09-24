import React, { Component } from 'react';
import { connect } from 'react-redux'

class LoginPage extends Component {
  state = {
    username: '',
    password: ''
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
    .then(res => res.json())
    .then(data => {
      if (data.token) {
        localStorage.token = data.token
        
        this.props.history.push('/profile')

      }
    })
  }

  render() {
      console.log(this.props)
    return (
      <div>
        <h1>Log in please!</h1>
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleChange} value={this.state.username} type="text" name="username"/>
          <input onChange={this.handleChange} value={this.state.password} type="password" name="password"/>
          <input type="submit" value="Log in"/>
        </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);