import axios from 'axios'
import Cookies from 'js-cookie'
import Vue from 'vue'


// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    config.headers['X-Version'] = 'v1.0';


    // 在发送请求之前做些什么
    
    //const X_token =' Cookiesget';
    // const ct ='1'; //0 不加密 1 加密
    // const pk ='1'; //0 不加密 1 加密 返回
    // config.headers['ct'] = ct;
    // if(config.url=='http://192.168.11.113:8013/user/v1.0/passwordLogin'){
    //     //console.log(config.url) 
    //     config.headers['ideToken'] = Cookies.get('ideToken');
    //     　　return config
        
    // }else{
    //     const X_token = Cookies.get('accessToken');
    //     config.headers['accessToken'] = X_token;
    //     config.headers['ideToken'] = Cookies.get('ideToken');
    //     //console.log(config)
        return config
    // }
}, function (error) {
    //console.log('log2')
　　// 对请求错误做些什么
    return Promise.reject(error)
});

// 添加响应拦截器
axios.interceptors.response.use(function (res) {
   
　　// 对响应数据做点什么
    if(res.data.code == 200)
    {
　　    return res.data.data
    }
    else{
        if(!res.data.code){ //如果找不到code
            Vue.prototype.$alert('数据响应错误，请稍后重试或联系管理员', '提示', {confirmButtonText: '确定',});
        }
        else if(res.data.code === 555 || res.data.code === 608 || res.data.code === 10507) {
            Vue.prototype.$alert('登录超时，请重新登录', '提示', {confirmButtonText: '确定',});
            sessionStorage.clear();
            location.reload() // 为了重新实例化vue-router对象 避免bug
        }
        //没有权限
        else if(res.code === 403) {
            this.$router.push('/403');
        }else if(res.code === 16002){
            this.$router.push('/dashboard');
        }
        else{ 
//             Vue.prototype.$alert(res.data.message, '提示', {confirmButtonText: '确定',});
// 　　        return Promise.reject('error')
 
        }
    }
    
}, function (error) {
    console.log('error',error)
    
　　// 对响应错误做点什么

　　return Promise.reject(error)

});