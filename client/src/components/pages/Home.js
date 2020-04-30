import React, { Component, useContext, useEffect } from 'react';
import Navbar from '../layout/Navbar';
import Messages from '../messages/Messages';
import AuthContext from '../../context/auth/authContext';
import AuthState from '../../context/auth/AuthState';
import MessageState from '../../context/message/MessageState';
import StaredMessages from '../messages/StaredMessages';
import Spinner from '../layout/Spinner';

const Home = (props) => {
    const authContext = useContext(AuthContext);

    const { isAuthenticated, loadUser, user } = authContext;
    
    
    if(isAuthenticated === false) {
        props.history.push('/login');
    };

    useEffect(()=>{
        loadUser();
        localStorage.setItem('current', null);
        // eslint-disable-next-line
    },[]);

    return (
        <AuthState>
            <MessageState>
                <div>
                    <Navbar />
                    <div className='container'>
                        { user ?
                            <div>
                                <h5 className='center-align' style={{fontWeight:'bold'}}>Messages for You</h5>
                                <div className='outer'>
                                    <Messages />
                                </div>

                                <h5 className='center-align' style={{fontWeight:'bold'}}>Starred Messages</h5>
                                <div className='outer'>
                                    <StaredMessages />
                                </div>
                            </div> :
                            <Spinner />   
                        }
                    </div>
                </div>
            </MessageState>
        </AuthState>   
    )
}

export default Home
