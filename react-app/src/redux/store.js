import {createStore,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {counter} from './reducers.js';
//applyMiddleware应用上异步中间件
const store = createStore(counter,composeWithDevTools(applyMiddleware(thunk)));  //内部会第一次调用redux函数得到出事state值
export default store