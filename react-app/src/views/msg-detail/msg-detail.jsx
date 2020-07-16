import React, { Component } from 'react'

class MyDetail extends Component{
    constructor(){
        super()
        this.state = {
            allMsg:[
                {id:1,title:'msg001',content:"我爱你，中国"},
                {id:2,title:'msg002',content:"我爱你，老婆"},
                {id:3,title:'msg003',content:"我爱你，孩子"},
                {id:4,title:'msg004',content:"我爱你,父母"},
            ]
        }
    }
    render(){
        const {id} = this.props.match.params;
        const message =  this.state.allMsg.find((m)=>m.id==id); //返回第一个找到的数组元素
        console.log(message);
        return (
            <ul>
                <li>ID:{message.id}</li>
                <li>TITLE:{message.title}</li>
                <li>CONTENT:{message.content}</li>
            </ul>
        )
    }
}

export default MyDetail