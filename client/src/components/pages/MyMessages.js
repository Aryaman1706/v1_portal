import React, { useContext, useEffect, Fragment } from 'react';
import MessageItem from '../messages/MessageItem';
import AuthContext from '../../context/auth/authContext';
import MessageContext from '../../context/message/messageContext';
import Spinner from '../layout/Spinner';
import Navbar from '../layout/Navbar';

const MyMessages = () => {

    const authContext = useContext(AuthContext);

    const messageContext = useContext(MessageContext);
    
    const { loadUser } = authContext;

    const { getMyMessages, myMessages } = messageContext

    useEffect( ()=>{
         loadUser();
         getMyMessages();
        // eslint-disable-next-line
    },[]);
    return (
        <Fragment>
        <Navbar/>
            <div className='container' style={{backgroundColor: 'black', padding: '5px', marginTop: '15px'}}>
                { myMessages ? 
                        <Fragment>
                        { myMessages.map( message => 
                            <MessageItem message={message} key={message._id} />
                        )}
                        </Fragment> : 
                        <Spinner />
                }
            </div>
        </Fragment>
    );
}

export default MyMessages
