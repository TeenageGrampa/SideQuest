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
                {this.state.strength === false ? <button className="button is-primary is-inverted is-outlined" onClick={this.handleClick}  value="strength">Strength</button> : null }
                {this.state.dexterity === false ? <button className="button is-primary is-inverted is-outlined" value='dexterity'  onClick={this.handleClick}>Dexterity</button> : null }
                {this.state.constitution=== false ? <button className="button is-primary is-inverted is-outlined" value='constitution' onClick={this.handleClick} >Constitution</button> : null }
                {this.state.intelligence === false ? <button className="button is-primary is-inverted is-outlined" value="intelligence" onClick={this.handleClick}>Intelligence</button> : null }
                {this.state.wisdom === false ? <button className="button is-primary is-inverted is-outlined" value='wisdom'  onClick={this.handleClick}>Wisdom</button> : null }
                {this.state.charisma === false ? <button className="button is-primary is-inverted is-outlined" value='charisma' onClick={this.handleClick}>Charisma</button> : null }
                {/* <button onClick={this.resetStats}>reset</button> */}
            </div>
        )
    }
}

export default StatDist