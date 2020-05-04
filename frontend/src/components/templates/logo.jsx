import React from 'react'
import './logo.css'
import Logo from '../../assets/images/instagram.jpg'

import {Link} from 'react-router-dom'


export default props=>
    <aside className="logo">
        <Link to="/" className="logo">
            <img src={Logo}/>
        </Link>
    </aside>