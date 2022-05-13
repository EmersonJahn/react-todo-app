const initialState = {
    description: 'Ler livro',
    list: [
        {
            _id: 1,
            description: 'Pagar fatura do cartão',
            done: true
        },
        {
            _id: 2,
            description: 'Reunião com a equipe',
            done: false
        },
    ]
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'SET_DESCRIPTION':
            return {
                ...state,
                description: action.payload
            }
    
        default:
            return state;
    }
}