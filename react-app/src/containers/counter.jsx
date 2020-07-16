import React from 'react'
import {connect} from 'react-redux'
import MyIndex from '../pages/index/index'
import {increment,decrement,decrementAnsyc}  from '../redux/action'

export default connect(
    state =>({count:state}),
   {increment,decrement,decrementAnsyc}
)(MyIndex)