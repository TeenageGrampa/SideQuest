import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

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
        fetch('http://localhost:3000/profile',{
        headers: {
          'Authorization': `Bearer ${localStorage.token}`
        }
        })
        .then(res => res.json())
        .then(user => 
        this.props.LogIn(user),
        this.setState({

        }, () => {
          this.props.history.push('/profile')
        })
        )


      }
    })
  }

  render() {
      console.log(this.props)
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="box " style={{width: 900, borderStyle: 'ridge', boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)', borderRadius: 10, backgroundImage: `url(http://fanaru.com/fantasy-art/image/232259-fantasy-art-a-burning-rose.gif)`, backgroundSize: 'cover', marginTop: 200, marginLeft: 200}}>
          <h1 className="title" style={{color: 'white', textAlign: 'center'}}>Log in please!</h1>
          <input className="input is-medium is-rounded" style={{marginTop: 50, marginBottom: 50}} onChange={this.handleChange} value={this.state.username} type="text" name="username"/>
          <input className="input is-medium is-rounded" style={{marginTop: 50, marginBottom: 50}} onChange={this.handleChange} value={this.state.password} type="password" name="password"/>
          <input className="button is-white" type="submit" value="Log in"/>
          <Link className="button is-white" to={{pathname:'./signup'}} style={{marginLeft: 5}}>SignUp</Link>
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