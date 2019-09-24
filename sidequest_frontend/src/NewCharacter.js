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

    handleSubmit =(e) =>  {
        e.preventDefault()
        console.log();
        const hitDieNum = this.props.newCharClass.hit_dice.split('d')[1]
        const maxHP = parseInt(hitDieNum) + this.props.mods.conMod
        
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
            }).then(r => r.json()).then(console.log)
                
                fetch('http://localhost:3000/character_races', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
                },
                body: JSON.stringify({
                    character_id: this.state.character_id,
                    name: this.props.newCharRace.name,
                    desc: this.props.newCharRace.desc,
                    age: this.props.newCharRace.age,
                    alignment: this.props.newCharRace.alignment,
                    size: this.props.newCharRace.size,
                    speed: this.props.newCharRace.speed.walk,
                    speed_desc: this.props.newCharRace.speed_desc,
                    languages: this.props.newCharRace.languages,
                    vision: this.props.newCharRace.vision,
                    traits: this.props.newCharRace.traits
                })
            }).then(r => r.json()).then(console.log)
                fetch('http://localhost:3000/character_mods', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
                },
                body: JSON.stringify({
                    character_id: this.state.character_id,
                    strmod: this.props.mods.strMod,
                    dexmod: this.props.mods.dexMod,
                    conmod: this.props.mods.conMod,
                    intmod: this.props.mods.intMod,
                    wismod: this.props.mods.wisMod,
                    chrmod: this.props.mods.chrMod
                })
            }).then(r => r.json()).then(console.log)
                fetch('http://localhost:3000/character_skills', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
                },
                body: JSON.stringify({
                    character_id: this.state.character_id,
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
                    character_id: this.state.character_id,
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
            }).then(r => r.json()).then(console.log)}))
            
    }
    
    render(){
        console.log(this.state)
        const hitDieNum = this.props.newCharClass.hit_dice.split('d')[1]
        const maxHP = parseInt(hitDieNum) + this.props.mods.conMod
        const armorChoices = this.props.newCharClass.prof_armor.split(', ')
        const armorBtns = armorChoices.map(choice => choice === 'All armor' ? <div><button onClick={this.handleArmor} value="light armor">Light armor</button><button onClick={this.handleArmor} value="medium armor">Medium armor</button><button onClick={this.handleArmor} value="heavy armor">Heavy armor</button></div> : <button value={choice} onClick={this.handleArmor}>{choice}</button>)
        return(
            <div className="columns">
                <div className="column">
                <h1>Roll Your Stats:</h1>
                <h2>Chosen Race: {this.props.newCharRace.name}</h2>
                <h2>Chosen Class: {this.props.newCharClass.name}</h2>
                <ul>
                <h2>Stats:</h2>
                <li>Strength - {this.props.stats.strength}</li>
                <li className="box" style={{width: 60}}>{this.state.strMod}</li>
                <li>Dexterity - {this.props.stats.dexterity}</li>
                <li className="box" style={{width: 60}}>{this.state.dexMod}</li>
                <li>Constitution - {this.props.stats.constitution}</li>
                <li className="box" style={{width: 60}}>{this.state.conMod}</li>
                <li>Intelligence - {this.props.stats.intelligence}</li>
                <li className="box" style={{width: 60}}>{this.state.intMod}</li>
                <li>Wisdom - {this.props.stats.wisdom}</li>
                <li className="box" style={{width: 60}}>{this.state.wisMod}</li>
                <li>Charisma - {this.props.stats.charisma}</li>
                <li className="box" style={{width: 60}}>{this.state.chrMod}</li>
                </ul> </div>
                <div className="column">
                <p>Proficiency Modifier:</p>
                <li className="box" style={{width: 180}}>+ 2</li>
                <ul className="box" style={{width: 180}}>
                    <p>Saving Throws:</p>
                    <li>Strength: {this.state.strMod + this.state.savingProf.strength}</li>
                    <li>Dexterity: {this.state.dexMod + this.state.savingProf.dexterity}</li>
                    <li>Constitution: {this.state.conMod + this.state.savingProf.constitution}</li>
                    <li>Intelligence: {this.state.intMod + this.state.savingProf.intelligence}</li>
                    <li>Wisdom: {this.state.wisMod + this.state.savingProf.wisdom}</li>
                    <li>Charisma: {this.state.chrMod + this.state.savingProf.charisma}</li>
                </ul>
                <h3>Skills:</h3>
                <h4>Points Left: {this.state.proficiencyPoints}</h4>
                <Skills handleNext={this.handleNext} handleChoice={this.handleChoice} proficiencyPoints={this.state.proficiencyPoints} handleReset={this.handleReset}/>
                </div>
                <div className="column">
                <p>Passive Perception:</p>
                {this.props.skills ? <li className="box" style={{width: 180}}>{10 + this.props.skills.Perception}</li> : null}
                <div className="box">
                    <p>Other Proficiencies:</p>
                    <ul>
                        <li>armor: {this.props.newCharClass.prof_armor}</li>
                        <li>weapons: {this.props.newCharClass.prof_weapons}</li>
                        <li>tools: {this.props.newCharClass.prof_tools}</li>
                    </ul>
                </div>
                <div className="box">
                    <p>Languages:</p>
                    <p>{this.props.newCharRace.languages.split('_**').pop()}</p>
                </div>
                <div className="box">
                    <p>Equipment:</p>
                    <p>{this.props.newCharClass.equipment}</p>
                </div>
                <div className="box">
                    <p>Armor Choice:</p>
                    {armorBtns}
                </div>
                </div>
                <div className="column">
                    <div className="box" style={{width: 180}}>
                        <p>Armor Class: {this.state.armorClass}</p>
                    </div>
                    <div className="box" style={{width: 180}}>
                        <p>Initiative: {this.props.mods.dexMod}</p>
                        <p>Speed: {this.props.newCharRace.speed.walk}</p>
                    </div>
                    <div className="box" style={{width: 180}}>
                        <p>Hit Dice: {this.props.newCharClass.hit_dice}</p>
                        <p>Max HP: {maxHP}</p>
                    </div>
                    <div className="box" style={{width: 180}}>
                        <form onSubmit={this.handleSubmit}>
                            <label>Name:</label>
                            <input type='text' placeholder="name" value={this.state.characterName} onChange={this.nameChange}/>
                            <label>Alignment:</label>
                            <select onChange={this.alignmentChoice}>
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
                            <button type="submit">Submit Character</button>
                        </form>
                    </div>
                </div>
            </div>
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
      skills: store.skills
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
      }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewCharacter);