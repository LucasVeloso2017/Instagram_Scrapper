import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

import Home from '../../components/templates/home/home'
import UserCrud from '../../components/user/usercrud'


export default props => 
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/users' component={UserCrud} />
        <Redirect from='*' to='/' />
    </Switch>