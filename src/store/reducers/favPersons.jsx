const initialState = { favPersonsID: [] }

function favPersons(state = initialState, action) {
  let nextState
  switch (action.type) {
    case 'SAVE_PERSON':
      nextState = {
        ...state,
        favPersonsID: [...state.favPersonsID, action.value]
      };
      return nextState || state
    case 'UNSAVE_PERSON':
      nextState = {
        ...state,
        favPersonsID: state.favPersonsID.filter(id => id !== action.value)
      };
      return nextState || state
    default:
      return state
  }
}

export default favPersons;