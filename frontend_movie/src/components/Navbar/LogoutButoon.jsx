import React from 'react';

const LogoutButton = () => {
    const handleLogout = () => {
       
        localStorage.removeItem('access_token');

       
        window.location.href = '/login'; 
    };

    return (
        <button className= "btn btn-outline-success my-2 my-sm-0"   onClick={handleLogout}>
            Logout
        </button>
    );
};

export default LogoutButton;
