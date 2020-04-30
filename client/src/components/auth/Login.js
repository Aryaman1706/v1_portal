import React,{ useContext, useEffect, useState } from 'react';
import AuthContext from '../../context/auth/authContext';

const Login = (props) => {
    const authContext = useContext(AuthContext);

    const {login, isAuthenticated, loginGoogle, loadUser} = authContext;

    useEffect(()=>{
        loadUser();

        if(isAuthenticated) {
            props.history.push('/');

            // alert

            // eslint-disable-next-line
        }
    },[isAuthenticated, props.history]);

    const [user, setUser] = useState({
        email:'',
        password:''
    });

    const {email, password}= user;

    const onChange=(e)=>{
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const onSubmit=(e)=>{
        e.preventDefault();
        // checking
        login({
            email,
            password
        });
    };

    const onClick=()=>{
        loginGoogle();
    }

    return (
        <div className="valign-wrapper" style={{height: "100%", width: "100%", position: "absolute"}}>
        <div className="container">
            <h1 className="center-align">Login</h1>

                <a href="/signup"> <h6 className="black-text center-align">SignUp</h6> </a>
                <br/>

            <form onSubmit={onSubmit}>
                <div className="input-field">
                    <input 
                    type="email" 
                    id="email"
                    name='email'
                    value={email}
                    onChange={onChange} 
                    required />
                    
                    <label className="active" htmlFor="email">Email</label>
                </div>
                <div className="input-field">
                  <input 
                  type="password" 
                  id="password" 
                  name='password'
                  value={password}
                  onChange={onChange}
                  required />
                  <label className="active" htmlFor="email">Password</label>
                </div>
                <div className="input-field" style={{textAlign: "center", marginBottom: "0px"}}>
                    <button className="btn" type="submit" name="action">Login
                    </button>
                </div>
            </form>
            
            <div style={{textAlign: "center"}}>
                <h5 className="center-align" style={{marginTop:"15px", marginBottom: "15px"}}>OR</h5>
                <button className="btn red" onClick={onClick}>SignIn with Google</button>
            </div> 
        </div>
    </div>
    );
}

export default Login