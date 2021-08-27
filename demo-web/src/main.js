import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
Vue.use(VueMaterial)
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './components/utils/request.js'
import './css/css.scss';
import "babel-polyfill"; 
import NProgress from 'nprogress';
import store from './store/index.js';
import jsrsasign from 'jsrsasign'; //sign
import 'nprogress/nprogress.css'; //这个样式必须引入复制代码
import VueI18n from 'vue-i18n'

Vue.use(ElementUI);

Vue.use(VueI18n) // 通过插件的形式挂载
const i18n = new VueI18n({
    locale: localStorage.getItem('locale') || 'zh-CN',
    //this.$i18n.locale // 通过切换locale的值来实现语言切换
    messages: {
        'zh-CN': require('./lang/zh'), // 中文语言包
        'en-US': require('./lang/en') // 英文语言包
    }
})

// //公共方法挂载
Vue.prototype.$jsrsasign =  jsrsasign
Vue.prototype.$store =  store
Vue.config.productionTip = false
Vue.prototype.$urls='http://192.168.10.115:9000'//测试
Vue.prototype.$codeUrls = 'http://192.168.10.115:8013/user/getVerCode?type=math'
// Vue.prototype.$urls='http://192.168.11.113:8013'//测试
// Vue.prototype.$codeUrls = 'http://192.168.11.113:8077/user/getVerCode?type=math'



//设置为非固定接口
// var location = window.location;
// var host = location.protocol+'//'+location.host;
// Vue.prototype.$urls=host;
// Vue.prototype.$codeUrls = host+'/user/getVerCode?type=math'

import qs from 'qs';
Vue.prototype.$qs = qs;
//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    var role = 'admin';
    NProgress.start();
    if(sessionStorage.getItem('grade') == 'jWd51Q9Lr56LHBPeZ1xjLKxTphZsdUnc') //如果是管理员
    {var role = 'admin';}
    //console.log(to.path)
    if (!role && to.path !== '/login') {
        //console.log(2)
        //console.log(to.meta.permission)
        next('/login');
    } else if (to.meta.permission) {
        // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
        role === 'admin' ? next() : next('/403');
    } else {
        // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
        if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
            Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
                confirmButtonText: '确定'
            });
        } else {
            next();
        }
    }
})
//加载结束后销毁进度条
router.afterEach(() => {
    // 在即将进入新的页面组件前，关闭掉进度条
    NProgress.done()
})
//定义加载进度条
NProgress.configure({     
    easing: 'ease',  // 动画方式    
    speed: 500,  // 递增进度条的速度    
    showSpinner: false, // 是否显示加载ico    
    trickleSpeed: 200, // 自动递增间隔    
    minimum: 0.3 // 初始化时的最小百分比
})
new Vue({
    router,i18n,
    render: h => h(App)
}).$mount('#app')
