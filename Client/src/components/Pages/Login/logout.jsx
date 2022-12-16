import './Login.css'
import React, { useState, useContext } from 'react';

import { AuthContext } from '../../Contexts/auth';


export default function logoutreturn() {
    const { authenticated, logout } = useContext(AuthContext);
     logout();
};


