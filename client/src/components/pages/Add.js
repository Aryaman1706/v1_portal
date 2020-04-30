import React, { useState, useContext } from 'react';
import MessageContext from '../../context/message/messageContext';

const Add = (props) => {

    const messageContext = useContext(MessageContext);

    const { addMessage } = messageContext;

    const [ message, setMessage ] = useState({
        subject : "",
        statement : "",
        to : ""
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
        addMessage(message);
        props.history.push('/');
    }; 

    return (
        <div className="valign-wrapper" style={{height: "100%", width: "100%", position: "absolute"}}>
        <div className="container">
            <h1 className="center-align">Add Message</h1>
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
                    <button className="btn" type="submit" name="action">Send
                    </button>
                </div>
            </form>
        </div>
    </div>
    )
}

export default Add
