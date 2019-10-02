import React from  'react'
import { connect } from 'react-redux'
import NavBar from './NavBar'



class AllCaracters extends React.Component{

    state = {
        character: {},
        savingProf: {
            strength: 0,
            dexterity: 0,
            constitution: 0,
            intelligence: 0,
            wisdom: 0,
            charisma: 0
        },
    }

    componentWillMount(){
        const savingProf = this.props.location.state.character.class[0].prof_saving_throws.toLowerCase().split(', ')
        this.setState({
            savingProf: {
                ...this.state.savingProf,
                [savingProf[0]]: 2,
                [savingProf[1]]: 2
            }
        })
    }

    getClassImg = (charClass) => {
        if(charClass === 'Rogue'){
            return require('./hooded-assassin.png')
        } else if(charClass === 'Barbarian'){
            return require('./barbarian.png')
        } else if(charClass === 'Paladin'){
            return require('./elf-helmet.png')
        } else if(charClass === 'Warlock'){
            return require('./warlock-hood.png')
        } else if(charClass === 'Ranger'){
            return require('./cowled.png')
        } else if(charClass === 'Bard'){
            return require('./musical-notes.png')
        } else if(charClass === 'Cleric'){
            return require('./pope-crown.png')
        } else if(charClass === 'Druid'){
            return require('./wolf-head.png')
        } else if(charClass === 'Fighter'){
            return require('./swordman.png')
        } else if(charClass === 'Monk'){
            return require('./monk-face.png')
        } else if(charClass === 'Sorcerer'){
            return require('./robe.png')
        } else if(charClass === 'Wizard'){
            return require('./wizard-staff.png')
        }
    }

    getRaceImg = (charRace) => {
        if(charRace === 'Dwarf'){
            return require('./dwarf-king.png')
        } else if(charRace === 'Hill Dwarf'){
            return require('./dwarf-king.png')
        } else if(charRace === 'Elf'){
            return require('./woman-elf-face.png')
        }else if(charRace === 'High Elf'){
            return require('./woman-elf-face.png')
        } else if(charRace === 'Halfling'){
            return require('./hobbit-dwelling.png')
        } else if(charRace === 'Lightfoot'){
            return require('./hobbit-dwelling.png')
        } else if(charRace === 'Human'){
            return require('./sensuousness.png')
        } else if(charRace === 'Dragonborn'){
            return require('./spiked-dragon-head.png')
        } else if(charRace === 'Gnome'){
            return require('./bad-gnome.png')
        } else if(charRace === 'Rock Gnome'){
            return require('./bad-gnome.png')
        } else if(charRace === 'Half-Elf'){
            return require('./elf-ear.png')
        } else if(charRace === 'Half-Orc'){
            return require('./orc-head.png')
        } else if(charRace === 'Tiefling'){
            return require('./horned-reptile.png')
        } 
    }

    // componentDidMount(){
    //     fetch(`http://localhost:3000/characters/${this.props.location.state.character.id}`)
    //     .then(r => r.json())
    //     .then(character => this.setState({
    //         character: character
    //     }))
        
    // }


    render(){
        console.log(this.state)
        console.log(this.props.location.state)
        const clasImg = this.getClassImg(this.props.location.state.character.class[0].name)
        const raceImg = this.getRaceImg(this.props.location.state.character.race[0].name)
        return(
            <div className="container">
                <NavBar />
                <button onClick={this.handleLogout} className="button is-black" style={{marginLeft: 100, borderStyle: 'ridge', boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)'}}>Logout</button>
                <div className="container box " style={{ backgroundImage: `url(https://media1.giphy.com/media/3o6UB9xT8upEDGrcqs/giphy.gif)`, backgroundSize: 'cover', margin: 20, borderStyle: 'ridge', boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)', borderRadius: 10}}>
                    <div className="box columns" style={{borderStyle: 'ridge', boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)', borderRadius: 10}}>
                        <div className="column is-4">
                        <h1 className="subtitle">
                            Name: 
                        </h1>
                        <p className="title">{this.props.location.state.character.name}</p>
                        </div>
                        <div className="column is-4">
                            <h1 className="subtitle">
                                Class:
                            </h1>
                            <img src={clasImg} className="image is-96x96" style={{borderStyle: 'ridge', boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)', borderRadius: 10}} />
                            <p>{this.props.location.state.character.class[0].name}</p>
                        </div>
                        <div className="column  is-4">
                            <h1 className="subtitle">
                                Race:
                            </h1>
                            <img src={raceImg} className="image is-96x96" style={{ borderStyle: 'ridge', boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)', borderRadius: 10}} />
                            <p>{this.props.location.state.character.race[0].name}</p>
                        </div>
                    </div>
                    <div className="columns">
                        <div className="column is-2">
                        <div className="column content" >
                            <ul>
                            <h2 style={{color: 'white'}}>Stats:</h2>
                            <p style={{color: 'white'}}>Strength - {this.props.location.state.character.stats[0].strength}</p><br></br>
                            <p className="box" style={{width: 60, borderStyle: 'ridge', boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)', borderRadius: 10}}>{this.props.location.state.character.mods[0].strmod}</p><br></br>
                            <p style={{color: 'white'}}>Dexterity - {this.props.location.state.character.stats[0].dexterity}</p><br></br>
                            <p className="box" style={{width: 60, borderStyle: 'ridge', boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)', borderRadius: 10}}>{this.props.location.state.character.mods[0].dexmod}</p><br></br>
                            <p style={{color: 'white'}}>Constitution - {this.props.location.state.character.stats[0].constitution}</p><br></br>
                            <p className="box" style={{width: 60, borderStyle: 'ridge', boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)', borderRadius: 10}}>{this.props.location.state.character.mods[0].conmod}</p><br></br>
                            <p style={{color: 'white'}}>Intelligence - {this.props.location.state.character.stats[0].intelligence}</p><br></br>
                            <p className="box" style={{width: 60, borderStyle: 'ridge', boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)', borderRadius: 10}}>{this.props.location.state.character.mods[0].intmod}</p><br></br>
                            <p style={{color: 'white'}}>Wisdom - {this.props.location.state.character.stats[0].wisdom}</p><br></br>
                            <p className="box" style={{width: 60, borderStyle: 'ridge', boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)', borderRadius: 10}}>{this.props.location.state.character.mods[0].wismod}</p><br></br>
                            <p style={{color: 'white'}}>Charisma - {this.props.location.state.character.stats[0].charisma}</p><br></br>
                            <p className="box" style={{width: 60, borderStyle: 'ridge', boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)', borderRadius: 10}}>{this.props.location.state.character.mods[0].chrmod}</p><br></br>
                            </ul> 
                        </div>
                        </div>
                        <div className="column is-2">
                            <p style={{color: 'white'}}>Proficiency Modifier:</p>
                            <div className="box" style={{borderStyle: 'ridge', boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)', borderRadius: 10, width: 180}}>+ 2</div>
                            <ul className="box" style={{borderStyle: 'ridge', boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)', borderRadius: 10, width: 180}}>
                                <p>Saving Throws:</p>
                                <li>Strength: {this.props.location.state.character.mods[0].strmod + this.state.savingProf.strength}</li>
                                <li>Dexterity: {this.props.location.state.character.mods[0].dexmod + this.state.savingProf.dexterity}</li>
                                <li>Constitution: {this.props.location.state.character.mods[0].conmod + this.state.savingProf.constitution}</li>
                                <li>Intelligence: {this.props.location.state.character.mods[0].intmod + this.state.savingProf.intelligence}</li>
                                <li>Wisdom: {this.props.location.state.character.mods[0].wismod + this.state.savingProf.wisdom}</li>
                                <li>Charisma: {this.props.location.state.character.mods[0].chrmod + this.state.savingProf.charisma}</li>
                            </ul>
                            <div className="box" style={{borderStyle: 'ridge', boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)', borderRadius: 10, width: 200}}>
                                <h2>Skills:</h2>
                            <p>Acrobatics (Dex) - {this.props.location.state.character.skills[0].acrobatics}</p>
                            <p>Animal Handling (Wis) - {this.props.location.state.character.skills[0].animal_handling}</p>
                            <p>Arcana (Int) - {this.props.location.state.character.skills[0].arcana}</p>
                            <p>Athletics (Str) - {this.props.location.state.character.skills[0].athlectics}</p>
                            <p>Deception (Cha) - {this.props.location.state.character.skills[0].deception}</p>
                            <p>History (Int) - {this.props.location.state.character.skills[0].history}</p>
                            <p>Insight (Wis) - {this.props.location.state.character.skills[0].insight}</p>
                            <p>Intimidation (Cha) - {this.props.location.state.character.skills[0].intimidation}</p>
                            <p>Investigation (Int) - {this.props.location.state.character.skills[0].investigation}</p>
                            <p>Medicine (Wis) - {this.props.location.state.character.skills[0].medicine}</p>
                            <p>Nature (Int) - {this.props.location.state.character.skills[0].nature}</p>
                            <p>Perception (Wis) - {this.props.location.state.character.skills[0].perception}</p>
                            <p>Performance (Cha) - {this.props.location.state.character.skills[0].performance}</p>
                            <p>Persuasion (Cha) - {this.props.location.state.character.skills[0].persuasion}</p>
                            <p>Religion (Int) - {this.props.location.state.character.skills[0].religion}</p>
                            <p>Sleight of Hand (Dex) - {this.props.location.state.character.skills[0].sleight_of_hand}</p>
                            <p>Stealth (Dex) - {this.props.location.state.character.skills[0].stealth}</p>
                            <p>Survival (Wis) - {this.props.location.state.character.skills[0].survival}</p>
                            </div>
                        </div>
                        <div className="column is-4"></div>
                        <div className="column is-4">
                            <div className="box" style={{borderStyle: 'ridge', boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)', borderRadius: 10}} >
                            <h2>Passive Perception:</h2>
                            <p>{10 + this.props.location.state.character.stats[0].passive_perception}</p>
                            </div>
                            <div className="box" style={{borderStyle: 'ridge', boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)', borderRadius: 10}} >
                                <p>Armor Class: {this.props.location.state.character.stats[0].armor_class}</p>
                            </div>
                            <div className="box" style={{borderStyle: 'ridge', boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)', borderRadius: 10}}>
                                <p>Other Proficiencies:</p>
                                <ul>
                                    <li>weapons: {this.props.location.state.character.class[0].prof_weapons}</li>
                                    <li>tools: {this.props.location.state.character.class[0].prof_tools}</li>
                                </ul>
                            </div>
                            <div className="box" style={{borderStyle: 'ridge', boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)', borderRadius: 10}} >
                                <p>Initiative: {this.props.location.state.character.mods[0].dexmod}</p>
                                <p>Speed: {this.props.location.state.character.race[0].speed}</p>
                            </div>
                            <div className="box" style={{borderStyle: 'ridge', boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)', borderRadius: 10}} >
                                <p>Hit Dice: {this.props.location.state.character.class[0].hit_dice}</p>
                                <p>Max HP: {this.props.location.state.character.stats[0].hp}</p>
                            </div>
                            <div className="box" style={{borderStyle: 'ridge', boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)', borderRadius: 10}}>
                                <p>Languages:</p>
                                <p>{this.props.location.state.character.race[0].languages.split('_**').pop()}</p>
                            </div>
                            <div className="box" style={{borderStyle: 'ridge', boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)', borderRadius: 10}}>
                                <p>Equipment:</p>
                                <p>{this.props.location.state.character.class[0].equipment}</p>
                            </div>
                        </div>
                    </div>
                </div>
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
      }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllCaracters);