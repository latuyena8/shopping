//Reducer
const cart = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      let data
      if (state.length > 0) {
        data = state.findIndex(element => element.id === action.payload.id)
      }
      if (data == undefined || data == -1) { return [...state, action.payload] }
      state[data].amount++
      return state
    }
    case 'GET_CART': {
      return state
    }
    case 'RESTART_CART': {
      return []
    }
    default: return state
  }
}

export default cart;