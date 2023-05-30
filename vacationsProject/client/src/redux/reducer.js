const initialState = {
    users: [],
    vacations: [],
    followers: [],
    adminVacations: []
};



function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'SetVacations':
            state = { ...state, vacations: action.payload }
            break;

        case 'SetUsers':
            state = { ...state, users: action.payload }
            break;

        case 'SetAllFollowers':
            state = { ...state, followers: action.payload }
            break;

        case 'SetAdmin':
            state = { ...state, admin: action.payload }
            break;

        // case 'SetAdminVacations':
        //     state = { ...state, adminVacations: action.payload }
        //     break;
    }
    return state;
}

export default rootReducer;
