import React from  'react'
import { connect } from 'react-redux'
import ClassInfo from './ClassInfo'


class NewClass extends React.Component{
    state = {
        allClasses: [],
        currentClass: 'barbarian',
        characterName: '',
        characterAlignment: 'True Neutral'
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
        
    }

    handleNext = () => {
        if(this.state.characterName){
            fetch('http://localhost:3000/characters', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: this.state.characterName,
                level: 1,
                alignment: this.state.characterAlignment,
                user_id: this.props.currentUser.id
            })
        }).then(r => r.json()).then(character => this.setState({
            character_id: character.id
        },() => {fetch('http://localhost:3000/character_classes', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
                },
                body: JSON.stringify({
                    character_id: this.state.character_id,
                    name: this.props.newCharClass.name,
                    desc: this.props.newCharClass.desc,
                    hit_dice: this.props.newCharClass.hit_dice, 
                    armor_prof: this.props.newCharClass.armor_prof,
                    prof_weapons: this.props.newCharClass.prof_weapons,
                    prof_tools: this.props.newCharClass.prof_tools,
                    prof_saving_throws: this.props.newCharClass.prof_saving_throws,
                    prof_skills: this.props.newCharClass.prof_skills,
                    equipment: this.props.newCharClass.equipment,
                    spellcast_ability: this.props.newCharClass.spellcasting_ability
                })
            }).then(r => r.json()).then(this.props.AddCharID(this.state.character_id)).then(this.props.history.push('/NewRace'))}))
        } else {
            alert('Your Character Needs a Name!')
        }
    }

    nameChange = (e) =>{
        this.setState({
            characterName: e.target.value
        })
    }
    alignmentChoice = (e) => {
        this.setState({
            characterAlignment: e.target.value
        })
    }

    handleLogout = () => {
        localStorage.clear()
        this.props.history.push('/')
    }



    render(){
        const classComps = this.state.allClasses.map(charClass => <ClassInfo key={charClass.id} saveClass={this.saveClass} charClass={charClass} /> )
        return(
            <div className="container">
                <section className="hero" style={{backgroundImage: `url(http://fanaru.com/fantasy-art/image/232259-fantasy-art-a-burning-rose.gif)`, backgroundSize: 'cover', boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)'}}>
                    <div className="hero-body">
                        <div className="container content">
                            <h1 className="title" style={{color: 'white'}}>
                                Name Your Character and Pick Alignment:
                            </h1>
                            <form className="columns">
                            <label className="column is-2" style={{color: 'white', textAlign: 'right'}}>Name: </label>
                            <input className="column is-2" type='text' placeholder="name" value={this.state.characterName} onChange={this.nameChange}/>
                            <label className="column is-2" style={{color: 'white', textAlign: 'right'}}>Alignment: </label>
                            <select className="column is-2" onChange={this.alignmentChoice}>
                                <option value="True Neutral">True Neutral</option>
                                <option value="Chaotic Neutral">Chaotic Neutral</option>
                                <option value="Lawful Neutral">Lawful Neutral</option>
                                <option value="True Evil">True Evil</option>
                                <option value="True Good">True Good</option>
                                <option value="Lawful Good">Lawful Good</option>
                                <option value="Lawful Evil">Lawful Evil</option>
                                <option value="Chaotic Good">Chaotic Good</option>
                                <option value="Chaotic Evil">Chaotic Evil</option>
                            </select>
                        </form>
                        <button onClick={this.handleLogout} className="button is-black" style={{marginLeft: 100}}>Logout</button>
                        </div>
                    </div>
                </section>

                <div className="columns" >
                <div className="column is-4">
                <h1 className="title">Choose Your Class:</h1>
                </div>
                <div className="column is-4">
                    <h2>Currently Selected: </h2>
                
                {this.props.newCharClass ? <div className="title">{this.props.newCharClass.name} <button className="button is-black" onClick={this.handleNext}>Confirm</button></div> : null}
                </div>
                <div className="column is-4 field">
                <select onChange={this.handleChange} className="select is-large ">
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
                </div>
                </div>
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
      newCharClass: store.newCharClass,
      character_id: store.character_id
    }
}
  
const mapDispatchToProps = (dispatch) => {
    return {
      LogIn: (loggedInUser) => {
        dispatch({ type: 'LOGIN_CURRENT_USER', user: loggedInUser })
      },
      AddClass: (charClass) => {
          dispatch({ type: 'ADD_CLASS', attribute: charClass })
      },
      AddCharID: (character_id) => {
          dispatch({ type: 'ADD_CHARACTER_ID', character_id: character_id})
      }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewClass);