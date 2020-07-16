import React, {  Component} from 'react'
import {NavLink,Switch,Route,Redirect} from 'react-router-dom';
import "../../App.css"
import About from '../../views/about/about'
import Home from '../../views/home/home'
class MyApp1 extends Component {
 render(){
   return (
       <div>
           <div className = 'row'>
                <div className='col-md-4'>
                    <div className='list-group'>
                        <NavLink className ='list-group-item' to='/about' activeClassName='activeClass'> About</NavLink>
                        <NavLink className ='list-group-item' to='/home' activeClassName='activeClass'> Home </NavLink>
                    </div>
                </div>
                <div className ='col-md-4'>
                      {/* 只能显示其中一个需要Switch */}
                      <Switch>
                        <Route path='/about' component={About}></Route> 
                        <Route path='/home' component={Home}></Route> 
                        <Redirect to='/about'></Redirect>
                    </Switch>
                </div>
           </div>
       </div>
   )
 }
}

export default MyApp1