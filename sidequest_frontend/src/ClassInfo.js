import React from 'react'

class ClassInfo extends React.Component{

    handleClick = () => {
        this.props.saveClass(this.props.charClass)
    }
    
    render(){
        // console.log(this.props)
        const arcLi = this.props.charClass.archetypes.map(archetype => <li>{archetype.name} - {archetype.desc}</li>)
        const classDesc = this.props.charClass.desc.split('###')
        // console.log(classDesc)
        return(
            <div className="container box">
                <h2 className='title'>{this.props.charClass.name}</h2>
                <button onClick={this.handleClick}>Choose Class</button>
                <p className="content">{classDesc}</p>
                <p>hit dice: {this.props.charClass.hit_dice}</p>
                <p>HP at level 1: {this.props.charClass.hp_at_1st_level}</p>
                <p>HP at higher levels: {this.props.charClass.hp_at_higher_levels}</p>
                <p>Armor profenciecy: {this.props.charClass.prof_armor}</p>
                <p>Saving throw proficiency: {this.props.charClass.prof_saving_throws}</p>
                <p>Skill proficiency: {this.props.charClass.prof_skills}</p>
                <p>Tool proficiency: {this.props.charClass.prof_tools}</p>
                <p>Weapon proficiency: {this.props.charClass.prof_weapons}</p>
                <p>SpellCasting ability: {this.props.charClass.spellcasting_ability}</p>
                <p>{this.props.charClass.table}</p>
                <p>Archetypes:</p>
                <ul>{arcLi}</ul>
            </div>
        )
    }
}

export default ClassInfo