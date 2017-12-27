import Vue from 'vue'
import Router from 'vue-router'
import cookie from 'cookiejs'
import { signIn, oAuth } from 'utils/auth'
import HelloWorld from 'components/HelloWorld'
import Home from 'components/Home'
import RestaurantList from 'components/RestaurantList'
import FlexibleTest from 'components/FlexibleTest'

Vue.use(Router)
const routes = [
  {
    path: '/',
    component: Home,
    // name: 'home',
    // redirect: '/list/1',
    meta: {
      title: 'HOME',
      requiresAuth: true,
    },
    children: [
      {
        path: '',
        component: RestaurantList,
      },
      {
        path: 'list/:id',
        // redirect: '/list/1',
        name: 'list',
        component: RestaurantList,
      },
    ],
  },
  {
    path: '/hello',
    component: HelloWorld,
    name: 'hello',
    meta: {
      title: 'hello',
    },
  },
  {
    path: '/flexibletest',
    component: FlexibleTest,
    name: 'flexibleTest',
  },
]
const router = new Router({
  mode: 'history',
  routes,
})

router.beforeEach(async (to, from, next) => {
  // const { code, inviter_id } = to.query
  if (to.meta.requiresAuth && !cookie('token')) { // 如果需要授权并且还没有登陆
    const code = to.query.code || ''
    if (code && code.length <= 17) { // 把老二维码url查询参数中的code字符串替换为actCode
      const url = window.location.href.replace('code', 'actCode')
      window.location.replace(url)
    }

    if (code) { // 是否已经获取微信授权code，如果获取则登陆
      signIn(code)
      next()
    } else { // 否则去获取授权
      oAuth()
    }
  } else { // 否则直接进入页面
    next()
  }
})

export default router

