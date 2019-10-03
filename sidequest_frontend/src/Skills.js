import React from  'react'
import { connect } from 'react-redux'

class Skills extends React.Component{

    state = {
        skills: {
            Acrobatics: false,
            AnimalHandling: false,
            Arcana: false,
            Athletics: false,
            Deception: false,
            History: false,
            Insight: false,
            Intimidation: false,
            Investigation: false,
            Medicine: false,
            Nature: false,
            Perception: false,
            Performance: false,
            Persuasion: false,
            Religion: false,
            SleightofHand: false,
            Stealth: false,
            Survival: false
        },
        skillPoints: {
            Acrobatics: 0,
            AnimalHandling: 0,
            Arcana: 0,
            Athletics: 0,
            Deception: 0,
            History: 0,
            Insight: 0,
            Intimidation: 0,
            Investigation: 0,
            Medicine: 0,
            Nature: 0,
            Perception: 0,
            Performance: 0,
            Persuasion: 0,
            Religion: 0,
            SleightofHand: 0,
            Stealth: 0,
            Survival: 0
        }
    }


    handleClick = (e) => {
        if(this.props.proficiencyPoints > 0){
            this.setState({
                skills: {
                    ...this.state.skills,
                    [e.target.value]: !this.state.skills[e.target.value]
                }
            })
            this.props.handleChoice()
        } else {
            return
        }
    }

    handleReset = () => {
        this.setState({
            skills: {
                Acrobatics: false,
                AnimalHandling: false,
                Arcana: false,
                Athletics: false,
                Deception: false,
                History: false,
                Insight: false,
                Intimidation: false,
                Investigation: false,
                Medicine: false,
                Nature: false,
                Perception: false,
                Performance: false,
                Persuasion: false,
                Religion: false,
                SleightofHand: false,
                Stealth: false,
                Survival: false
            }
        })
        this.props.handleReset()
    }

    handleConfirm = () => {
        this.setSkills()
        // this.props.handleNext(this.state.skillPoints)
        // this.props.AddSkills(this.state.skillPoints)
        
    }

    

    setSkills = () => {
        let skillPoints = {}
        const skillArr = ['Acrobatics',
            'AnimalHandling',
            'Arcana',
            'Athletics',
            'Deception',
            'History',
            'Insight',
            'Intimidation',
            'Investigation',
            'Medicine',
            'Nature',
            'Perception',
            'Performance',
            'Persuasion',
            'Religion',
            'SleightofHand',
            'Stealth',
            'Survival']
        const modArr = ['dexMod', 'wisMod', 'intMod', 'strMod', 'chrMod', 'intMod', 'wisMod', 'chrMod', 'intMod', 'wisMod', 'intMod', 'wisMod', 'chrMod', 'chrMod', 'intMod', 'dexMod', 'wisMod']
        for(let i = 0; i < skillArr.length; i++){
            skillPoints[skillArr[i]] = this.state.skills[skillArr[i]] === true ? this.props.mods[modArr[i]] + 2 : this.props.mods[modArr[i]]
        }
        this.setState({
            skillPoints: skillPoints
        },() => {this.props.handleNext(this.state.skillPoints)})
    }


    render(){
        // console.log(this.state.skillPoints)
        return(
            <div className="box" style={{width: 200, borderStyle: 'ridge', boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)', borderRadius: 10}}>
                <button  onClick={this.handleReset}>reset</button> {this.props.proficiencyPoints === 0 ? <button  onClick={this.handleConfirm} >Confirm</button> : null}
                <p>Acrobatics (Dex) - {this.props.newCharClass.name === 'Bard' || this.props.newCharClass.name ==='Fighter' || this.props.newCharClass.name ==='Monk' || this.props.newCharClass.name ==='Rogue'  ? <button  value="Acrobatics" onClick={this.handleClick}>+</button> : null }{this.state.skills.Acrobatics ? this.props.mods.dexMod + 2 : this.props.mods.dexMod}</p>
                <p>Animal Handling (Wis) - {this.props.newCharClass.name === 'Bard' || this.props.newCharClass.name ==='Barbarian' || this.props.newCharClass.name ==="Druid" || this.props.newCharClass.name ==='Fighter' || this.props.newCharClass.name ==='Ranger' ? <button  onClick={this.handleClick} value="AnimalHandling" >+</button> : null}{this.state.skills.AnimalHandling ? this.props.mods.wisMod + 2 : this.props.mods.wisMod}</p>
                <p>Arcana (Int) - {this.props.newCharClass.name === 'Bard' || this.props.newCharClass.name ==="Druid" || this.props.newCharClass.name ==='Sorcerer' || this.props.newCharClass.name ==='Warlock' || this.props.newCharClass.name ==='Wizard' ? <button  onClick={this.handleClick} value="Arcana" >+</button> : null}{this.state.skills.Arcana ? this.props.mods.intMod + 2 : this.props.mods.intMod}</p>
                <p>Athletics (Str) - {this.props.newCharClass.name === 'Bard' || this.props.newCharClass.name ==='Barbarian' || this.props.newCharClass.name ==='Fighter' || this.props.newCharClass.name ==='Monk' || this.props.newCharClass.name ==='Paladin' || this.props.newCharClass.name ==='Ranger' || this.props.newCharClass.name ==='Rogue' ? <button  onClick={this.handleClick} value="Athletics" >+</button> : null}{this.state.skills.Athletics ? this.props.mods.strMod + 2 : this.props.mods.strMod}</p>
                <p>Deception (Cha) - {this.props.newCharClass.name === 'Bard' || this.props.newCharClass.name ==='Rogue' || this.props.newCharClass.name ==='Sorcerer' || this.props.newCharClass.name ==='Warlock' ? <button  onClick={this.handleClick} value="Deception">+</button> : null}{this.state.skills.Deception ? this.props.mods.chrMod + 2 : this.props.mods.chrMod}</p>
                <p>History (Int) - {this.props.newCharClass.name === 'Bard' || this.props.newCharClass.name ==='Cleric' || this.props.newCharClass.name ==='Fighter' || this.props.newCharClass.name ==='Monk' || this.props.newCharClass.name ==='Warlock' || this.props.newCharClass.name ==='Wizard' ? <button  onClick={this.handleClick} value="History">+</button> : null}{this.state.skills.History ? this.props.mods.intMod + 2 : this.props.mods.intMod}</p>
                <p>Insight (Wis) - {this.props.newCharClass.name === 'Bard' || this.props.newCharClass.name === 'Cleric' || this.props.newCharClass.name ==="Druid" || this.props.newCharClass.name ==='Fighter' || this.props.newCharClass.name ==='Monk' || this.props.newCharClass.name ==='Paladin' || this.props.newCharClass.name ==='Ranger' || this.props.newCharClass.name ==='Rogue' || this.props.newCharClass.name ==='Sorcerer' || this.props.newCharClass.name ==='Wizard'? <button  onClick={this.handleClick} value="Insight">+</button> : null}{this.state.skills.Insight ? this.props.mods.wisMod + 2 : this.props.mods.wisMod}</p>
                <p>Intimidation (Cha) {this.props.newCharClass.name === 'Bard' || this.props.newCharClass.name ==='Barbarian' || this.props.newCharClass.name ==='Fighter' || this.props.newCharClass.name ==='Paladin' || this.props.newCharClass.name ==='Rogue' || this.props.newCharClass.name ==='Sorcerer' || this.props.newCharClass.name ==='Warlock' ? <button  onClick={this.handleClick} value="Intimidation">+</button> : null}{this.state.skills.Intimidation ? this.props.mods.chrMod + 2 : this.props.mods.chrMod}</p>
                <p>Investigation (Int) - {this.props.newCharClass.name === 'Bard' || this.props.newCharClass.name ==='Ranger' || this.props.newCharClass.name ==='Rogue' || this.props.newCharClass.name ==='Warlock' || this.props.newCharClass.name ==='Wizard' ? <button  onClick={this.handleClick} value="Investigation">+</button> : null}{this.state.skills.Investigation ? this.props.mods.intMod + 2 : this.props.mods.intMod}</p>
                <p>Medicine (Wis) - {this.props.newCharClass.name === 'Bard' || this.props.newCharClass.name ==='Cleric' || this.props.newCharClass.name ==="Druid" || this.props.newCharClass.name ==='Paladin' || this.props.newCharClass.name ==='Wizard' ? <button  onClick={this.handleClick} value="Medicine">+</button> : null}{this.state.skills.Medicine ? this.props.mods.wisMod + 2 : this.props.mods.wisMod}</p>
                <p>Nature (Int) - {this.props.newCharClass.name === 'Bard' || this.props.newCharClass.name ==='Barbarian' || this.props.newCharClass.name ==="Druid" || this.props.newCharClass.name ==='Ranger' ? <button  onClick={this.handleClick} value="Nature">+</button> : null}{this.state.skills.Nature ? this.props.mods.intMod + 2 : this.props.mods.intMod}</p>
                <p>Perception (Wis) - {this.props.newCharClass.name === 'Bard' || this.props.newCharClass.name ==='Barbarian' || this.props.newCharClass.name ==="Druid" || this.props.newCharClass.name ==='Fighter' || this.props.newCharClass.name ==='Ranger' || this.props.newCharClass.name ==='Rogue' ? <button  onClick={this.handleClick} value="Perception">+</button> : null}{this.state.skills.Perception ? this.props.mods.wisMod + 2 : this.props.mods.wisMod}</p>
                <p>Performance (Cha) - {this.props.newCharClass.name === 'Bard' || this.props.newCharClass.name ==='Rogue' ? <button   onClick={this.handleClick} value="Performance">+</button> : null}{this.state.skills.Performance ? this.props.mods.chrMod +2 : this.props.mods.chrMod}</p>
                <p>Persuasion (Cha) - {this.props.newCharClass.name === 'Bard' || this.props.newCharClass.name ==='Cleric' || this.props.newCharClass.name ==='Paladin' || this.props.newCharClass.name ==='Rogue' || this.props.newCharClass.name ==='Sorcerer' ? <button   onClick={this.handleClick} value="Persuasion">+</button> : null}{this.state.skills.Persuasion ? this.props.mods.chrMod +2 : this.props.mods.chrMod}</p>
                <p>Religion (Int) - {this.props.newCharClass.name === 'Bard' || this.props.newCharClass.name ==='Cleric' || this.props.newCharClass.name ==="Druid" || this.props.newCharClass.name ==='Monk' || this.props.newCharClass.name ==='Paladin' || this.props.newCharClass.name ==='Sorcerer' || this.props.newCharClass.name ==='Warlock' || this.props.newCharClass.name ==='Wizard'? <button   onClick={this.handleClick} value="Religeon" >+</button> : null}{this.state.skills.Religion ? this.props.mods.intMod +2 : this.props.mods.intMod}</p>
                <p>Sleight of Hand (Dex) - {this.props.newCharClass.name === 'Bard' || this.props.newCharClass.name ==='Rogue' ? <button   onClick={this.handleClick} value="SleightofHand">+</button> : null}{this.state.skills.SleightofHand ? this.props.mods.dexMod +2 : this.props.mods.dexMod}</p>
                <p>Stealth (Dex) - {this.props.newCharClass.name === 'Bard' || this.props.newCharClass.name ==='Monk' || this.props.newCharClass.name ==='Ranger' || this.props.newCharClass.name ==='Rogue' ? <button   onClick={this.handleClick} value="Stealth">+</button> : null}{this.state.skills.Stealth ? this.props.mods.dexMod +2 : this.props.mods.dexMod}</p>
                <p>Survival (Wis) - {this.props.newCharClass.name === 'Bard' || this.props.newCharClass.name ==='Barbarian' || this.props.newCharClass.name ==="Druid" || this.props.newCharClass.name ==='Fighter' || this.props.newCharClass.name ==='Ranger' ? <button   onClick={this.handleClick} value="Survival">+</button> : null}{this.state.skills.Survival ? this.props.mods.wisMod +2 : this.props.mods.wisMod}</p>
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
      mods: store.mods
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
      }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Skills);