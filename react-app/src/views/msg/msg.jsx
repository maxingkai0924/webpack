import React, { Component } from 'react'
import {NavLink,Switch,Route,Redirect} from 'react-router-dom'

import msgDetail from '../msg-detail/msg-detail'
class Mymessage extends Component{
    constructor(){
        super();
        this.state = {
             message:[]
        }
    }
    componentDidMount(){
         setTimeout(()=>{
             const message = [
                {id:1,title:"message001"},
                {id:2,title:"message002"},
                {id:3,title:"message003"},
                {id:4,title:"message004"},
             ]
             this.setState({message})
         },1000)
    }
    render(){
        return (
           <div>
                <ul>
                    {this.state.message.map((m,index)=>
                    (
                    <li key={index}>
                            <NavLink to={`/home/msg/messagedetail/${m.id}`}>{m.title}</NavLink>
                        </li> 
                        )  
                    )}
                </ul>
                <Route path='/home/msg/messagedetail/:id' component={msgDetail}></Route>
           </div>
        )
    }
}

export default Mymessage