$(function () {
    submitform()
})

//版本控制url
var GLOBAL = {
    VERSION: "/v2.0",
};

/**
 *
 * @type {{payFeedbackView: string, payFeedbackImg: string, payFeedbackMobile: string}}
 */
var param = {
    payFeedbackView: '',        //反馈内容
    payFeedbackImg: '',         //反馈图片
    payFeedbackMobile: '',      //反馈手机号
}

/**
 *
 * @param 选择图片
 */
function previewImg(input) {
    mui.showLoading("正在加载");
    //是否支持
    if (typeof FileReader === 'undefined') {
        alert("抱歉，你的浏览器不支持 FileReader，请使用现代浏览器操作！");
        input.setAttribute('disabled', 'disabled');
    }
    if (input.files && input.files[0]) {
        var file = input.files[0],
            reader = new FileReader();
        if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/gif') {
            mui.alert('不是有效的图片文件!');
            return;
        }
        param.payFeedbackImg = $(input).val();
        reader.readAsDataURL(file);
        reader.onload = function (e) {
            var result = this.result;//获取到base64的图片
            $("#ImgPr img").attr("src", result);
            param.payFeedbackImg = result;
            $("#ImgPr img").show();
            mui.hideLoading()
        }
    } else {
        mui.hideLoading();
    }
}

/**
 * 提交接口
 */
function submitform() {
    $("#feedback").on('tap', "#submit", function () {
        var param = new FormData($("#feedback")[0]);
        if ($('#question').val() == "") {
            mui.toast("请填写意见", {duration: '500', type: 'div'});
        } else if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test($("#payFeedbackMobile").val()))) {
            mui.toast("手机号格式错误");
        } else {
            mui.showLoading("正在加载");
            //反馈
            $.ajax({
                async: true,
                type: "post",
                url: "/user" + GLOBAL.VERSION + "/trade/savePayFeedback",
                contentType: false,
                processData: false,
                data: param,
                dataType: 'json',
                success: function (res) {
                    mui.hideLoading();
                    // console.log(res);
                    if (res.success == 1) {
                        mui.alert(res.msg)
                    } else {
                        mui.alert("反馈失败，请请重新反馈");
                    }
                },
                error: function () {
                    mui.hideLoading();
                    mui.alert("服务器异常，请联系管理员！！！")
                }
            });
        }
    })
}
