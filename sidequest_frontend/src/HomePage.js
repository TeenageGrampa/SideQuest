import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class HomePage extends Component {
  render () {
    console.log(this.props)
    return (
      <div className="container" >
        <div className="box" style={{height: 700,  marginTop: 150, backgroundImage: `url(http://fanaru.com/fantasy-art/image/232259-fantasy-art-a-burning-rose.gif)`, backgroundSize: 'cover', borderStyle: 'ridge', boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)', borderRadius: 10}} id="logo" >
          <h1 style={{textAlign: 'center', color: 'white', marginTop: 150}} className="subtitle">Welcome to</h1>
          <h1 style={{textAlign: 'center', color: 'white', fontSize: 125, marginTop: 100}} className="title">SideQuest</h1>
        </div>
        <ul>
        <div className="columns">
          <li className="column subtitle navHome" style={{marginLeft: 400}}><Link to="/login">Go to Login</Link></li>
          <li className="column subtitle navHome"><Link to="/signup">Go to Signup</Link></li>
        </div>
        </ul>
      </div>
    );
  }
}

export default HomePage;