import React , {useContext, useEffect, useReducer} from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import AuthState from '../../context/auth/AuthState';

const Navbar = (props) => {
  const authContext = useContext(AuthContext);
  const { user, logout, loadUser } = authContext;

  useEffect(()=>{
    loadUser();
    //eslint-disable-next-line
  },[]);

  const onLogout=()=>{
    logout();
  };

  const positionNavbar=(
    <ul id="nav-mobile" className="right">
      <li><Link to='/profile' >Hello {user && user.name}</Link></li>
      <li><a href='./add'>Add</a></li>
      <li><a href='./my_messages'>My Messages</a></li>
      <li><a href='/login' onClick={onLogout}>LogOut</a></li>
    </ul>
  );

  const memberNavbar = (
    <ul id="nav-mobile" className="right hide-on-med-and-down">
      <li><Link to='/profile' >Hello {user && user.name}</Link></li>
      <li><a href='/login' onClick={onLogout}>LogOut</a></li>
    </ul>
  );

    return (
      <AuthState>
        <div className="navbar-fixed">
          <nav style={{backgroundColor: "black"}}>
              <div className="nav-wrapper">
                <a className="brand-logo">PORTAL</a>
                 {user && user.position !=='Member' ? positionNavbar: memberNavbar }
              </div>
            </nav>
      </div>
    </AuthState>
    )
}

export default Navbar
