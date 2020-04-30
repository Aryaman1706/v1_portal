import React, { useState, useContext } from 'react';
import MessageContext from '../../context/message/messageContext';

const Edit = (props) => {

    const messageContext = useContext(MessageContext);

    const { editMessage } = messageContext;

    const current = JSON.parse(localStorage.getItem('current'));


    const [ message, setMessage ] = useState({
        subject : current.subject,
        statement : current.statement,
        to : current.to,
        _id : current._id
    });

    const { subject, statement, to } = message;

    const onChange = (e) => {
        setMessage({
            ...message,
            [e.target.name] : e.target.value
        })
    };

    const onSubmit = (e) => {
        e.preventDefault();
        editMessage(message);
        props.history.push('/');
        localStorage.setItem('current', null);
    }; 

    return (
        <div className="valign-wrapper" style={{height: "100%", width: "100%", position: "absolute"}}>
        <div className="container">
            <h1 className="center-align">Edit Message</h1>
                <br/>
            <form 
            onSubmit={onSubmit}
            >
                <div className="input-field">
                    <input 
                    type="text"
                    name='subject' 
                    required
                    value={subject}
                    onChange={onChange}
                    />

                    <label className="active">Subject</label>
                </div>

                <div className="input-field">
                    <input 
                    type="text" 
                    name='statement' 
                    required
                    value={statement} 
                    onChange={onChange} 
                    />

                    <label className="active">Statement</label>
                </div>

                <div className="input-field">
                    <input 
                    type="text" 
                    name='to' 
                    required
                    value={to} 
                    onChange={onChange} 
                    />

                    <label className="active">To:</label>
                </div>

                <div className="input-field" style={{textAlign: "center", marginBottom: "0px"}}>
                    <button className="btn" type="submit" name="action">Update
                    </button>
                </div>
            </form>
        </div>
    </div>
    )
}

export default Edit
