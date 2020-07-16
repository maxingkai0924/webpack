import React, { Component } from 'react'
import {INCREMENT,DECRMENT } from '../../redux/action-type'
import * as actions from '../../redux/action'
class MyHome extends Component{
    constructor(props){
        super(props)
        this.state={
            count:0
        }
    }
    render(){
        const count = this.props.store.getState();
        return (
            <div>
                <p>click {count}</p>
                <select ref={select=>this.select=select}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select> &nbsp;
                <button onClick={this.increment}> + </button>  &nbsp;
                <button onClick={this.decrement}> - </button>&nbsp;
                <button onClick={this.incrementOdd}>increment if odd</button>&nbsp;
                <button onClick={this.incrementasync}>increment if async</button>&nbsp;
            </div>
        )
    }
    increment=()=>{
        let number = this.select.value*1
        // let count =  number +  this.state.count
        // this.setState({count})
        //调用store的方法更新状态
        this.props.store.dispatch(actions.incrementCreator(number));
    }
    decrement=()=>{
        let number = this.select.value*1
        this.props.store.dispatch(actions.decrement(number));
    }
    incrementOdd=()=>{
        let number = this.select.value*1
        let count =  this.props.store.getState();
        if(count%2==1){
            this.props.store.dispatch(actions.incrementCreator(number));
        }
    }
    incrementasync=()=>{
        let number = this.select.value*1
        setTimeout(()=>{
            this.props.store.dispatch(actions.decrement(number));
        },1000)
    }
}

export default MyHome