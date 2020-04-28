import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import { Message } from 'element-ui'
import catalog from '@/pages/catalog.vue'
import home from '@/pages/catalog/home'
import login from '@/pages/catalog/login'
import list from '@/pages/catalog/list'
import detail from '@/pages/catalog/detail'

import about from '@/pages/catalog/about'
import excellent from '@/pages/catalog/excellent'
import experience from '@/pages/catalog/experience'
import note from '@/pages/catalog/note'
import website from '@/pages/catalog/website'

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
            requireAuth: true
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
            requireAuth: true
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
        },
        // 个人博客日记
        {
          path: '/catalog/note',
          name: 'note',
          component: note,
          meta: {
            index: 4,
            requireAuth: true
          }
        },
        // 博客网站制作
        {
          path: '/catalog/website',
          name: 'website',
          component: website,
          meta: {
            index: 5,
            requireAuth: true
          }
        },
        // 网站设计心得
        {
          path: '/catalog/experience',
          name: 'experience',
          component: experience,
          meta: {
            index: 6,
            requireAuth: true
          }
        },
        // 优秀个人博客
        {
          path: '/catalog/excellent',
          name: 'excellent',
          component: excellent,
          meta: {
            index: 7,
            requireAuth: true
          }
        },
        // 关于我们
        {
          path: '/catalog/about',
          name: 'about',
          component: about,
          meta: {
            index: 8,
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
  if (to.meta.requireAuth) {
    next()
  } else {
    Message('需要登录后，在查看')
    next()
  }

  next()
})

export default router
