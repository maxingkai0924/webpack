import React, { Component } from 'react'
import {Button,Toast} from 'antd-mobile'
class MyAntd extends Component{
    render(){
        return (
            <div>
                <Button type='primary' onClick={this.hand}>Start</Button>
            </div>
        )
    }
    hand = () =>{
        Toast.info('Toast without mask !!!', 2, null, false);
    }
}

export default MyAntd