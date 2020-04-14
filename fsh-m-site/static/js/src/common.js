var REG = {
    mobile: /^1[3|4|5|6|7|8|9][0-9]{9}$/,
};
var GLOBAL = {
    VERSION: "/v2.0",
    IMAGESERVER: "http://pic.laifumofang.com"
};
window.layui && window.layer && (layui.layer = layer);
window.layer && layer.config({
    // skin: 'mf-Dialog',// msg不行
    btnAlign: 'c'
});
$(function () {

    var promotionCode = getUrlParam("promotionCode");
    promotionCode && localStorage.setItem("promotionCode", promotionCode);
    var activityCode = getUrlParam("activityCode");
    activityCode && localStorage.setItem("activityCode", activityCode);

    commonInit();

    //百度统计
    var _hmt = _hmt || [];
    (function () {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?ea950bac97de412fbc88d70bef8caa34";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
    })();
});
function ajax(param) {
    // console.log("请求:" + param.url);
    $.ajax({
        url: param.url,
        type: param.type || 'POST',
        dataType: param.dataType || 'json',
        data: param.data || {},
        cache: false, // 不缓存数据
        async: param.async == undefined ? true : param.async,
        processData: param.processData == undefined ? true : param.processData,
        contentType: param.contentType == undefined ? 'application/json' : param.contentType,
        success: function (data, status, xhr) {
            // console.log("-----请求完成,地址 :" + param.url);
            // console.log(data ? JSON.stringify(data) : "服务器响应数据为空");
            if (xhr.getResponseHeader("sessionState") == "notLogin") {
                location.href = "/login.html";
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
};


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
    p.force == true && (p.L_index = loading());

    ajax({
        url: "/user" + GLOBAL.VERSION + "/userInfo",
        type: "get",
        success: function (result) {
            p.L_index && layer.close(p.L_index);
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
 * 公共初始化
 *
 */
function commonInit() {
    // 加载header
    renderHtml({
        targetId: "header",
        template: "/views/layout/header.html",
        htmlData: {
            pathname: location.pathname
        },
        callBack: function () {
            var pathname = location.pathname;
            if (pathname == "/" || pathname == "/index.html" || pathname == "/specs.html") {
                var $header2 = $("#header2");
                $(window).scroll(function () {
                    var scrollTop = $(window).scrollTop();

                    // 控制header固定
                    if (scrollTop >= 80) {
                        $header2.addClass("header-2-fix");
                    } else {
                        $header2.removeClass("header-2-fix");
                    }
                });
            }

            checkLoginState({
                force: location.pathname.indexOf("/myspace") > 0 || location.pathname.indexOf("/order") > 0,
                success: function (data) {
                    var TEMP = '<a href="/views/myspace/index.html" class="link">{{# nickname}}</a><span class="sep">|</span><a href="/views/myspace/order.html" class="link">我的订单</a><span class="sep">|</span><a id="logout" href="javascript:void(0);" class="link">退出</a>';
                    var nickname = data.nickname || data.mobile;
                    nickname = REG.mobile.test(nickname) ? nickname.replace(/^(\d{3})(\d{4})(\d{4})$/, "$1****$3") : nickname;
                    $("#header .topbar-info").html(template.render(TEMP, {nickname: nickname}));
                    $("#logout").click(function () {
                        ajax({
                            url: "/lock" + GLOBAL.VERSION + "/logout",
                            type: 'get',
                            success: function (res) {
                                if (res.success) {
                                    location.reload();
                                } else {
                                    layer.msg("数据异常");
                                }
                            }
                        });
                    });
                }
            });
            $("#header-mf").hover(function () {
                $("#header-product").slideDown("fast");
            });
            $("#header").hover(function () {
            }, function () {
                $("#header-product").slideUp("fast");
            });
            ajax({
                url: " /user" + GLOBAL.VERSION + "/trade/getGoodInfo?goodId=7cd43c0b2b2e40a6b602d3551a8ce4b6",
                type: "get",
                success: function (res) {
                    if (res.success && res.data) {
                        $("#header-name1").text(res.data.lfmfGoodsName);
                        $("#header-price1").text("￥"+res.data.lfmfGoodsPrices);
                    }
                }
            });
            ajax({
                url: " /user" + GLOBAL.VERSION + "/trade/getGoodInfo?goodId=0b13faef32ad4b98b62d24d21e7fec1b",
                type: "get",
                success: function (res) {
                    if (res.success && res.data) {
                        $("#header-name2").text(res.data.lfmfGoodsName);
                        $("#header-price2").text("￥"+res.data.lfmfGoodsPrices);
                    }
                }
            });
        }
    });
    // 加载footer
    renderHtml({
        targetId: "footer",
        template: "/views/layout/footer.html",
    })
}


function showEmpty($ele) {
    $ele.length > 0 && ($ele.html('<div class="empty">暂无数据</div>'));
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
 * 确认对话框
 *
 * @param content 内容
 * @param okCallBack 确定按钮回调函数
 * @param icon 0:警告，1:正确，2:错误，3:问号，4:锁定，5:苦脸，6:笑脸
 * @param cancelCallBack
 * @author mengLei
 */
function showConfirm(content, okCallBack, icon, cancelCallBack) {
    var index;
    isDefined(icon) || (icon = 3);
    if (cancelCallBack) {
        index = layer.confirm(content, {icon: icon, title: '提示', skin: 'mf-Dialog'}, okCallBack, cancelCallBack);
    } else {
        index = layer.confirm(content, {icon: icon, title: '提示', skin: 'mf-Dialog'}, okCallBack);
    }
    return index;
}

/**
 * 加载层
 *
 * @param icon
 * @returns {*}
 * @author mengLei
 */
function loading(icon) {
    if (!icon) {
        icon = 2;
    }
    return layer.load(icon, {shade: [0.1, '#000']});
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
 * layer弹出窗口功能封装 add by mengLei
 */
function showDialog(params) {
    var index = null;
    if (!params.width) {
        params.width = 700;// 默认宽度
    }
    if (!params.height) {
        params.height = 500;// 默认高度
    }
    if (!isDefined(params.btn)) {
        params.btn = ['确认', '取消'];// 默认按钮名称
    }
    if (!params.contentType) {
        params.contentType = 'application/json';// 默认类型
    }
    if (!params.async) {
        params.async = false;// 默认类型
    }

    if (params.template) {
        //获取模板
        $.ajax({
            url: getTemplatePath(params.template),
            dataType: 'html',
            async: false,//异步加载
            success: function (html) {
                //打开窗口
                index = layer.open({
                    type: 1//0（信息框，默认）1（页面层）2（iframe层）3（加载层）4（tips层）
                    , title: params.title
                    , area: [params.width + 'px', params.height + 'px']
                    , content: template.render(html, params.htmlData)
                    , btn: params.btn
                    , skin: 'mf-Dialog'
                    , btnAlign: 'c'
                    , yes: function (index, layero) {
                        if (isFunction(params.yes)) {
                            //回调函数
                            params.yes(index, layero);
                        } else {
                            if (params.saveUrl) {
                                //注：先注册监听事件：监听提交，验证通过才会执行此方法
                                layui.form.on('submit(*)', function (data) {
                                    var formData = data.field || {};
                                    var ifSubmit = true;
                                    if (isFunction(params.beforeSubmit)) {
                                        var ifSubmit = params.beforeSubmit(formData);
                                        typeof ifSubmit == "object" && (formData = ifSubmit);
                                    }
                                    if (ifSubmit != false) {

                                        if (params.contentType == 'application/json') {
                                            //转换为json串，后台可用对象操作
                                            formData = JSON.stringify(formData);
                                        }
                                        var loadingIndex = loading();
                                        //新增
                                        ajax({
                                            url: params.saveUrl,
                                            data: formData,
                                            async: params.async,
                                            contentType: params.contentType,
                                            success: function (result) {
                                                layer.close(loadingIndex);
                                                if (!params.async) {
                                                    if (result.success) {
                                                        layer.close(index);
                                                        layer.msg(result.msg);
                                                        //刷新列表
                                                        params.tableObj && reloadTable(params.tableObj);
                                                        //执行完成回调
                                                        params.afterSubmit && isFunction(params.afterSubmit) && params.afterSubmit();
                                                    } else {
                                                        showAlert(result.msg || "保存失败");
                                                    }
                                                }
                                            },
                                        });

                                        //异步操作
                                        if (params.async) {
                                            layer.close(index);
                                            //执行完成回调
                                            params.afterSubmit && isFunction(params.afterSubmit) && params.afterSubmit();
                                        }
                                    }

                                    return false;
                                });

                                //表单验证
                                layui.form.validate();//默认form名称为add_form（可不填写）
                            } else {
                                layer.close(index);
                                params.tableObj && reloadTable(params.tableObj);
                            }
                        }
                    },
                    btn2: function (index, layero) {
                        if (isFunction(params.btn2)) {
                            //回调函数
                            params.btn2(index, layero);
                            return false;
                        } else {
                            layer.close(index);
                        }
                    },
                    cancel: function (index, layero) {
                        if (isFunction(params.cancel)) {
                            //回调函数
                            params.cancel(index, layero);
                        } else {
                            layer.close(index);
                        }
                        return false;
                    },
                    success: function (layero, index) {
                        if (isFunction(params.success)) {
                            //回调函数
                            params.success(index, layero);
                        }
                        layui.form && layui.form.render();
                    },
                    end: function (layero, index) {
                        if (isFunction(params.end)) {
                            //回调函数
                            params.end(index, layero);
                        }
                    },
                    closeBtn: params.closeBtn == undefined ? 1 : params.closeBtn
                });
            }
        });
    }

    return index;
}

/**
 * 表格重载
 *
 * @param tableObj render()返回table对象
 * @param formId 查询表单id，默认list_form（可不填）
 * @author mengLei
 */
function reloadTable(tableObj, form) {
    var o = {};
    if (typeof form == "undefined" || typeof form == "string") {
        o.where = getFormData(getListFormId(form));
    } else if (typeof form == "object") {                 //传入参数
        o.where = form;
    }

    tableObj.config.page == false ? o : (o.page = {curr: form ? (form.page || 1) : 1});
    return tableObj.reload(o);
}

/**
 * 弹出提示框
 *
 * @param content 内容
 * @param icon 0:警告，1:正确，2:错误，3:问号，4:锁定，5:苦脸，6:笑脸
 * @author mengLei
 */
function showAlert(content, icon) {
    if (!icon) {
        icon = 0;
    }

    var index = layer.alert(content, {icon: icon});
    return index;
}

function isDefined(obj) {
    return typeof(obj) != "undefined";
}

function isFunction(obj) {
    if (obj && typeof(obj) == "function") {
        return true;
    } else {
        return false;
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

/**
 *  ajax初始化下拉列表，支持select与多选select
 * @param param
 *        param.url     路径
 *        param.field   [值字段，名字段]
 *        param.elem    选择器或jq元素
 *
 *        param.type    选填，默认post
 *        param.before  选填，数据预处理函数
 *        param.callBack  选填，渲染完成回调函数
 *
 *        取data-value为选中值（多选,拼接）
 *        取placeholder为默认提示
 *
 *       示例
 initSelect({
            elem:"#add_form select[name=provinceId]",
            url:"/common/getprovince",
            type:"GET",
            field:["provinceId","provinceName"],
        });
 * @author zhaoqf
 */
function initSelect(param) {
    var $elem = param.elem instanceof jQuery ? param.elem : $(param.elem);
    if ($elem.length == 0) {
        return;
    }
    var vdefault = $elem.attr("data-value");
    $elem.removeAttr("data-value");
    var ismultiple = $elem.attr("multiple") != undefined;
    var placeholder = $elem.attr("placeholder");
    placeholder = placeholder ? placeholder : "请选择";
    $.ajax({
        url: param.url,
        type: param.type || "POST",
        data: param.data || {},
        success: function (result) {
            if (!result.success || !result.data) {
                return;
            }
            var data = param.before ? param.before(result.data) : result.data;
            if (ismultiple) {
                var arr = vdefault == undefined ? [] : vdefault.split(",");
                $.each(data, function (i, v) {
                    v.value = v[param.field[0]];
                    v.name = v[param.field[1]];
                    v.selected = ifinArray(arr, v.value) ? "selected" : "";
                })
            } else {
                $.each(data, function (i, v) {
                    v.value = v[param.field[0]];
                    v.name = v[param.field[1]];
                    v.selected = v.value == vdefault ? "selected" : "";
                })
            }
            var temp = '<option value="">' + placeholder + '</option>' + '<% for(var i = 0; i < data.length; i++){ %>';
            temp += '<option value="<%=data[i].value%>" <%=data[i].selected%> ><%=data[i].name%></option><%}%>';
            $elem.html(template.render(temp, {data: data}));
            ismultiple ? (layui.select2 && layui.select2.render()) : (layui.form.render("select"));
            param.callBack && param.callBack();
        }
    })
}

/**
 * 置空select
 */
function emptySelect(selector) {
    var $ele = $(selector);
    var placeholder = $ele.attr("placeholder");
    placeholder = placeholder ? placeholder : "请选择";
    $ele.html(template.render('<option value="">' + placeholder + '</option>'));
    renderForm();
}

//重新渲染表单
function renderForm() {
    layui.use(['form'], function () {
        var form = layui.form;
        //表单重新渲染
        form.render();
    });
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


/**
 * 是否在数组中
 *
 * @param arr
 * @param v
 * @author zhaoqf
 */
function ifinArray(arr, v) {
    if (!Array.isArray(arr)) {
        return false;
    }
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == v) {
            return true;
        }
    }
    return false;
}


/**
 * 初始化分页
 *
 * @param params
 * {
 *  page:分页实体对象
 *  callBack:回调函数
 * }
 * @author mengLei
 */
function initPage(page, callBack) {
    if (page.total != 0) {
        // 创建分页
        $("#pagination").pagination(page.total, {
            current_page: page.page - 1,//当前页，默认是从0开始
            items_per_page: page.pageSize, //每页显示数目
            num_edge_entries: 1, //边缘页数
            num_display_entries: 4, //主体页数
            prev_show_always: false,
            next_show_always: false,
            prev_text: "上一页",
            next_text: "下一页",
            callback: function (index) {
                //获取列表数据并刷新
                if ((page.page - 1) != index) {
                    callBack({
                        page: index + 1
                    });
                }
            }
        });
    }

    return page;
}
