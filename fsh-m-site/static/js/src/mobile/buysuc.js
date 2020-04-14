function openApp(){
    var browser = navigator.userAgent.toLowerCase();
    // console.log(browser);
    //ios
    if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
        window.location.href = "/mobile/pay/prompt.html"
        // if (browser.match(/micromessenger/i)) {
        //     //微信内置浏览器
        //     window.location.href = "laifumofang://";
        //     window.setTimeout(function () {
        //         window.location.href = "https://itunes.apple.com/cn/app/id1345140303?mt=8";
        //     }, 2000);
        //     return
        // } else {
        //     window.location.href = "laifumofang://"; //ios app协议，由ios同事提供
        //     window.setTimeout(function () {
        //         window.location.href = "https://itunes.apple.com/cn/app/id1345140303?mt=8";
        //     }, 2000)
        //     return
        // }
    }

    if (navigator.userAgent.match(/android/i)) {
        // console.log("安卓手机")
        // alert(browser);
        if (browser.match(/micromessenger/i)) {
            // window.location.href = "http://d.xiaojukeji.com/c/73852";
            window.location.href = "/mobile/pay/prompt.html";
            return;
        }else {

            // Android
            // $.ajax({
            //      type:"GET",
            //      url:'lfmf://lfmf.com/?pid=1',
            //      success:function(res){
            //          console.log(res);
            //     }
            // })
            // window.location.href = "lfmf://lfmf.com/?pid=1";//安卓协议，由安卓同事提供
            // window.setTimeout(function () {
            //     window.location.href = "http://file1.laifumofang.com/lfmf_Aligned.apk"
            // }, 5000)

            window.location = "lfmf://lfmf.com/?pid=1";
            t = Date.now();
            setTimeout(function(){
                if (Date.now() - t < 3200) {
                    // alert("检测到本地没有安装APP\n即将下载APP");
                    var success =confirm("即将下载最新版APP\n点击确定下载APP")
                    if(success){
                        window.location = 'http://file1.laifumofang.com/lfmf_Aligned.apk';
                    }
                }
            }, 3000);
            return;
        }
    }
}