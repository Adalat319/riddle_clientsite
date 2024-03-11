import React, { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom';
// import { Navigation } from 'swiper/modules';
import { MyAuthContext } from './src/Context/AuthContext';

const PrivateRoute = ({ children }) => {

    const { user, loading } = useContext(MyAuthContext);
    console.log(user);
    const location = useLocation();

    if (user) {
        return children
    }

    return <Navigate to='/login' state={location.state}></Navigate>
}

export default PrivateRoute