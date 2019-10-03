import React from  'react'
import { connect } from 'react-redux'
import Skills from './Skills'



class NewCharacter extends React.Component{

    state = {
        strMod: 0,
        dexMod: 0,
        conMod: 0,
        intMod: 0,
        wisMod: 0,
        chrMod: 0,
        savingProf: {
            strength: 0,
            dexterity: 0,
            constitution: 0,
            intelligence: 0,
            wisdom: 0,
            charisma: 0
        },
        proficiencyPoints: 0,
        armor: '',
        armorClass: 0,
        shield: false, 
        characterName: '',
        characterAlignment: 'True Neutral',
        character_id: 0
    }

    componentDidMount(){
        this.setState({
            strMod: this.props.mods.strMod,
            dexMod: this.props.mods.dexMod,
            conMod: this.props.mods.conMod,
            intMod: this.props.mods.intMod,
            wisMod: this.props.mods.wisMod,
            chrMod: this.props.mods.chrMod
        })
        const savingProf = this.props.newCharClass.prof_saving_throws.toLowerCase().split(', ')
        this.setState({
            savingProf: {
                ...this.state.savingProf,
                [savingProf[0]]: 2,
                [savingProf[1]]: 2
            }
        })
        this.handleReset()
        
    }

    handleChoice = () => {
        if(this.state.proficiencyPoints > 0 ){
            this.setState({
                proficiencyPoints: this.state.proficiencyPoints - 1
            })
        } else if (this.state.proficiencyPoints === 0 ){
            return
        }
    }

    handleReset = () => {
        if(this.props.newCharClass.name === 'Barbarian'){
            this.setState({
                proficiencyPoints: 2
            })
        } else if (this.props.newCharClass.name === 'Bard'){
            this.setState({
                proficiencyPoints: 3
            })
        } else if (this.props.newCharClass.name === 'CLeric'){
            this.setState({
                proficiencyPoints: 2
            })
        } else if (this.props.newCharClass.name === 'Druid'){
            this.setState({
                proficiencyPoints: 2
            })
        } else if (this.props.newCharClass.name === 'Fighter'){
            this.setState({
                proficiencyPoints: 2
            })
        } else if (this.props.newCharClass.name === 'Monk'){
            this.setState({
                proficiencyPoints: 2
            })
        } else if (this.props.newCharClass.name === 'Paladin'){
            this.setState({
                proficiencyPoints: 2
            })
        } else if (this.props.newCharClass.name === 'Ranger'){
            this.setState({
                proficiencyPoints: 3
            })
        } else if (this.props.newCharClass.name === 'Rogue'){
            this.setState({
                proficiencyPoints: 4
            })
        } else if (this.props.newCharClass.name === 'Sorcerer'){
            this.setState({
                proficiencyPoints: 2
            })
        } else if (this.props.newCharClass.name === 'Warlock'){
            this.setState({
                proficiencyPoints: 2
            })
        } else if (this.props.newCharClass.name === 'Wizard'){
            this.setState({
                proficiencyPoints: 2
            })
        }
    }

    handleNext = (skills) => {
        this.props.AddSkills(skills)
    }

    handleArmor = (e) =>{
        if(e.target.value === 'shields' || e.target.value === 'shields (druids will not wear armor or use shields made of metal)'){
            if(this.state.shield === false){
                this.setState({
                    armorClass: this.state.armorClass + 2
                })
            }
            this.setState({
                shield: true
            })
        } else {
            this.setState({
                armor: e.target.value.toLowerCase()
            },() =>  {this.calculateArmor()})
        }
    }

    calculateArmor = () => {
        if(this.state.armor === 'light armor'){
            const armorClass = this.props.mods.dexMod + 11
            this.setState({
                armorClass: armorClass
            })
        } else if (this.state.armor === 'medium armor'){
            const armorClass = this.props.mods.dexMod + 12
            this.setState({
                armorClass: armorClass
            }) 
        } else if (this.state.armor === 'heavy armor'){
            const armorClass = 14
            this.setState({
                armorClass: armorClass
            }) 
        } else if (this.state.armor === 'none'){
            const armorClass = this.props.mods.dexMod + 10
            this.setState({
                armorClass: armorClass
            })
        }
        
    }


    handleSubmit =(e) =>  {
        e.preventDefault()
        if(this.props.skills && this.state.armorClass > 0){
        const hitDieNum = this.props.newCharClass.hit_dice.split('d')[1]
        const maxHP = parseInt(hitDieNum) + this.props.mods.conMod
                fetch('http://localhost:3000/character_skills', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
                },
                body: JSON.stringify({
                    character_id: this.props.character_id,
                    acrobatics: this.props.skills.Acrobatics,
                    animal_handling: this.props.skills.AnimalHandling,
                    arcana: this.props.skills.Arcana,
                    athletics: this.props.skills.Athletics,
                    deception: this.props.skills.Deception,
                    history: this.props.skills.History,
                    insight: this.props.skills.Insight,
                    intimidation: this.props.skills.Intimidation,
                    investigation: this.props.skills.Investigation,
                    medicine: this.props.skills.Medicine,
                    nature: this.props.skills.Nature,
                    perception: this.props.skills.Perception,
                    performance: this.props.skills.Performance,
                    persuasion: this.props.skills.Persuasion,
                    religion: this.props.skills.Religion,
                    sleight_of_hand: this.props.skills.SleightofHand,
                    stealth: this.props.skills.Stealth
                })
            }).then(r => r.json()).then(console.log)
                fetch('http://localhost:3000/character_stats', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
                },
                body: JSON.stringify({
                    character_id: this.props.character_id,
                    strength: this.props.stats.strength,
                    dexterity: this.props.stats.dexterity,
                    constitution: this.props.stats.constitution,
                    intelligence: this.props.stats.intelligence,
                    wisdom: this.props.stats.wisdom,
                    charisma: this.props.stats.charisma,
                    initiative: this.props.mods.dexMod,
                    hp: maxHP,
                    armor_class: this.state.armorClass,
                    passive_perception: 10 + this.props.skills.Perception,
                    proficiency_mod: 2
                })
            }).then(r => r.json()).then(this.handleCreate)
            } else {
            alert('You must pick skill proficiencies and armor class')
            }
        }
            
    

    handleCreate = () => {
        this.props.history.push('./profile')
    }

    handleLogout = () => {
        localStorage.clear()
        this.props.history.push('/')
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

    
    
    render(){
        const clasImg = this.getClassImg(this.props.newCharClass.name)
        const raceImg = this.getRaceImg(this.props.newCharRace.name)
        const hitDieNum = this.props.newCharClass.hit_dice.split('d')[1]
        const maxHP = parseInt(hitDieNum) + this.props.mods.conMod
        const armorChoices = this.props.newCharClass.prof_armor.split(', ')
        const armorBtns = armorChoices.map(choice => choice === 'All armor' ? <div><button onClick={this.handleArmor} value="light armor">Light armor</button><button onClick={this.handleArmor} value="medium armor">Medium armor</button><button onClick={this.handleArmor} value="heavy armor">Heavy armor</button></div> : <button value={choice} onClick={this.handleArmor}>{choice}</button>)
        return(
            <div className="container">
                <section className="hero" style={{borderStyle: 'ridge', boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)', borderRadius: 10, backgroundImage: `url(http://fanaru.com/fantasy-art/image/232259-fantasy-art-a-burning-rose.gif)`, backgroundSize: 'cover'}}>
                    <div className="hero-body">
                        <div className="container">
                            <h1 className="title" style={{color: 'white'}}>
                                Pick Proficiencies & Armor class:
                            </h1>
                            <p className="subtitle" style={{color: 'white'}}>
                                You have {this.state.proficiencyPoints} given by your class. Confirm how to use them and pick your armor class before you confirm.
                            </p>
                            <button onClick={this.handleLogout} className="button is-black" style={{marginLeft: 100}}>Logout</button>
                        </div>
                    </div>
                </section>
            <div className="columns" style={{paddingTop: 50, backgroundImage: `url(https://media1.giphy.com/media/3o6UB9xT8upEDGrcqs/giphy.gif)`, backgroundSize: 'cover', margin: 20, borderStyle: 'ridge', boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)', borderRadius: 10}}>
                <div className="column is-2 content" >
                
                <ul>
                <h2 style={{color: 'white'}}>Stats:</h2>
                <p style={{color: 'white'}}>Strength - {this.props.stats.strength}</p><br></br>
                <p className="box" style={{width: 60, borderStyle: 'ridge', boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)', borderRadius: 10}}>{this.state.strMod}</p><br></br>
                <p style={{color: 'white'}}>Dexterity - {this.props.stats.dexterity}</p><br></br>
                <p className="box" style={{width: 60, borderStyle: 'ridge', boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)', borderRadius: 10}}>{this.state.dexMod}</p><br></br>
                <p style={{color: 'white'}}>Constitution - {this.props.stats.constitution}</p><br></br>
                <p className="box" style={{width: 60, borderStyle: 'ridge', boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)', borderRadius: 10}}>{this.state.conMod}</p><br></br>
                <p style={{color: 'white'}}>Intelligence - {this.props.stats.intelligence}</p><br></br>
                <p className="box" style={{width: 60, borderStyle: 'ridge', boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)', borderRadius: 10}}>{this.state.intMod}</p><br></br>
                <p style={{color: 'white'}}>Wisdom - {this.props.stats.wisdom}</p><br></br>
                <p className="box" style={{width: 60, borderStyle: 'ridge', boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)', borderRadius: 10}}>{this.state.wisMod}</p><br></br>
                <p style={{color: 'white'}}>Charisma - {this.props.stats.charisma}</p><br></br>
                <p className="box" style={{width: 60, borderStyle: 'ridge', boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)', borderRadius: 10}}>{this.state.chrMod}</p><br></br>
                </ul> </div>
                <div className="column is-2">
                <p style={{color: 'white'}}>Proficiency Modifier:</p>
                <li className="box" style={{width: 180, borderStyle: 'ridge', boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)', borderRadius: 10}}>+ 2</li>
                <ul className="box" style={{width: 180, borderStyle: 'ridge', boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)', borderRadius: 10}}>
                    <p>Saving Throws:</p>
                    <li>Strength: {this.state.strMod + this.state.savingProf.strength}</li>
                    <li>Dexterity: {this.state.dexMod + this.state.savingProf.dexterity}</li>
                    <li>Constitution: {this.state.conMod + this.state.savingProf.constitution}</li>
                    <li>Intelligence: {this.state.intMod + this.state.savingProf.intelligence}</li>
                    <li>Wisdom: {this.state.wisMod + this.state.savingProf.wisdom}</li>
                    <li>Charisma: {this.state.chrMod + this.state.savingProf.charisma}</li>
                </ul>
                <h3 style={{color: 'white'}}>Skills:</h3>
                <h4 style={{color: 'white'}}>Points Left: {this.state.proficiencyPoints}</h4>
                <Skills handleNext={this.handleNext} handleChoice={this.handleChoice} proficiencyPoints={this.state.proficiencyPoints} handleReset={this.handleReset}/>
                </div>
                <div className="column is-3"></div>
                <div className="column is-3">
                <p style={{color: 'white'}}>Passive Perception:</p>
                {this.props.skills ? <li className="box" style={{width: 180, borderStyle: 'ridge', boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)', borderRadius: 10}}>{10 + this.props.skills.Perception}</li> : null}
                <div className="box" style={{borderStyle: 'ridge', boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)', borderRadius: 10}}>
                    <p>Other Proficiencies:</p>
                    <ul>
                        <li>armor: {this.props.newCharClass.prof_armor}</li>
                        <li>weapons: {this.props.newCharClass.prof_weapons}</li>
                        <li>tools: {this.props.newCharClass.prof_tools}</li>
                    </ul>
                </div>
                <div className="box" style={{borderStyle: 'ridge', boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)', borderRadius: 10}}>
                    <p>Languages:</p>
                    <p>{this.props.newCharRace.languages.split('_**').pop()}</p>
                </div>
                <div className="box" style={{borderStyle: 'ridge', boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)', borderRadius: 10}} >
                    <p>Equipment:</p>
                    <p>{this.props.newCharClass.equipment}</p>
                </div>
                <div className="box" style={{borderStyle: 'ridge', boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)', borderRadius: 10}}>
                    <p>Armor Choice:</p>
                    {armorBtns}
                </div>
                </div>
                <div className="column is-2">
                    <div className="box" style={{width: 180, borderStyle: 'ridge', boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)', borderRadius: 10}}>
                        <p>Armor Class: {this.state.armorClass}</p>
                    </div>
                    <div className="box" style={{width: 180, borderStyle: 'ridge', boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)', borderRadius: 10}}>
                        <p>Initiative: {this.props.mods.dexMod}</p>
                        <p>Speed: {this.props.newCharRace.speed.walk}</p>
                    </div>
                    <div className="box" style={{width: 180, borderStyle: 'ridge', boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)', borderRadius: 10}}>
                        <p>Hit Dice: {this.props.newCharClass.hit_dice}</p>
                        <p>Max HP: {maxHP}</p>
                    </div>
                    <div className="box" style={{width: 180, borderStyle: 'ridge', boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)', borderRadius: 10}}>
                        <form onSubmit={this.handleSubmit}>
                            <button type="submit">Submit Character</button><br></br>
                            <h2>Chosen Race: {this.props.newCharRace.name}</h2><br></br>
                            <img src={raceImg} alt="" className="image is-96x96" style={{borderStyle: 'ridge', boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)', borderRadius: 10}}/><br></br>
                            <h2>Chosen Class: {this.props.newCharClass.name}</h2>
                            <img src={clasImg} alt="" className="image is-96x96" style={{borderStyle: 'ridge', boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)', borderRadius: 10}}/>
                        </form>
                    </div>
                </div>
            </div></div>
        )
    }
}

const mapStateToProps = (store) => {
    return {
      currentUser: store.currentUser,
      newCharClass: store.newCharClass,
      newCharRace: store.newCharRace,
      stats: store.stats,
      mods: store.mods,
      skills: store.skills,
      character_id: store.character_id
    }
}
  
const mapDispatchToProps = (dispatch) => {
    return {
      LogIn: (loggedInUser) => {
        dispatch({ type: 'LOGIN_CURRENT_USER', user: loggedInUser })
      },
      AddRace: (charRace) => {
          dispatch({ type: 'ADD_Race', attribute: charRace })
      },
      AddStrength: (stat) => {
          dispatch({ type: 'ADD_strength', strength: stat})
      },
      AddDexterity: (stat) => {
          dispatch({ type: 'ADD_dexterity', dexterity: stat})
      },
      AddConstitution: (stat) => {
        dispatch({ type: 'ADD_constitution', constitution: stat})
      },
      AddIntelligence: (stat) => {
        dispatch({ type: 'ADD_intelligence', intelligence: stat})
      },
      AddWisdom: (stat) => {
        dispatch({ type: 'ADD_wisdom', wisdom: stat})
      },
      AddCharisma: (stat) => {
        dispatch({ type: 'ADD_charisma', charisma: stat})
      },
      AddMods: (mods) => {
          dispatch({ type: 'ADD_MODS', mods })
      },
      AddSkills: (skills) => {
          dispatch({ type: 'ADD_SKILLS', skills})
      },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewCharacter);