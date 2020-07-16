import {INCREMENT,DECRMENT} from './action-type'
export function counter(state=0,action){
    switch (action.type){
        case INCREMENT:
            return state + action.data;
        case DECRMENT:
            return state - action.data;
        default:
            return state;    
    }
}