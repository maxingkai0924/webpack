import React, { Component} from 'react';
import {NavLink,Switch,Route,Redirect} from 'react-router-dom'

import News from '../news/news';
import Message from '../msg/msg'
class MyHome extends Component {
    render(){
        return (
            <div>
                <h2>Home标题</h2>
                <div>
                    <ul className='nav nav-tabs'>
                        <li>
                            <NavLink  to='/home/news' activeClassName='activeClass'> news</NavLink>
                        </li>
                        <li>
                        <NavLink  to='/home/msg' activeClassName='activeClass'> msg </NavLink>
                        </li>
                    </ul>
                    <div>
                        <Switch>
                             <Route path='/home/news' component={News}></Route>
                             <Route path ='/home/msg' component={Message}></Route>
                             <Redirect to='/home/news'></Redirect>
                        </Switch>
                    </div>
                </div>
            </div>
        )
    }
}

export default MyHome