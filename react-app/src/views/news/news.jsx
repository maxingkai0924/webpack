import React, { Component } from 'react'

class MyNews extends Component{
 constructor(){
     super();
     this.state={
        newsArr:[
            'newsArr001',
            'newsArr002',
            'newsArr003',
        ]
    };
 }
 render(){
    return (
        <div>
            <ul>
                {this.state.newsArr.map((item,index)=><li key={index}>{item}</li>)}
            </ul>
        </div>
    )
    }
}

export default MyNews