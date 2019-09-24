import React from  'react'
import { connect } from 'react-redux'
import RaceInfo from './RaceInfo'


class NewCharacter extends React.Component{
    state = {
        allRaces: [],
        currentRace: 'Dwarf'
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
        fetch('https://api-beta.open5e.com/races/')
        .then(r => r.json())
        .then(data => this.setState({
            allRaces: data.results
        }))
    }

    handleChange = (e) =>{
        const newRace = e.target.value
        this.setState({
            currentRace: newRace
        })
    }

    saveRace = (charRace) => {
        this.props.AddRace(charRace)
        console.log(this.props)
    }

    handleNext = () => {
        this.props.history.push('/StatRoll')
    }



    render(){
        // console.log(this.props)
        // console.log(this.state)
        const raceComps = this.state.allRaces.map(charRace => <RaceInfo key={charRace.id} saveRace={this.saveRace} charRace={charRace} /> )
        return(
            <div>
                <h1>Choose Your Race:</h1>
                <h2>Currently Selected: {this.props.newCharRace ? <div>{this.props.newCharRace.name} <button onClick={this.handleNext}>Confirm</button></div> : null}</h2>
                <select onChange={this.handleChange}>
                    <option value="Dwarf">Dwarf</option>
                    <option value="Elf">Elf</option>
                    <option value="Halfling">Halfling</option>
                    <option value="Human">Human</option>
                    <option value="Dragonborn">Dragonborn</option>
                    <option value="Gnome">Gnome</option>
                    <option value="Half-Elf">Half-Elf</option>
                    <option value="Half-Orc">Half-Orc</option>
                    <option value="Tiefling">Tiefling</option>
                </select>
                <h2>Chosen Class: {this.props.newCharClass.name}</h2>
                {this.state.currentRace === 'Dwarf' ? raceComps[0] : null}
                {this.state.currentRace === 'Elf' ? raceComps[1] : null}
                {this.state.currentRace === 'Halfling' ? raceComps[2] : null}
                {this.state.currentRace === 'Human' ? raceComps[3] : null}
                {this.state.currentRace === 'Dragonborn' ? raceComps[4] : null}
                {this.state.currentRace === 'Gnome' ? raceComps[5] : null}
                {this.state.currentRace === 'Half-Elf' ? raceComps[6] : null}
                {this.state.currentRace === 'Half-Orc' ? raceComps[7] : null}
                {this.state.currentRace === 'Tiefling' ? raceComps[8] : null}
            </div>
        )
    }
}

const mapStateToProps = (store) => {
    return {
      currentUser: store.currentUser,
      newCharClass: store.newCharClass,
      newCharRace: store.newCharRace
    }
}
  
const mapDispatchToProps = (dispatch) => {
    return {
      LogIn: (loggedInUser) => {
        dispatch({ type: 'LOGIN_CURRENT_USER', user: loggedInUser })
      },
      AddRace: (charRace) => {
          dispatch({ type: 'ADD_Race', attribute: charRace })
      }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewCharacter);