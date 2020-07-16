import React, { Component } from 'react'
import  PropTypes from 'prop-types'

export default class MyIndex extends Component{
    constructor(props){
        super(props)
    }
    static propTypes = {
        count:PropTypes.number.isRequired,
        increment:PropTypes.func.isRequired,
        decrement:PropTypes.func.isRequired,
        decrementAnsyc:PropTypes.func.isRequired
    }
    render(){
        const {count} = this.props;
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
        this.props.increment(number);
    }
    decrement=()=>{
        let number = this.select.value*1
        this.props.decrement(number);
    }
    incrementOdd=()=>{
        let number = this.select.value*1
        let {count} =  this.props;
        if(count%2==1){
            this.props.increment(number);
        }
    }
    incrementasync=()=>{
        let number = this.select.value*1
        // setTimeout(()=>{
        //     this.props.decrement(number);
        // },1000)
        this.props.decrementAnsyc(number);
    }
}

