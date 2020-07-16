// 包含所有action
import {INCREMENT,DECRMENT} from './action-type';
//同步返回对象，异步返回一个函数
import { number } from 'prop-types';
//增加
export const increment = (number) =>({type:INCREMENT,data:number});
//减少
export const decrement = (number) =>({type:DECRMENT,data:number});

//异步action
export const decrementAnsyc = (number)=>{
    return dispatch =>{
        setTimeout(()=>{
             dispatch(decrement(number))
        },1000);
    }
}