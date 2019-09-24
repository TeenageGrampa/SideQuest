import React from  'react'
import { connect } from 'react-redux'
import ReactDice from 'react-dice-complete'
import StatDist from './StatDist'
import 'react-dice-complete/dist/react-dice-complete.css'


class NewCharacter extends React.Component{
    state = {
        stats: {
            strength: 0,
            dexterity: 0,
            constitution: 0,
            intelligence: 0,
            wisdom: 0,
            charisma: 0,
        },
        statRoll: [],
        statVal: []
    }
    

    componentDidMount(){
        const asi = this.props.newCharRace.asi.map(asi => asi)
        const asiAtr = asi.map(asiAtr => asiAtr.attributes[0].toLowerCase())
        let stats = {strength: 0,
            dexterity: 0,
            constitution: 0,
            intelligence: 0,
            wisdom: 0,
            charisma: 0}
        for(let i = 0; i < asiAtr.length; i++){
            stats[asiAtr[i]] = asi[i].value
        }
        this.setState({
            stats: stats
        })
    }

    rollAll() {
        this.reactDice.rollAll()
        
    }

     
    rollDoneCallback = () => {
        if(this.state.statRoll.length === 4){
            return
            
        } else {
            const num = Math.floor(Math.random() * 6) + 1
            this.setState({
                statRoll: [...this.state.statRoll, num]
            })
            this.statValCheck()
        }
    }

    statValCheck = () => {
        if(this.state.statRoll.length === 4){
            const smallest = Math.min.apply(null, this.state.statRoll)
            const pos = this.state.statRoll.indexOf(smallest)
            const topThree = this.state.statRoll.slice(0, pos).concat(this.state.statRoll.slice(pos + 1))
            const statVal = topThree.reduce((a, b) => a + b, 0)
            this.setState({
                statVal: [...this.state.statVal, statVal],
                statRoll: []
            })
        } else {
            return
        }
    }

    getStat =(stat) => {
        this.setState({
            stats: {...this.state.stats, [stat]: this.state.statVal[0] + this.state.stats[stat]},
            statVal: this.state.statVal.concat(this.state.statVal.splice(0, 1))
        })
    }

    handleNext = () => {
        this.props.AddStrength(this.state.stats.strength)
        this.props.AddDexterity(this.state.stats.dexterity)
        this.props.AddConstitution(this.state.stats.constitution)
        this.props.AddIntelligence(this.state.stats.intelligence)
        this.props.AddWisdom(this.state.stats.wisdom)
        this.props.AddCharisma(this.state.stats.strength)
        this.getModifiers(this.state.stats)
        this.props.history.push('./NewCharacter')
    }

    getModifiers = (stats) => {
        const strMod = this.calculateMod(stats.strength)
        const dexMod = this.calculateMod(stats.dexterity)
        const conMod = this.calculateMod(stats.constitution)
        const intMod = this.calculateMod(stats.intelligence)
        const wisMod = this.calculateMod(stats.wisdom)
        const chrMod = this.calculateMod(stats.charisma)
        this.props.AddMods({
            strMod: strMod,
            dexMod: dexMod,
            conMod: conMod,
            intMod: intMod,
            wisMod: wisMod,
            chrMod: chrMod
        })
    }

    calculateMod = (stat) =>{
        
        if(stat <= 1){
            return -5
        } else if(2 <= stat && stat <= 3){
            return -4
        } else if(4 <= stat && stat <= 5){
            return -3
        } else if(6 <= stat && stat <= 7){
            return -2
        } else if (8 <= stat && stat <= 9){
            return -1
        } else if ( 10 <= stat && stat <= 11){
            return 0
        } else if (12 <= stat && stat <= 13){
            return 1
        } else if (14 <= stat && stat <= 15){
            return 2
        } else if (16 <= stat && stat <= 17){
            return 3
        } else if (18 <= stat && stat <= 19){
            return 4
        } else if (20 <= stat && stat <= 21){
            return 5
        } else if (22 <= stat && stat <= 23){
            return 6
        } else if (24 <= stat && stat <= 25){
            return 7
        } else if (26 <= stat && stat <= 27){
            return 8
        } else if (28 <= stat && stat <= 29){
            return 9
        } else if (30 <= stat){
            return 10
        }
    }

    render(){
            const asi = this.props.newCharRace.asi.map(asi => <p>{asi.attributes} - {asi.value}</p>)
        return(
            <div className="columns">
                <div className="column">
                <h1>Roll Your Stats:</h1>
                <h2>Chosen Race: {this.props.newCharRace.name}</h2>
                <h2>Chosen Class: {this.props.newCharClass.name}</h2>
                <h2>Ability score increases: {asi}</h2>
                <ul>
                <h2>Stats:</h2>{this.state.stats.strength > 0 &&
                this.state.stats.charisma > 0 &&
                this.state.stats.constitution > 0 &&
                this.state.stats.intelligence > 0 &&
                this.state.stats.wisdom > 0 &&
                this.state.stats.dexterity > 0 ?
                <button onClick={this.handleNext}>Confirm</button> : null
                }
                <li>Strength</li>
                <li className="box" style={{width: 60}}>{this.state.stats.strength}</li>
                <li>Dexterity</li>
                <li className="box" style={{width: 60}}>{this.state.stats.dexterity}</li>
                <li>Constitution</li>
                <li className="box" style={{width: 60}}>{this.state.stats.constitution}</li>
                <li>Intelligence</li>
                <li className="box" style={{width: 60}}>{this.state.stats.intelligence}</li>
                <li>Wisdom</li>
                <li className="box" style={{width: 60}}>{this.state.stats.wisdom}</li>
                <li>Charisma</li>
                <li className="box" style={{width: 60}}>{this.state.stats.charisma}</li>
                </ul> </div>
                <div className="column">
                <ReactDice
                    numDice={1}
                    rollDone={this.rollDoneCallback}
                    ref={dice => this.reactDice = dice}
                    faceColor={'#696969'}
                    dotColor={'#D3D3D3'}
                    />
                </div>
                <div className="column">
                <ReactDice
                    numDice={1}
                    rollDone={this.rollDoneCallback}
                    ref={dice => this.reactDice = dice}
                    faceColor={'#696969'}
                    dotColor={'#D3D3D3'}
                    />
                </div>
                {this.state.statVal && this.state.statVal.length < 6 ? 
                    <div style={{paddingTop: 400, paddingRight: 100}}>
                        <h1>Your Rolls: {this.state.statVal.map(stat => `${stat} `)}</h1>
                    </div>  
                    : null  
                }
                {this.state.statVal.length === 6 ? 
                <div style={{paddingTop: 400, paddingRight: 100}}>
                    <h1>Your Rolls: {this.state.statVal.map(stat => `${stat} `)}</h1>
                    <h2>Add {this.state.statVal[0]} to: </h2>
                    <StatDist statVals={this.state.statVal} wisdom={this.state.wisdom} strength={this.state.strength} charisma={this.state.charisma} intelligence={this.state.intelligence} dexterity={this.state.dexterity} constitution={this.state.constitution} getStat={this.getStat}/>
                </div> 
                : null
                }
                <div className="column">
                <ReactDice
                    numDice={1}
                    rollDone={this.rollDoneCallback}
                    ref={dice => this.reactDice = dice}
                    faceColor={'#696969'}
                    dotColor={'#D3D3D3'}
                    />
                </div>
                <div className="column">
                <ReactDice
                    numDice={1}
                    rollDone={this.rollDoneCallback}
                    ref={dice => this.reactDice = dice}
                    faceColor={'#696969'}
                    dotColor={'#D3D3D3'}
                    />
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
      }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewCharacter);