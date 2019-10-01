import React from  'react'
import { connect } from 'react-redux'

class CharacterSelect extends React.Component{

    state= {
        currentlySelected: 0
    }

    handleChange = (e) => {
        this.setState({
            currentlySelected: e.target.value
        })
    }

    handleClick = (e) => {
        e.preventDefault()
        this.props.SelectCharacter(this.props.characters[this.state.currentlySelected])
    }

    
    render(){
        const charBtns = this.props.characters.map((character, index) => <option  key={character.id} value={index}>{character.name} - Class: {character.class[0].name} - Race: {character.race[0].name} - Alignment: {character.alignment}</option>)
        return(
            <div  style={{ width: 600 }}clasName="control">
                <form >
                    <label className="title" style={{color: 'white'}}>Select Current Character</label><br></br>
                    <select  style={{marginTop: 50}} onChange={this.handleChange}>
                        {charBtns}
                    </select><br></br>
                    <button style={{marginTop: 50}} onClick={this.handleClick} className="button is-black">Select</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        currentUser: store.currentUser,
        selectedCharacter: store.selectedCharacter
    }
}
  
const mapDispatchToProps = (dispatch) => {
    return {
      LogIn: (loggedInUser) => {
        dispatch({ type: 'LOGIN_CURRENT_USER', user: loggedInUser })
      },
      SelectCharacter: (character) => {
          dispatch({
              type: 'CHARACTER_SELECT', character
          })
      }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterSelect);