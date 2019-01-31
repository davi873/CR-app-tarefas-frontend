const INITIAL_STATE = {
    description: 'Ler livro',
    list: [{
        _id: 1,
        description: 'Pagar fatura do cartão',
        done: true
    }, {
        _id: 2,
        description: "Reunião com a Equipe as 10H",
        done: false
    }, {
        _id: 3,
        description: "Consulta terça dps do almoço",
        done: false
    }]
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case 'DESCRIPTION_CHANGED':
            return { ...state, description: action.payload }
        default:
            return state
    }
}