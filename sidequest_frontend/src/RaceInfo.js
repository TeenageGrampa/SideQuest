import React from 'react'

class RaceInfo extends React.Component{

    state = {
        currentRace: {},
        showSubRace: false
    }

    componentDidMount(){
        this.setState({
            currentRace: this.props.charRace
        })
    }

    handleClick = () => {
        this.props.saveRace(this.state.currentRace)
    }

    handleSubrace = () => {
        this.setState({
            showSubRace: !this.state.showSubRace,
            currentRace: {
                ...this.state.currentRace,
                name: this.props.charRace.subraces[0].name,
                asi: this.props.charRace.subraces[0].asi,
                desc: this.props.charRace.subraces[0].desc,
                asi_desc: this.props.charRace.subraces[0].asi_desc,
                slug: this.props.charRace.subraces[0].slug
            }
        })
    }

    getImg = (charRace) => {
        if(charRace === 'Dwarf'){
            return require('./dwarf-king.png')
        } else if(charRace === 'Elf'){
            return require('./woman-elf-face.png')
        } else if(charRace === 'Halfling'){
            return require('./hobbit-dwelling.png')
        } else if(charRace === 'Human'){
            return require('./sensuousness.png')
        } else if(charRace === 'Dragonborn'){
            return require('./spiked-dragon-head.png')
        } else if(charRace === 'Gnome'){
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
        const raceImg = this.getImg(this.props.charRace.name)
        const asiLi = this.props.charRace.asi.map(asi => <li >{asi.attributes[0]} - {asi.value}</li>)        
        const raceDesc = this.props.charRace.desc.split('Traits').pop()
        const raceAge = this.props.charRace.age.split('_**').pop()
        const raceTraits = this.props.charRace.traits.split('**_').join(' ').split('_**')
        const raceVision = this.props.charRace.vision.split('**_').join(' ').split('_**')
        
        return(
            <div className="container box brick-bg" style={{boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)'}}>
                {this.state.showSubRace === true ? <h2 className='title' style={{textAlign: 'center'}}>{this.props.charRace.subraces[0].name}</h2> : <h2 className='title' style={{textAlign: 'center'}}>{this.props.charRace.name}</h2>}
                <img src={raceImg} alt="" className="floating" style={{borderStyle: 'ridge', boxShadow: '10px 10px 18px -5px rgba(0,0,0,0.75)', borderRadius: 30, display: 'block', marginLeft: 'auto', marginRight: 'auto', width: 400}} />
                <button className="button is-black" onClick={this.handleClick}>Choose Race</button>
                {this.props.charRace.subraces[0] ? <button className="button is-black" onClick={this.handleSubrace}>Show Subrace</button> : null}
                <div className="box" style={{color: 'black'}}>
                <p>{this.state.showSubRace === true ? this.props.charRace.subraces[0].desc : raceDesc}</p>
                <p>Age: {raceAge}</p>
                <p>Ability Score Increase:</p>
                <p>{this.state.showSubRace === true ? this.props.charRace.subraces[0].asi_desc.split('_**').pop() : this.props.charRace.asi_desc.split('_**').pop()}</p><ul>{this.state.showSubRace === true ? this.props.charRace.subraces[0].asi.map(asi => <li>{asi.attributes[0]} - {asi.value}</li>) : asiLi}</ul>
                <p>Languages: {this.props.charRace.languages.split('_**').pop()}</p>
                <p>Size: {this.props.charRace.size.split('_**').pop()}</p>
                <p>Speed: {this.props.charRace.speed.walk} {this.props.charRace.speed_desc.split('_**').pop()}</p>
                <p>Traits: {raceTraits}</p>
                <p>Vision: {raceVision}</p>
                </div>
            </div>
        )
    }
}

export default RaceInfo