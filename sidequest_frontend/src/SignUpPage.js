import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class SignUpPage extends Component {
    state = {
      username: '',
      password: ''
    }

    handleSubmit = (e) => {
    
        e.preventDefault()
        fetch('http://localhost:3000/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(this.state)
        }).then(r => r.json()).then(data => {
          if (data.token) {
            localStorage.token = data.token
    
            this.props.history.push('/NewClass')
    
          } else {
            alert('Username Taken')
          }
        })
    }

    handleChange = (e) => {
        this.setState({
          [e.target.name]: e.target.value
        })
    }



  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="box " style={{width: 900, backgroundImage: `url(http://fanaru.com/fantasy-art/image/232259-fantasy-art-a-burning-rose.gif)`, backgroundSize: 'cover',borderStyle: 'ridge', boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)', borderRadius: 10, marginTop: 200, marginLeft: 200}}>
          <h1 className="title" style={{color: 'white', textAlign: 'center'}}>Sign Up please!</h1>
          <input className="input is-medium is-rounded" style={{marginTop: 50, marginBottom: 50}} onChange={this.handleChange} value={this.state.username} type="text" name="username"/>
          <input className="input is-medium is-rounded" style={{marginTop: 50, marginBottom: 50}} onChange={this.handleChange} value={this.state.password} type="password" name="password"/>
          <input className="button is-white" type="submit" onClick={this.handleSubmit} value="Sign Up"/>
          <Link className="button is-white" to={{pathname:'./login'}} style={{marginLeft: 5}}>LogIn</Link>
        </form>
      </div>
    );
  }
}

export default SignUpPage;