import React from  'react'
import { connect } from 'react-redux'
import NavBar from './NavBar'
import Request from'./Request'



class Inbox extends React.Component{

    
    handleLogout = () => {
        localStorage.clear()
        this.props.history.push('/')
    }

    handleDelete = (request) => {
        const filteredRequests = this.props.requests.filter( ele => {
            if(ele !== request){
                return ele
            }
        })
        this.props.AddRequests(filteredRequests)
    }



    render(){
        console.log(this.props.requests)
        // const requestComps = this.props.requests.map( request => <Request request={request}/>)
        return(
            <div className="container">
                <NavBar />
                <button onClick={this.handleLogout} className="button is-black" style={{marginLeft: 100, borderStyle: 'ridge', boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)', borderRadius: 10 }}>Logout</button>
                <div className="title">
                    <h1>Inbox:</h1>
                    {this.props.requests ? this.props.requests.map( request => <Request handleDelete={this.handleDelete} request={request}/>) : <p>You have no requests at this time</p>}

                </div>
            </div>
        )
    }
}

const mapStateToProps = (store) => {
    return {
      currentUser: store.currentUser,
      requests: store.requests
    }
}
  
const mapDispatchToProps = (dispatch) => {
    return {
      LogIn: (loggedInUser) => {
        dispatch({ type: 'LOGIN_CURRENT_USER', user: loggedInUser })
      },
      AddRequests: (requests) => {
          dispatch({ type: 'AddRequests', requests})
      }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Inbox);