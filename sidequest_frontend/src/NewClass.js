import React from  'react'
import { connect } from 'react-redux'
import ClassInfo from './ClassInfo'


class NewCharacter extends React.Component{
    state = {
        allClasses: [],
        currentClass: 'barbarian'
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
        fetch('https://api-beta.open5e.com/classes/')
        .then(r => r.json())
        .then(data => this.setState({
            allClasses: data.results
        }))
    }

    handleChange = (e) =>{
        const newClass = e.target.value
        this.setState({
            currentClass: newClass
        })
    }

    saveClass = (charClass) => {
        this.props.AddClass(charClass)
        console.log(this.props)
    }

    handleNext = () => {
        this.props.history.push('NewRace')
    }



    render(){
        console.log(this.props)
        const classComps = this.state.allClasses.map(charClass => <ClassInfo key={charClass.id} saveClass={this.saveClass} charClass={charClass} /> )
        return(
            <div>
                <h1>Choose Your Class:</h1>
                <h2>Currently Selected: {this.props.newCharClass ? <div>{this.props.newCharClass.name} <button onClick={this.handleNext}>Confirm</button></div> : null}</h2>
                <select onChange={this.handleChange}>
                    <option value="barbarian">Barbarian</option>
                    <option value="bard">Bard</option>
                    <option value="cleric">Cleric</option>
                    <option value="druid">Druid</option>
                    <option value="fighter">Fighter</option>
                    <option value="monk">Monk</option>
                    <option value="paladin">Paladin</option>
                    <option value="ranger">Ranger</option>
                    <option value="rogue">Rogue</option>
                    <option value="sorcerer">Sorcerer</option>
                    <option value="warlock">Warlock</option>
                    <option value="wizard">Wizard</option>
                </select>
                {this.state.currentClass === 'barbarian' ? classComps[0] : null}
                {this.state.currentClass === 'bard' ? classComps[1] : null}
                {this.state.currentClass === 'cleric' ? classComps[2] : null}
                {this.state.currentClass === 'druid' ? classComps[3] : null}
                {this.state.currentClass === 'fighter' ? classComps[4] : null}
                {this.state.currentClass === 'monk' ? classComps[5] : null}
                {this.state.currentClass === 'paladin' ? classComps[6] : null}
                {this.state.currentClass === 'ranger' ? classComps[7] : null}
                {this.state.currentClass === 'rogue' ? classComps[8] : null}
                {this.state.currentClass === 'sorcerer' ? classComps[9] : null}
                {this.state.currentClass === 'warlock' ? classComps[10] : null}
                {this.state.currentClass === 'wizard' ? classComps[11] : null}
            </div>
        )
    }
}

const mapStateToProps = (store) => {
    return {
      currentUser: store.currentUser,
      newCharClass: store.newCharClass
    }
}
  
const mapDispatchToProps = (dispatch) => {
    return {
      LogIn: (loggedInUser) => {
        dispatch({ type: 'LOGIN_CURRENT_USER', user: loggedInUser })
      },
      AddClass: (charClass) => {
          dispatch({ type: 'ADD_CLASS', attribute: charClass })
      }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewCharacter);