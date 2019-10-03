import React from 'react'

class ClassInfo extends React.Component{

    handleClick = () => {
        this.props.saveClass(this.props.charClass)
    }

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
        const arcLi = this.props.charClass.archetypes.map(archetype => <li key={archetype.name}>{archetype.name} - {archetype.desc}</li>)
        const classDesc = this.props.charClass.desc.split('###')
        const clasImg = this.getImg(this.props.charClass.name)
        return(
            <div className="container box brick-bg" style={{boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)'}}>
                <h2 className='title' style={{textAlign: 'center'}}>{this.props.charClass.name}</h2>
                <img className="floating" src={clasImg} alt="" style={{display: 'block', marginLeft: 'auto', marginRight: 'auto', width: 400, borderStyle: 'ridge', boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)', borderRadius: 30 }} />
                <button onClick={this.handleClick} className="button is-black">Choose Class</button>
                <div className="box" style={{color: 'black'}}>
                <p>{classDesc}</p>
                <p>hit dice: {this.props.charClass.hit_dice}</p>
                <p>HP at level 1: {this.props.charClass.hp_at_1st_level}</p>
                <p>HP at higher levels: {this.props.charClass.hp_at_higher_levels}</p>
                <p>Armor profenciecy: {this.props.charClass.prof_armor}</p>
                <p>Saving throw proficiency: {this.props.charClass.prof_saving_throws}</p>
                <p>Skill proficiency: {this.props.charClass.prof_skills}</p>
                <p>Tool proficiency: {this.props.charClass.prof_tools}</p>
                <p>Weapon proficiency: {this.props.charClass.prof_weapons}</p>
                <p>SpellCasting ability: {this.props.charClass.spellcasting_ability}</p>
                <p>Archetypes:</p>
                <ul>{arcLi}</ul>
                </div>
            </div>
        )
    }
}

export default ClassInfo