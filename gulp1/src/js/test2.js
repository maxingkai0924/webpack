import './main.js';
import Vue from 'vue';
console.log(5555,Vue)
let app = new Vue({
    el:'#app',
    data:{
        name:"名字"
    },
    mounted(){
        console.log(3333);
        console.log('das')
    }
})