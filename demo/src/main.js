import './public/nav.js';
import Vue from 'vue';
import ElementUI from 'element-ui';
import axios from './public/axios.js'; // http 请求工具
import locale from 'element-ui/lib/locale/lang/en';
import  './public/security.js'
Vue.use(ElementUI, {
    locale
});


if (!!sessionStorage.getItem('userInfo')) {
    let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    let str = userInfo['account'];
    if (str.length > 15) {
        str = str.slice(0, 15)+'...';
    }
    $('.btnGroup').html(
        `<button class="login people-info" style='color:#fff;width:auto;line-height:20px'>
            ${str}
        </button>
        <button class="register exit" style='color:#fff;width:auto;line-height:20px'>
        Sign Out
        </button>`
    );
    $('.exit').click(function () {
        sessionStorage.removeItem('userInfo');
        window.location.reload();
    })
}