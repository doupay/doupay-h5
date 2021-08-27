import Vue from 'vue';
//计算时间戳
export function timetrans(Time){  
    var _date = new Date(parseFloat(Time))
    var Y = _date.getFullYear() + '-';
    var M = (_date.getMonth()+1 < 10 ? '0'+(_date.getMonth()+1) : _date.getMonth()+1) + '-';
    var D = _date.getDate() + '';
    var h = _date.getHours() + ':';
    var m = _date.getMinutes() + ':';
    var s = _date.getSeconds();  
    if (M < 10 ){M = "0" + M;}
    if (_date.getDate() < 10 ){D = "0" + D ;}
    if (_date.getHours() < 10 ){h = "0" + h ;}
    if (_date.getMinutes() < 10 ){m = "0" + m ;}
    if (_date.getSeconds() < 10 ){s = "0" + s ;} 
    return(Y+M+D+" "+h+m+s)
    // return(Y+M+D)
};
//计算时间戳，自定义格式
export function formatDate (date, fmt) {
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return fmt;
};

//获取币种列表
export function coinlist(){  
    return new Promise((resolve, reject) => { 
        Vue.prototype.$axios.post(Vue.prototype.$urls+`/screen/v1.0/coinList`, {// 
            'userId':sessionStorage.getItem('userId'),
            'ucUserId':sessionStorage.getItem('userId'),
        }).then((res) => {
            resolve(res)
           
        }).catch((res) => {
            Vue.prototype.$message.error('币种获取失败，请稍后重试或联系管理员');
        })
    });
};

// //获取ideToken
// export function getIdeToken(){  
//     return new Promise((resolve, reject) => { 
//         Vue.prototype.$axios.post(Vue.prototype.$urls+`/idempotent/v1.0/fetchIdeToken`, {// 
//             'userId':sessionStorage.getItem('userId'),
//             'ucUserId':sessionStorage.getItem('userId'),
//         }).then((res) => { 
//             if(res.invokeResultCode == 200){ 
//                 resolve(res.data)
//             }
//             else{ 
//                 Vue.prototype.$message.error(res.invokeResultMessage);
//                 reject(error);
//             }
//         }).catch((res) => {
//             Vue.prototype.$message.error('获取失败，请稍后重试或联系管理员');
//         })
//     });
// };
export function getRsaKeys(){  
    var rsaKeypair = Vue.prototype.$jsrsasign.KEYUTIL.generateKeypair("RSA", 2048);
    console.log(Vue.prototype.$jsrsasign.KEYUTIL.getPEM(rsaKeypair.prvKeyObj, "PKCS8PRV"));
    console.log(Vue.prototype.$jsrsasign.KEYUTIL.getPEM(rsaKeypair.pubKeyObj));
    return rsaKeypair
};
//倒计时
export function InitTime(time){  
    var dd,hh,mm,ss = null;
    //var time = parseInt(endtime) - new Date().getTime();
    if(time<=0){
    return ''
    }else{
    dd = Math.floor(time / 60 / 60 / 24);
    hh = Math.floor((time / 60 / 60) % 24);
    mm = Math.floor((time / 60) % 60);
    ss = Math.floor(time % 60);
    //var str = dd+"天"+hh+"小时"+mm+"分"+ss+"秒";
    if(dd==0&&hh==0&&mm==0){
        var str = ss+"秒";
    }
    else if(dd==0&&hh==0){
        var str = mm+"分"+ss+"秒";

    }
    else if(dd==0){
        str =  hh+"小时"+mm+"分"+ss+"秒";
    }else{
        str = dd+"天"+hh+"小时"+mm+"分"+ss+"秒";
    }
    return str;
    }
};


