var REG = {
    mobile: /^1[3|4|5|6|7|8|9][0-9]{9}$/,
};
var GLOBAL = {
    VERSION: "/v2.0",
    IMAGESERVER: "http://pic.laifumofang.com"
};
// app内部环境变量保存

getUrlParam("isApp") ? localStorage.setItem("isApp", 1) : 0;
isApp() ? $(".mui-bar-nav").remove() : $(".mui-bar-nav").show();
function isApp() {
    return localStorage.getItem("isApp") ? 1 : 0;
}

$(function () {
    var promotionCode = getUrlParam("promotionCode");
    promotionCode && localStorage.setItem("promotionCode", promotionCode);
    var activityCode = getUrlParam("activityCode");
    activityCode && localStorage.setItem("activityCode", activityCode);

    // 百度统计
    var _hmt = _hmt || [];
    (function () {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?ea950bac97de412fbc88d70bef8caa34";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
    })();
});
function ajax(param) {
    console.log("请求:" + param.url);
    $.ajax({
        url: param.url,
        type: param.type || 'POST',
        dataType: param.dataType || 'json',
        data: param.data || {},
        cache: false, // 不缓存数据
        async: param.async == undefined ? true : param.async,
        processData: param.processData == undefined ? true : param.processData,
        //contentType:"application/x-www-form-urlencoded",
        contentType: param.contentType == undefined ? 'application/json' : param.contentType,
        success: function (data, status, xhr) {
            // console.log("-----请求完成,地址 :" + param.url);
            // console.log(data ? JSON.stringify(data) : "服务器响应数据为空");
            if (xhr.getResponseHeader("sessionState") == "notLogin" || data.code == "599") {
                location.href = "/mobile/login.html";
                return false;
            }
            param.success(data || {success: false}, status, xhr);
        },
        error: function (xhr, status) {
            if (param.error) {
                param.error(xhr, status)
            }
            // console.error(param.url);
            // console.log(xhr.getAllResponseHeaders());
            // console.error("ajaxError:status=" + status);
            // console.log(xhr.responseText);
        },
    });
}

function msg(m) {
    window.mui && mui.toast(m);
}

function showEmpty($ele, msg) {
    $ele.length > 0 && ($ele.html('<div class="empty">' + (msg || "暂无数据") + '</div>'));
}
/**
 * 验证登录状态，获取用户信息
 *  参数：p  object
 *
 *  p.force 是否强制,默认false
 *  p.success 已登录回调
 *  p.fail 未登录回调
 */
function checkLoginState(p) {
    !p && (p = {});
    // p.force == true && (p.L_index = loading());

    ajax({
        url: "/user" + GLOBAL.VERSION + "/userInfo",
        type: "get",
        success: function (result) {
            // p.L_index && layer.close(p.L_index);
            if (result.success && result.data) {
                p.success && p.success(result.data);
            } else {
                p.force == true && (location.href = "/login.html");
                p.fail && p.fail(result.fail);
            }
        }
    });
}


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
 * 隐藏手机号 158***5393
 *
 * @param mobile 手机号
 */
function mobilehide(mobile) {
    return REG.mobile.test(mobile)
        ? mobile.replace(/^(\d{3})(\d{4})(\d{4})$/, "$1****$3")
        : mobile;
}


/**
 * 渲染模板
 *
 * @param params
 * {
 *  targetId:目标id
 *  template:模板名称(注：不写路径，默认从template文件下查找)
 *  htmlData:数据对象
 *  callBack:回调函数
 * }
 * @author mengLei
 */
function renderHtml(params) {
    var $ele = $('#' + params.targetId);
    if ($ele.length == 0) {
        return;
    }
    //获取模板
    $.ajax({
        url: getTemplatePath(params.template),
        dataType: 'html',
        type: "get",
        // async: false,//异步加载
        success: function (html) {
            //渲染模板
            $ele.html(template.render(html, params.htmlData));
            if (params.callBack) {
                params.callBack();
            }
        }
    });
}

/**
 * 获取模板完成路径
 *
 * @param template 注：不写路径，默认从template文件下查找
 * @returns {string}
 * @author mengLei
 */
function getTemplatePath(template) {
    if (template.indexOf("/") == 0) {
        return template;    //全路径直接返回
    } else {
        return location.pathname.substring(0, location.pathname.lastIndexOf("/") + 1) + "template/" + template + ".html";
    }
}


/**
 * 获取所有表单域的键值对
 *
 * @param formId
 * @author mengLei
 */
function getFormData(formId) {
    var field = [];
    var fieldElem = $('#' + formId).find('input,select,textarea');

    layui.each(fieldElem, function (_, item) {
        if (!item.name) return;
        if (/^checkbox|radio$/.test(item.type) && !item.checked) return;
        field[item.name] = item.value;
    });

    return field;
}

function getOsType() {
    var flag = "";
    if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+ OS /); //ios终端
        if (isAndroid) {
            flag = 2;
        } else {
            flag = 3;
        }
    } else {
        flag = 1;
    }
    return flag
}

var dateFormat = (function () {
    var _map = {i: !0, r: /\byyyy|yy|MM|cM|eM|M|dd|d|HH|H|mm|ms|ss|m|s|w|ct|et\b/g},
        _12cc = ['上午', '下午'],
        _12ec = ['A.M.', 'P.M.'],
        _week = ['日', '一', '二', '三', '四', '五', '六'],
        _cmon = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'],
        _emon = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    var _fmtnmb = function (_number) {
        _number = parseInt(_number) || 0;
        return (_number < 10 ? '0' : '') + _number;
    };
    var _fmtclc = function (_hour) {
        return _hour < 12 ? 0 : 1;
    };
    var _$encode = function (_map, _content) {
        _content = '' + _content;
        if (!_map || !_content) {
            return _content || '';
        }
        return _content.replace(_map.r, function ($1) {
            var _result = _map[!_map.i ? $1.toLowerCase() : $1];
            return _result != null ? _result : $1;
        });
    };
    return function (_time, _format, _12time) {
        if (!_time || !_format)
            return '';
        _time = new Date(_time);
        _map.yyyy = _time.getFullYear();
        _map.yy = ('' + _map.yyyy).substr(2);
        _map.M = _time.getMonth() + 1;
        _map.MM = _fmtnmb(_map.M);
        _map.eM = _emon[_map.M - 1];
        _map.cM = _cmon[_map.M - 1];
        _map.d = _time.getDate();
        _map.dd = _fmtnmb(_map.d);
        _map.H = _time.getHours();
        _map.HH = _fmtnmb(_map.H);
        _map.m = _time.getMinutes();
        _map.mm = _fmtnmb(_map.m);
        _map.s = _time.getSeconds();
        _map.ss = _fmtnmb(_map.s);
        _map.ms = _time.getMilliseconds();
        _map.w = _week[_time.getDay()];
        var _cc = _fmtclc(_map.H);
        _map.ct = _12cc[_cc];
        _map.et = _12ec[_cc];
        if (!!_12time) {
            _map.H = _map.H % 12;
        }
        return _$encode(_map, _format);
    };
})();


// mui.showLoading("正在加载..","div"); //加载文字和类型，plus环境中类型为div时强制以div方式显示
// mui.hideLoading(callback);//隐藏后的回调函数

//扩展mui.showLoading
(function ($, window) {
    //显示加载框
    $.showLoading = function (message, type) {
        if ($.os.plus && type !== 'div') {
            $.plusReady(function () {
                plus.nativeUI.showWaiting(message);
            });
        } else {
            var html = '';
            html += '<i class="mui-spinner mui-spinner-white"></i>';
            html += '<p class="text">' + (message || "数据加载中") + '</p>';

            //遮罩层
            var mask = document.getElementsByClassName("mui-show-loading-mask");
            if (mask.length == 0) {
                mask = document.createElement('div');
                mask.classList.add("mui-show-loading-mask");
                document.body.appendChild(mask);
                mask.addEventListener("touchmove", function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                });
            } else {
                mask[0].classList.remove("mui-show-loading-mask-hidden");
            }
            //加载框
            var toast = document.getElementsByClassName("mui-show-loading");
            if (toast.length == 0) {
                toast = document.createElement('div');
                toast.classList.add("mui-show-loading");
                toast.classList.add('loading-visible');
                document.body.appendChild(toast);
                toast.innerHTML = html;
                toast.addEventListener("touchmove", function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                });
            } else {
                toast[0].innerHTML = html;
                toast[0].classList.add("loading-visible");
            }
        }
    };

    //隐藏加载框
    $.hideLoading = function (callback) {
        if ($.os.plus) {
            $.plusReady(function () {
                plus.nativeUI.closeWaiting();
            });
        }
        var mask = document.getElementsByClassName("mui-show-loading-mask");
        var toast = document.getElementsByClassName("mui-show-loading");
        if (mask.length > 0) {
            mask[0].classList.add("mui-show-loading-mask-hidden");
        }
        if (toast.length > 0) {
            toast[0].classList.remove("loading-visible");
            callback && callback();
        }
    }
})(mui, window);