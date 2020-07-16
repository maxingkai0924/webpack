import React, { Component } from 'react'
import Mytable from '../table/table'
import Mylist from '../lsit/list';
import Myform from '../form/form'
export default class MyComponent extends  Component{
 render(){
   return (
        <div className='container'>
          <Mytable></Mytable>
          <Mylist></Mylist>
          <Myform></Myform>
        </div>
   )
 }
}
