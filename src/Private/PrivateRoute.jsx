import React from 'react'
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const PrivateRoute = ({ children }) => {
    const storedUser = localStorage.getItem('loggedUser');

    const user = (JSON.parse(storedUser));


    if (user?.email) {
        return children
    }

    else {
        return (
            Swal.fire({
                title: "سىز ئەزا ئەمەسكەنسىز",
                text: "تىزىملىتىپ ئەزا بولۇڭ",
                icon: "ئەسكەرتىش",
                confirmButtonText: "ياخشى",
            }) && <Navigate to='/registration'></Navigate>
        );
    }
};

export default PrivateRoute