import {
    GET_MESSAGES,
    ADD_SUCCESS,
    DELETE_SUCCESS,
    EDIT_SUCCESS,
    MY_MESSAGES
} from '../types'

export default (state, action) => {
    switch (action.type) {

        case ADD_SUCCESS:
            return{
                ...state,
                messages:  [action.payload , ...state.messages] 
            }

        case GET_MESSAGES:
            // console.log(action.payload);
            return {
                ...state,
                messages: action.payload
            };

        case MY_MESSAGES:
            return{
                ...state,
                myMessages: action.payload
            }

        case DELETE_SUCCESS:
            return {
                ...state,
                messages: state.messages.filter(
                    message => message._id !== action.payload
                )
            };

        case EDIT_SUCCESS:
            // console.log(action.payload);
            return {
                ...state,
                messages: state.messages.map(
                    message => message._id === action.payload._id ?
                    action.payload : message
                ) 
            };

        default:
            return state;
    }
}