import React from 'react'

class StatDist extends React.Component {

    state = {
        statVals: [],
        strength: false,
        dexterity:false,
        constitution: false,
        intelligence: false,
        wisdom: false,
        charisma: false

    }

    handleClick = (e) => {
        this.props.getStat(e.target.value)
        this.setState({
            [e.target.value]: true
        })
    }

    resetStats = () => {
        this.setState({
            strength: false,
            dexterity:false,
            constitution: false,
            intelligence: false,
            wisdom: false,
            charisma: false
        })
    }
    

    render(){
        return(
            <div>
                {this.state.strength === false ? <button onClick={this.handleClick}  value="strength">Strength</button> : null }
                {this.state.dexterity === false ? <button value='dexterity'  onClick={this.handleClick}>Dexterity</button> : null }
                {this.state.constitution=== false ? <button value='constitution' onClick={this.handleClick} >Constitution</button> : null }
                {this.state.intelligence === false ? <button value="intelligence" onClick={this.handleClick}>Intelligence</button> : null }
                {this.state.wisdom === false ? <button value='wisdom'  onClick={this.handleClick}>Wisdom</button> : null }
                {this.state.charisma === false ? <button value='charisma' onClick={this.handleClick}>Charisma</button> : null }
                {/* <button onClick={this.resetStats}>reset</button> */}
            </div>
        )
    }
}

export default StatDist