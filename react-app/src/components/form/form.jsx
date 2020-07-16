import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Pubsub, { name } from 'pubsub-js';
export default class MyComponent extends Component{
    constructor(props){
        super(props);
        //数据
        this.state = {
            name:'',
            address:''
        }
    }
    //获取父组件的属性和方法加限制
    static propTypes = {
        len:PropTypes.number.isRequired,
        // addListForm:PropTypes.func.isRequired
    }
    //渲染标签
    render(){ 
        return(
            <form className="form-horizonta"> 
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Name</label>
                    <input type="text" className="form-control" value={this.state.name} ref='name' onChange={this.onChangeName} placeholder="name" />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Email address</label>
                    <textarea className="form-control" value={this.state.address} ref='address' onChange={this.onChangeAddress} rows="3"></textarea>
                </div>
                <div className='form-group'>
                    <button type="button" className="btn btn-primary btn-block" onClick={this.addList}>Submit</button>
                </div>
            </form>
        )  
    }
    //点击增加
    addList=()=>{
        if(this.refs.name.value===''){
            alert('请填写用户名');
            return
        }
        if(this.refs.address.value===''){
            alert('请填写地址');
            return
        }
        var arr= ['alert-success','alert-info','alert-warning','alert-danger']
        let num = Math.floor(Math.random() * 4)
        console.log(arr[num])
        let obj = {
            name:this.refs.name.value,
            address:this.refs.address.value,
            id:this.props.len,
            type:arr[0],
        }
        // this.props.addListForm(obj);
        //发布消息
        Pubsub.publish('addList',obj)
        this.setState({
            name:'',
            address:''
        })
    }
    //监听用户名
    onChangeName=()=>{
       const name= this.refs.name.value;
       this.setState({name})
    }
    //监听地址
    onChangeAddress=()=>{
        const address= this.refs.address.value;
        this.setState({address})
    }

}
