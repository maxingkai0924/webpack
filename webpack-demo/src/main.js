window.Promise=Promise;
import './public/header'
import './public/crumbs'
import './public/nav.js';
import Vue from 'vue';
import ElementUI from 'element-ui';
import axios from './public/axios.js'; // http 请求工具
import locale from 'element-ui/lib/locale/lang/en';
import  './public/security.js';
Vue.use(ElementUI, {
    locale
});

console.log($)
