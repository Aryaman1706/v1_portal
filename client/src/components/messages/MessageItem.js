import React, { useContext, Fragment, useEffect } from 'react';
import { withRouter, Redirect } from 'react-router-dom'
import MessageContext from '../../context/message/messageContext';
import AuthContext from '../../context/auth/authContext';
import Spinner from '../layout/Spinner';

const MessageItem = (props) => {

    const messageContext = useContext(MessageContext);
    
    const authContext = useContext(AuthContext);

    const { deleteMessage, setCurrent } = messageContext;

    const { user, starMessage, unstarMessage, loadUser } = authContext;

    useEffect(()=>{
        loadUser();
    },[])
    
    const { position, staredMessages } = user;

    const { _id, subject, statement, to, from, date } = props.message;

    const onDelete = () => {
        deleteMessage(_id);
    };

    const onEditForm = () => {
        setCurrent(props.message);
        props.history.push('/edit');
    };

    const stared = (id) => {
        var length = staredMessages.length;
        var i;
        for ( i=0; i<length; i++ ) {
            if( id == staredMessages[i]._id ) {
                return true;
            }
        };
        if ( i=== length ) {
            return false;
        }
    };

    const onStarAdd = () => {
        setCurrent(props.message);
        starMessage(_id);
        
    };

    const onStarRemove = () => {
        unstarMessage(_id);
    };

    const positionLinks = (
        <div className='inner'>
            <h6 className="m-text">{subject}</h6>
            <p className='text-custom'>From {from}</p>
            <p className='text-custom'>{date}</p>
            <p className='text-custom'>{statement}</p>
            <button 
            className="btn blue custom"
            onClick={onEditForm}
            >
            <i className='material-icons'>edit</i>
            </button>

            <button 
            className="btn blue custom"  
            onClick={onDelete}
            >
            <i className='material-icons'>delete</i>
            </button>

            { stared (_id) === true ? 
                <button 
                className="btn blue custom"
                onClick={onStarRemove}
                >
                <i className='material-icons'>star</i>
                </button> : 
                <button 
                className="btn blue custom"
                onClick={onStarAdd}
                >
                <i className='material-icons'>star_border</i>
                </button> 
            }

        </div>
    );

    const memberLinks = (
        <div className='inner'>
            <h6 className="m-text">{subject}</h6>
            <p className='text-custom'>From {from}</p>
            <p className='text-custom'>{date}</p>
            <p className='text-custom'>{statement}</p>
            
            { stared (_id) === true ? 
                <button 
                className="btn blue custom" 
                onClick={onStarRemove}
                >
                <i className='material-icons'>star</i>
                </button> : 
                <button 
                className="btn blue custom" 
                onClick={onStarAdd}
                >
                <i className='material-icons'>star_border</i>
                </button> 
            }

        </div>
    )

    return(
        <Fragment>
            {user === null ? <Spinner /> : position===from ? positionLinks : memberLinks }
        </Fragment>
    );



}

export default withRouter(MessageItem) ; 