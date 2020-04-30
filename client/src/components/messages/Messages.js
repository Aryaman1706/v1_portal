import React, { useContext, useEffect, Fragment } from 'react';
import MessageItem from './MessageItem';
import MessageContext from '../../context/message/messageContext';
import AuthContext from '../../context/auth/authContext';

const Messages = () => {

    const messageContext = useContext(MessageContext);
    const authContext = useContext(AuthContext);

    const { messages, getMessages } = messageContext;

    useEffect(()=>{
        authContext.loadUser();
        getMessages();
        // eslint-disable-next-line
    },[]);
    console.log(messages)
    return (
        <Fragment>
            { messages.map( message => 
                <MessageItem message={message} key={message._id} />
            )}
        </Fragment>
    );
}

export default Messages
