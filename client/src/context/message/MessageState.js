import React, { useReducer } from 'react';
import axios from 'axios';
import MessageContext from './messageContext';
import messageReducer from './messageReducer';

import {
    GET_MESSAGES,
    ADD_SUCCESS,
    DELETE_SUCCESS,
    EDIT_SUCCESS,
    MY_MESSAGES
} from '../types';

const MessageState = props => {
    const initialState = {
        messages:[],
        current: null,
        myMessages: null
    };

    const [state, dispatch] = useReducer(messageReducer, initialState);

    // SET CURRENT
    const setCurrent = (message) => {
      localStorage.setItem('current', JSON.stringify(message));
    }
    
    // GET MESSAGE
    const getMessages= async ()=>{
      
      const res = await axios.get('/api/message');
      dispatch({
        type: GET_MESSAGES,
        payload: res.data
      });
    };

    // GET MY MESSAGES
    const getMyMessages = async () => {
      const res = await axios.get('/api/message/my_messages');
      console.log(res.data);
      dispatch({
        type: MY_MESSAGES,
        payload: res.data
      });
    };

    // ADD MESSAGE
    const addMessage = async ( message ) => {
      const config = {
        headers: {
            'Content-Type': 'application/json'
        }
      };

      const res = await axios.post ( '/api/message',message, config );

      dispatch({
        type: ADD_SUCCESS,
        payload: res.data
      });

    };

    // DELETE MESSAGE
    const deleteMessage = async (_id) => {

      const res = await axios.delete(`/api/message/${_id}`);

      dispatch({
        type: DELETE_SUCCESS,
        payload: _id
      });

    };

    // EDIT MESSAGE
    const editMessage = async ( message ) => {
        const config = {
          headers: {
            'Content-Type' : 'application/json'
          }
        };
        console.log(message._id);

        const res = axios.put(`/api/message/${message._id}`,
        message,
        config );
        
        dispatch({
          type: EDIT_SUCCESS,
          payload: res.data
        });
        // console.log(res);
    };

    // RETURN ----------------------------------------------->
    return (
        <MessageContext.Provider
          value={{
            messages: state.messages,
            current: state.current,
            myMessages: state.myMessages,
            getMessages,
            addMessage,
            deleteMessage,
            editMessage,
            setCurrent,
            getMyMessages
          }}
        >
          {props.children}
        </MessageContext.Provider>
    );
};

export default MessageState;