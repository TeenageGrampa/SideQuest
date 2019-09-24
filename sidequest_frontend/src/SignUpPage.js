import React, { Component } from 'react';
import uuid from 'uuid';

class SignUpPage extends Component {
    state = {
      id: 0,
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
    
            this.props.history.push('/profile')
    
          }
        })
    }

    handleChange = (e) => {
        this.setState({
          [e.target.name]: e.target.value
        })
    }

    componentDidMount(){
      const id = uuid();
      this.setState({
        id: id
      })
    }


  render() {
    return (
      <div>
        <h1>Signup please!</h1>
        <form>
          <input type="text" name="username" onChange={this.handleChange} value={this.state.username}/>
          <input type="password" name="password" onChange={this.handleChange} value={this.state.password}/>
          <input type="submit" value="Signup" onClick={this.handleSubmit}/>
        </form>
      </div>
    );
  }
}

export default SignUpPage;