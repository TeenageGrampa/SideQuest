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
        const strMod = this.calculateMod(this.state.stats.strength)
        const dexMod = this.calculateMod(this.state.stats.dexterity)
        const conMod = this.calculateMod(this.state.stats.constitution)
        const intMod = this.calculateMod(this.state.stats.intelligence)
        const wisMod = this.calculateMod(this.state.stats.wisdom)
        const chrMod = this.calculateMod(this.state.stats.charisma)
        this.props.AddStrength(this.state.stats.strength)
        this.props.AddDexterity(this.state.stats.dexterity)
        this.props.AddConstitution(this.state.stats.constitution)
        this.props.AddIntelligence(this.state.stats.intelligence)
        this.props.AddWisdom(this.state.stats.wisdom)
        this.props.AddCharisma(this.state.stats.strength)
        this.getModifiers(this.state.stats)
        fetch('http://localhost:3000/character_mods', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
                },
                body: JSON.stringify({
                    character_id: this.props.character_id,
                    strmod: strMod,
                    dexmod: dexMod,
                    conmod: conMod,
                    intmod: intMod,
                    wismod: wisMod,
                    chrmod: chrMod
                })
            }).then(r => r.json()).then(this.props.history.push('./NewCharacter'))
        // this.props.history.push('./NewCharacter')
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

    handleLogout = () => {
        localStorage.clear()
        this.props.history.push('/')
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
            const asi = this.props.newCharRace.asi.map(asi => <p>{asi.attributes} - {asi.value}</p>)
            const clasImg = this.getClassImg(this.props.newCharClass.name)
            const raceImg = this.getRaceImg(this.props.newCharRace.name)
        return(
           <div className="container">
               <div className="columns">
                <div className="column is-1 tile" style={{paddingTop: 100}}>
                <ul>
                <h2>Stats:</h2><br></br>{this.state.stats.strength > 0 &&
                this.state.stats.charisma > 0 &&
                this.state.stats.constitution > 0 &&
                this.state.stats.intelligence > 0 &&
                this.state.stats.wisdom > 0 &&
                this.state.stats.dexterity > 0 ?
                <button onClick={this.handleNext}>Confirm</button> : null
                }
                <br></br>
                <div className="is-child">
                <p>Strength</p><br></br>
                <p className="box" style={{borderStyle: 'ridge', width: 60, boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)'}}>{this.state.stats.strength}</p>
                </div><br></br>
                <div className="is-child">
                <p>Dexterity</p><br></br>
                <p className="box" style={{borderStyle: 'ridge', width: 60, boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)'}}>{this.state.stats.dexterity}</p>
                </div><br></br>
                <div className="is-child">
                <p>Constitution</p><br></br>
                <p className="box" style={{borderStyle: 'ridge', width: 60, boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)'}}>{this.state.stats.constitution}</p>
                </div><br></br>
                <div className="is-child">
                <p>Intelligence</p><br></br>
                <p className="box" style={{borderStyle: 'ridge', width: 60, boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)'}}>{this.state.stats.intelligence}</p>
                </div><br></br>
                <div className="is-child">
                <p>Wisdom</p><br></br>
                <p className="box" style={{borderStyle: 'ridge', width: 60, boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)'}}>{this.state.stats.wisdom}</p>
                </div><br></br>
                <div className="is-child">
                <p>Charisma</p><br></br>
                <p className="box" style={{borderStyle: 'ridge', width: 60, boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)'}}>{this.state.stats.charisma}</p>
                </div><br></br>
                </ul> 
                </div>

                
               <div className="column" style={{paddingTop: 100, paddingLeft: 100}}>
               <div className="columns ">
                <div className="column" style={{display: 'block', marginLeft: 'auto', marginRight: 'auto'}}>
                    <h2>Chosen Race: </h2>
                    {this.props.newCharRace.name}
                    <img src={raceImg} style={{borderStyle: 'ridge', boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)', borderRadius: 10}} className="image is-96x96" />
                    
                </div>
                <div className="column">
                <h2>Chosen Class: </h2>
                {this.props.newCharClass.name}
                <img src={clasImg} className="image is-96x96" style={{borderStyle: 'ridge', boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)', borderRadius: 10}}/>
                </div>
                <div className="column">
                <h2>Ability score increases: {asi}</h2>
                </div>
                </div>
                <div className=" columns hero-body" style={{borderStyle: 'ridge',  borderRadius: 10, backgroundImage: `url(http://fanaru.com/fantasy-art/image/232259-fantasy-art-a-burning-rose.gif)`, backgroundSize: 'cover', boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)'}}>
               <div className="column is-3">
               <button onClick={this.handleLogout} className="button is-black" style={{marginLeft: 100}}>Logout</button>
               <h1 className="subtitle navHead column is-11" style={{color: 'white'}}>Roll Your Stats:</h1>
               <p style={{color: 'white'}}>You roll 4 dice and keep the highest 3 numbers. After 6 numbers are collected you may allocate them to your stats as you wish.</p>
               </div>
               <div className="column is-9">
               {this.state.statVal && this.state.statVal.length < 6 ? 
                    <div >
                        <h1 className="subtitle" style={{color: 'white'}}>Your Rolls: {this.state.statVal.map(stat => `${stat} `)}</h1>
                    </div>  
                    : null  
                }
                {this.state.statVal.length === 6 ? 
                <div >
                    <h1 className="title" style={{color: 'white'}}>Your Rolls: {this.state.statVal.map(stat => `${stat} `)}</h1>
                    <h2 className="title" style={{color: 'white'}}>Add {this.state.statVal[0]} to: </h2>
                    <StatDist statVals={this.state.statVal} wisdom={this.state.wisdom} strength={this.state.strength} charisma={this.state.charisma} intelligence={this.state.intelligence} dexterity={this.state.dexterity} constitution={this.state.constitution} getStat={this.getStat}/>
                </div> 
                : null
                }
               </div>
               </div>
               
               <div className="columns"  >
                

                <div className="column is-3" style={{paddingTop: 100, paddingLeft: 100}}>
                <ReactDice
                    numDice={1}
                    rollDone={this.rollDoneCallback}
                    ref={dice => this.reactDice = dice}
                    faceColor={'#696969'}
                    dotColor={'#D3D3D3'}
                    />
                </div>
                <div className="column is-3" style={{paddingTop: 100, paddingLeft: 100}}>
                <ReactDice
                    numDice={1}
                    rollDone={this.rollDoneCallback}
                    ref={dice => this.reactDice = dice}
                    faceColor={'#696969'}
                    dotColor={'#D3D3D3'}
                    />
                </div>
                
                <div className="column is-3" style={{paddingTop: 100, paddingLeft: 100}}>
                <ReactDice
                    numDice={1}
                    rollDone={this.rollDoneCallback}
                    ref={dice => this.reactDice = dice}
                    faceColor={'#696969'}
                    dotColor={'#D3D3D3'}
                    />
                </div>
                <div className="column is-3" style={{paddingTop: 100, paddingLeft: 100}}>
                <ReactDice
                    numDice={1}
                    rollDone={this.rollDoneCallback}
                    ref={dice => this.reactDice = dice}
                    faceColor={'#696969'}
                    dotColor={'#D3D3D3'}
                    />
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
      newCharClass: store.newCharClass,
      newCharRace: store.newCharRace,
      mods: store.mods,
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
      }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewCharacter);