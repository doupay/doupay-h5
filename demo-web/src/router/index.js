import Vue from 'vue';
import Router from 'vue-router';
// import { component } from 'vue/types/umd';
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location)
}
Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/order'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '自述文件' },
            children:[
                {
                    path: '/pay',
                    component: resolve => require(['../components/page/Dashboard.vue'], resolve),
                    meta: { title: '账户余额' }
                },
                {
                  path: '/order',
                  component: resolve => require(['../components/page/pay.vue'], resolve),
                  meta: {title: '支付'}
                },
                {
                  path: '/success',
                  name: 'success',
                  component: resolve => require(['../components/page/success.vue'], resolve),
                  meta: {title: '成功'}
                },
                {
                    path: '/timeout',
                    name: 'timeout',
                    component: resolve => require(['../components/page/timeout.vue'], resolve),
                    meta: {title: '超时'}
                },
                // 权限页面
                {
                    path: '/permission',
                    component: resolve => require(['../components/page/Permission.vue'], resolve),
                    meta: { title: '权限测试', permission: true }
                },
                {
                    path: '/403',
                    component: resolve => require(['../components/page/403.vue'], resolve),
                    meta: { title: '403' }
                },
                {
                    path: '/log',
                    component: resolve => require(['../components/page/log.vue'], resolve),
                    meta: { title: '日志管理' }
                },
            ]
        },

        {
            path: '*',
            redirect: '/404'
        }
    ]
})
