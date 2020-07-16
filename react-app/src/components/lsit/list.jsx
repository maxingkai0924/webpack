import React, { Component } from 'react';
import PropTypes from 'prop-types'
import PubSub from 'pubsub-js'
class MyComponent extends  Component{
    constructor(props){
        super(props)
        this.state = {
            msg:'这是表格',
        }
    }
    //属性限制
    static propTypes = {
        list:PropTypes.array.isRequired
    }
    render(){
        let {list} = this.props;
        return (
            <div>
                {list.map((item)=><div className={`alert ${item.type}`} key={item.id} onClick={()=>this.removeList(item.id)}>{item.name}</div>)}
                <button onClick={this.handlClick}>选中事件</button>
            </div>
        )
    }
    removeList=(index)=>{
        // this.props.removeListTable(index)
        PubSub.publish('removeList',index)
    }
    handlClick=()=>{
        //注册消息
        PubSub.publish('handlClick',this.state.msg)
    }
}

export default MyComponent