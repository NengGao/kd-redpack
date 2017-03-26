import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/moudles/main/home'
import Personal from '@/moudles/main/personal'
import Balance from '@/moudles/main/balance'
import Welfare from '@/moudles/main/welfare'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
    	path: '/personal',
      name: 'Personal',
      component: Personal
    },
    {
    	path: '/balance',
      name: 'Balance',
      component: Balance
    },
    {
    	path: '/welfare',
      name: 'Welfare',
      component: Welfare
    }
  ]
})
