import React, { Component } from 'react'
import Mytable from '../table/table'
import Mylist from '../lsit/list';
import Myform from '../form/form'
import Pubsub from 'pubsub-js';
export default class MyApp extends  Component{
    constructor(){
        super();
        this.state = {
            list:[
                {
                    id:0,
                    name:'免费 Window 空间托管',
                    type:'alert-success',
                    address:'济南',
                },
                {
                    id:1,
                    name:'图像的数量',
                    type:'alert-info',
                    address:'北京',
                },
                {
                    id:2,
                    name:'免费 Window 空间托管',
                    type:'alert-warning',
                    address:'菏泽'
                },
                {
                    id:3,
                    name:'24*7 支持',
                    type:'alert-info',
                    address:'临沂'
                },
                {
                    id:4,
                    name:'每年更新成本',
                    type:'alert-danger',
                    address:'威海'
                },
            ]
        }
    }
    componentDidMount(){

        //订阅消息增加列表消息
        Pubsub.subscribe('addList',(msg,{id,name,address,type})=>{
            let obj ={
                id,
                name,
                address,
                type
            }
            const {list} = this.state;
            list.push(obj);
            this.setState({list});
        });

         //订阅消息删除列表消息
         Pubsub.subscribe('removeList',(msg,index)=>{
            let list = this.state.list.filter((item)=>{
                return  item.id != index;
            });
            // console.log(list);
            this.setState({list})
        });
    }
    render(){
        const len = this.state.list.length;
        console.log(len)
        return (
             <div className="panel panel-success">
             <div className="panel-heading">
                 <h3 className="panel-title">Panel title</h3>
             </div>
             <div className="panel-body">
                 <div className='row'>
                     {/* <Mylist  list = {this.state.list}></Mylist> */}
                     <div className="col-lg-6"><Myform len={len}></Myform></div>
                     <div className="col-lg-6"><Mytable list = {this.state.list}></Mytable></div>    
                 </div>
                 <Mylist list={this.state.list}></Mylist>
             </div>
             <div className="panel-footer">Panel footer</div>
         </div>
        )
    }
    //用户添加
    addList=({id,name,address})=>{
        let obj ={
            id,
            name,
            address
        }
        const {list} = this.state;
        list.push(obj);
        this.setState({list});
    }
    //用户删除
    removeList=(index)=>{
       let list = this.state.list.filter((item)=>{
            return  item.id != index;
        });
        // console.log(list);
        this.setState({list})
    }
}
