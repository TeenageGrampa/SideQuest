import React from  'react'


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
        return(
            <div className="columns"><div className="column" style={{width:350, }}>
                <img src={clasImg} alt="" style={{width:150, borderStyle: 'ridge', boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)', borderRadius: 10}}/>
            </div>
            <div className="column" >
                <h2>Player: {this.props.player.username}</h2>
                <h2>Character Name: {this.props.character.name}</h2>
                <h2>Character Class: {this.props.character.class[0].name}</h2>
                <h2>Character Race: {this.props.character.race[0].name}</h2>
                <h3>Level: {this.props.character.level}</h3>
                <h3>Alignment: {this.props.character.alignment}</h3>
            </div>
            </div>
        )
    }
}

export default PartyMember