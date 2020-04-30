import {
    REGISTER_SUCCESS,
    LOGIN_SUCCESS,
    USER_LOADED,
    LOGOUT,
    UPDATE_USER,
    STAR_SUCCESS,
    UNSTAR_SUCCESS
} from '../types';

export default (state, action) => {

    switch(action.type){
        
        case USER_LOADED:
        return {
            ...state,
            isAuthenticated: true,
            user: action.payload,
            staredMessages: action.payload.staredMessages
        };

        case REGISTER_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                ...action.payload
            };

        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true
            };
        
        case LOGOUT:
            localStorage.removeItem('token');
            return{
                ...state,
                token: null,
                isAuthenticated: false,
                user: null
            };
        
        case UPDATE_USER:
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true
            };

        case STAR_SUCCESS:
            return {
                ...state,
                staredMessages: [ JSON.parse(localStorage.getItem('current')), ...state.staredMessages  ]
            };

        case UNSTAR_SUCCESS:
            return {
                ...state,
                staredMessages: state.staredMessages.filter(
                    message => message._id !== action.payload
                )
            }

        default:
            return state;
    }
    


};