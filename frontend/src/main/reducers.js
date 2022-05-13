import { combineReducers } from "redux";

const rootReducer = combineReducers({
    todo: ()  => ({
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
    })
});

export default rootReducer