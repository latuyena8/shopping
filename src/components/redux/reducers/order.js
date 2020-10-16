//Reducer
const order = (state = [], action) => {
    switch (action.type) {
        case 'ADD_ORDER': {
            let data
            if (state.length > 0) {
                data = state.findIndex(element => element.apptransid === action.payload.apptransid)
            }
            if (data == undefined || data == -1) { return [...state, action.payload] }
            state[data] = { ...state[data], status: action.payload }
            return state
        }
        default: return state
    }
}

export default order;