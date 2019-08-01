import { combineReducers } from 'redux'

function test(state = {}, action: any) {
    return state
}

const rootReducer = combineReducers({
    test,
})

export default rootReducer;
export type StateType = ReturnType<typeof rootReducer>