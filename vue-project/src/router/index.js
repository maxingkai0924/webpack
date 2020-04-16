import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import { Message } from 'element-ui'
import catalog from '@/pages/catalog.vue'
import home from '@/pages/catalog/home'
import login from '@/pages/catalog/login'
import list from '@/pages/catalog/list'
import detail from '@/pages/catalog/detail'

Vue.use(Router)

var router = new Router({
  mode: 'history',
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },
    {
      path: '/',
      redirect: 'catalog',
      component: catalog,
      children: [
        {
          path: '/catalog/home',
          name: 'home',
          component: home,
          meta: {
            index: 0,
            requireAuth: false
          }
        },
        {
          path: '/catalog/login',
          name: 'login',
          component: login,
          meta: {
            index: 1,
            requireAuth: true
          }
        },
        {
          path: '/catalog/list',
          name: 'list',
          component: list,
          meta: {
            index: 2,
            requireAuth: false
          }
        },
        {
          path: '/catalog/detail',
          name: 'detail',
          component: detail,
          meta: {
            index: 3,
            requireAuth: true
          }
        }
      ]
    },
    {
      path: '*',
      redirect: {
        name: 'home'
      }
    }
  ]
})
router.beforeEach((to, from, next) => {
  // if (to.meta.requireAuth) {
  //   next()
  // } else {
  //   next()
  // }
  Message('需要登录后，在查看')
  next()
})

export default router
