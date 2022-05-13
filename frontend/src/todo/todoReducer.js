const initialState = {
    description: '',
    list: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'SET_DESCRIPTION':
            return {
                ...state,
                description: action.payload
            }
        case 'TODO_SEARCH':
            return {
                ...state,
                list: action.payload.data
            }
    
        default:
            return state;
    }
}