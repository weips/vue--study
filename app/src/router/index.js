import Vue from 'vue'
import Router from 'vue-router'
import Layouts from '@/pages/layouts'
import Home from '@/pages/home'
import User from '@/pages/user'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'layouts',
      component: Layouts,
      redirect: '/home',
      children: [
        {
          path: 'home',
          name: 'home',
          component: Home
        },
        {
          path: 'user',
          name: 'user',
          component: User
        }
      ]
    }
  ]
})
