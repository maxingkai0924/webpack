/**
 * @file   新房手机端公共js
 * @author zhaoqf   2018/10/8.
 */


//版本控制url
var GLOBAL={
    VERSION:"/v2.0",
};

/**
 * 获取url中的参数
 *
 * @param name
 * @returns {*}
 */
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return decodeURI(r[2]);
    return null; //返回参数值
}

/**
 * 获取url中的所有参数
 *
 * @returns {*}
 */
function getUrlAllParam() {
    var url = location.search;
    var theRequest = {};
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        var strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}

/**
 * 获取所有表单域的键值对
 *
 * @param formId
 * @author mengLei
 */
function getFormData(formId) {
    var field = {};
    var fieldElem = $('#' + formId).find('input,select,textarea');

    $.each(fieldElem, function (_, item) {
        if (!item.name) return;
        if (/^checkbox|radio$/.test(item.type) && !item.checked) return;
        field[item.name] = item.value;
    });

    return field;
}

