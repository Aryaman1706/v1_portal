import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';

import {
    REGISTER_SUCCESS,
    LOGIN_SUCCESS,
    USER_LOADED,
    LOGOUT,
    UPDATE_USER,
    STAR_SUCCESS,
    UNSTAR_SUCCESS
} from '../types';

const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        user: null,
        staredMessages: null
    };

    const [state, dispatch] = useReducer(authReducer, initialState);

    // REGISTER USER
    const register = async formData => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const res=await axios.post('/api/user', formData, config);

            dispatch({
                type:REGISTER_SUCCESS,
                payload: res.data
            });
        } catch (err) {
            console.log(err);
        }
    };

    // LOGIN USER
    const login = async (formData) => {

        if(localStorage.getItem('token')) {
            localStorage.setItem('token', null);
        };
        const config = {
            headers: {
              'Content-Type': 'application/json'
            }
        };

        try {
            const res = await axios.post('/api/auth', formData, config);

            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })
        } catch (err) {
            console.log(err);
        }
    };

    // LOAD USER
    const loadUser= async () => {

        setAuthToken(localStorage.token);

        const res= await axios.get('/api/auth');

        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
    };

    // UPDATE USER
    const updateUser = async (profile) => {
        
        const config = {
            headers: {
              'Content-Type': 'application/json'
            }
          };

        const res = axios.put (
          `/api/user/profile/me`,
          profile,
          config
        );

        dispatch({
            type: UPDATE_USER,
            payload: res.data
        })
    };

    // STAR MESSAGE
    const starMessage = async (id) => {
        
        axios.put (`/api/user/star/${id}`);

        dispatch({
            type: STAR_SUCCESS,
            payload: JSON.parse(localStorage.getItem('current'))
        });
    };

    // UNSTAR MESSAGE
    const unstarMessage = async (id) => {

        axios.put (`/api/user/star_remove/${id}`)

        dispatch({
            type: UNSTAR_SUCCESS,
            payload: id
        })
    };

    // LOGIN USER VIA GOOGLE
    const loginGoogle= async ()=>{
        const res =await axios.get('/api/auth/google/redirect');

        dispatch({
            type: LOGIN_SUCCESS,
            // payload: res.data
        })
    };

    const logout = () => {
        dispatch({
            type: LOGOUT
        });

        
    };


    // RETURN---------------------------------------------->
    return (
        <AuthContext.Provider
          value={{
            token: state.token,
            isAuthenticated: state.isAuthenticated,
            user: state.user,
            staredMessages: state.staredMessages,
            register,
            login,
            loginGoogle,
            loadUser,
            logout,
            updateUser,
            starMessage,
            unstarMessage
          }}
        >
          {props.children}
        </AuthContext.Provider>
    );
}

export default AuthState;