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
    
    render(){
        console.log(this.props)
        const asiLi = this.props.charRace.asi.map(asi => <li>{asi.attributes[0]} - {asi.value}</li>)        
        const raceDesc = this.props.charRace.desc.split('Traits').pop()
        const raceAge = this.props.charRace.age.split('_**').pop()
        const raceTraits = this.props.charRace.traits.split('**_').join(' ').split('_**')
        const raceVision = this.props.charRace.vision.split('**_').join(' ').split('_**')
        
        return(
            <div className="container box">
                {this.state.showSubRace === true ? <h2 className='title'>{this.props.charRace.subraces[0].name}</h2> : <h2 className='title'>{this.props.charRace.name}</h2>}
                <button onClick={this.handleClick}>Choose Race</button>
                {this.props.charRace.subraces[0] ? <button onClick={this.handleSubrace}>Show Subrace</button> : null}
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
        )
    }
}

export default RaceInfo