

export default rootReducer;

function rootReducer( state = {}, action){
    switch(action.type){
        case "LOGIN_CURRENT_USER":
            return {...state, currentUser: action.user}
        case "ADD_CLASS":
            return {...state, newCharClass: action.attribute }
        case "ADD_Race":
            return {...state, newCharRace: action.attribute }
        case "ADD_strength":
            return {...state, stats: {...state.stats, strength: action.strength}}
        case "ADD_dexterity":
            return {...state, stats: {...state.stats, dexterity: action.dexterity}}
        case "ADD_constitution":
            return {...state, stats: {...state.stats, constitution: action.constitution}}
        case "ADD_intelligence":
            return {...state, stats: {...state.stats, intelligence: action.intelligence}}
        case "ADD_wisdom":
            return {...state, stats: {...state.stats, wisdom: action.wisdom}}
        case "ADD_charisma":
            return {...state, stats: {...state.stats, charisma: action.charisma}}
        case "ADD_MODS":
            return {...state, mods: action.mods}
        case "ADD_SKILLS":
            return{...state, skills: action.skills }
        case "ADD_CHARACTER_ID":
            return {...state, character_id: action.character_id}
        case "CHARACTER_SELECT":
            return {...state, selectedCharacter: action.character}
        case "AddRequests":
            return {...state, requests: action.requests}

        default: 
        return state
    }
}

  