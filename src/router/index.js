import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/moudles/main/home'
import Personal from '@/moudles/main/personal'
import Balance from '@/moudles/main/balance'
import Vip from '@/moudles/main/vip'
import News from '@/moudles/main/news'


import Welfare from '@/moudles/welfare/welfare'

Vue.use(Router);

export default new Router({
  routes: [
  // main 
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
    	path: '/vip',
      name: 'Vip',
      component: Vip
    },
    {
    	path: '/news',
      name: 'News',
      component: News
    },
    // welfare 
    {
    	path: '/welfare/index',
      name: 'Welfare',
      component: Welfare
    }
  ]
})
