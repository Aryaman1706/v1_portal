import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

const PositionRoute = ({ component: Component, ...rest }) => {
    const authContext = useContext(AuthContext);
    const { user,loadUser } = authContext;
    
    useEffect(()=>{
        loadUser();
    },[]);

  console.log(user);
  return (
    <Route
      {...rest}
      render={props =>
        (user && (user.position === 'Member') )  ? (
          <Redirect to='/' />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PositionRoute;
