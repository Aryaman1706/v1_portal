import React, { useContext, useEffect, Fragment } from 'react';
import MessageItem from './MessageItem';
import AuthContext from '../../context/auth/authContext';
import Spinner from '../layout/Spinner';

const StaredMessages = () => {

    const authContext = useContext(AuthContext);
    
    const { user, staredMessages, loadUser, token } = authContext;

    useEffect( ()=>{
         loadUser();
        // eslint-disable-next-line
    },[]);

    return (
        <Fragment>
        { staredMessages ? 
            <Fragment>
            { staredMessages.map( message => 
                <MessageItem message={message} key={message._id} />
            )}
            </Fragment> : 
            <Spinner />
        }

        </Fragment>
    );
}

export default StaredMessages
