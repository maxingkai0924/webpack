import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PubSub from 'pubsub-js'
class Mytable extends Component{
    constructor(props){
        super(props);
        this.state = {
             msg:'这是表格'
        }
    }
    static propTypes = {
        list:PropTypes.array.isRequired,
        // removeListTable:PropTypes.func.isRequired,
    }
    componentDidMount(){
        //数据渲染钩子函数
        const obj1 = document.getElementsByTagName('table');
        //订阅消息
        PubSub.subscribe('handlClick',(msg,data)=>{
            console.log(msg);
            console.log(data);
        })
    }   
    componentWillMount(){
        console.log(this.state.msg)
    }
    render(){
        let {list} = this.props;
        return (
            <div>
                    <h2>表格</h2>
                    <p> .table 为任意表格添加基本样式 (只有横向分隔线):</p>            
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Firstname</th>
                                <th>address</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list.map((item,index)=><tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.address}</td>
                                <td><button type="button" className="btn btn-xs btn-warning" onClick={()=>this.removeList(item.id)}>删除</button>  </td>
                            </tr>)}
                        </tbody>
                    </table>
            </div>
        )
    }
    removeList=(index)=>{
        // this.props.removeListTable(index)
        PubSub.publish('removeList',index)
    }
}

export default Mytable