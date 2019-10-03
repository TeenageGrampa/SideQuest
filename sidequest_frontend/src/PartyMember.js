import React from  'react'
import { Link } from 'react-router-dom'


class PartyMember extends React.Component{

    getImg = (charClass) => {
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
    
    render(){
        const clasImg = this.getImg(this.props.character.class[0].name)
        // console.log(this.props)
        return(
            <div className="columns box is-7by1" style={{margin: 2, borderStyle: 'ridge', boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)', borderRadius: 10}} >
                <div className="column is-4 ">
                    <div >
                        <img alt="" src={clasImg} style={{zIndex: 500, borderStyle: 'ridge', boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)', borderRadius: 10}} className="image is-96x96" />
                        <Link to={{pathname:"/CharacterSheet", state: { character: this.props.character }}} >
                        <button style={{marginTop: 3, borderStyle: 'ridge', boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)', borderRadius: 10}} className="button is-black is-small">Character Sheet</button>
                        </Link> 
                    </div>
                </div>
                <div className="column media is-8" style={{marginLeft: 5}}>
                    <div className="columns content is-small">
                        <div className="column is-half" style={{textAlign: 'center'}} >
                        <p>Name: {this.props.character.name}</p>
                        <p>Class: {this.props.character.class[0].name}</p>
                        </div>
                        <div className=" column is-half" style={{textAlign: 'center'}} >
                        <p>Race: {this.props.character.race[0].name}</p>
                        <p>User: {this.props.player.username}</p>
                        
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PartyMember