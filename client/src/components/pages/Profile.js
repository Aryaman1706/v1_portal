import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../context/auth/authContext'

const Profile = (props) => {
    const authContext = useContext(AuthContext);

    const { loadUser, user, updateUser } = authContext;

    

    // useEffect(()=>{
    //     loadUser();
    // },[]);


    const [ profile, setProfile ] = useState({
        name: user.name,
        email: user.email,
        phone: user.phone
    });

    const { name, email, phone } = profile;

    const onChange = (e) => {
        setProfile({...profile, [e.target.id]: e.target.value})
    };

    const onSubmit = (e) => {
        e.preventDefault();
        updateUser(profile);
        props.history.push('/')

    }; 

    return (
        <div className="valign-wrapper" style={{height: "100%", width: "100%", position: "absolute"}}>
        <div className="container">
            <h1 className="center-align">Profile</h1>
                <br/>
            <form
             onSubmit={onSubmit}
            >
                <div className="input-field">
                    <input 
                    type="text"
                    id="name"
                    name='name' 
                    required
                    value={name}
                    onChange={onChange}
                    />

                    <label className="active" >Name</label>
                </div>

                <div className="input-field">
                    <input 
                    type="email" 
                    id="email"
                    name='email' 
                    required
                    value={email} 
                    onChange={onChange} 
                    />

                    <label className="active" >Email</label>
                </div>

                <div className="input-field">
                  <input 
                  type="text" 
                  id="phone"
                  name='phone' 
                  required
                  value={phone} 
                  onChange={onChange} 
                  />

                  <label className="active" >Phone</label>
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

export default Profile
