import React from 'react'
import './app.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'

import {HashRouter} from 'react-router-dom'
import Routes from './routes'

import Main from '../../components/templates/main'
import Logo from '../../components/templates/logo'
import Nav from '../../components/templates/nav'
import Footer from '../../components/templates/footer'
import Home from '../../components/templates/home/home'

export default props=>
    <HashRouter>
    <div className="app">
        <Logo/>
        <Nav/>
        <Routes/>
        <Footer/>
    </div>
    </HashRouter>