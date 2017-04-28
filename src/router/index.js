import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/moudles/main/home'
import Personal from '@/moudles/main/personal'
import Balance from '@/moudles/main/balance'
import Vip from '@/moudles/main/vip'
import News from '@/moudles/main/news'
import newsDetail from '@/moudles/main/newsDetail'
import balanceDetailed from '@/moudles/main/balanceDetailed'


import Welfare from '@/moudles/welfare'

import Room from '@/moudles/roomCard/room'
import RoomCard from '@/moudles/roomCard'
import HotRoom from '@/moudles/roomCard/hotRoom'
import setRoom from '@/moudles/roomCard/setRoom'
import shareWX from '@/moudles/roomCard/shareWX'
import groupInfo from '@/moudles/roomCard/groupInfo'
import deleteMember from '@/moudles/roomCard/deleteMember'
import recordDetails from '@/moudles/roomCard/recordDetails'
import allPlayers from '@/moudles/roomCard/allPlayers'


Vue.use(Router);

export default new Router({
  routes: [
/***********************************************  主程序    ************************************************/
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
  //消息详情
    {
      path: '/newsDetail',
      name: 'newsDetail',
      component: newsDetail
    },
  //  资金明细
    {
      path: '/balanceDetailed',
      name: 'balanceDetailed',
      component: balanceDetailed
    },
/***********************************************  业务  福利场     ************************************************/
    {
    	path: '/welfare/index',
      name: 'Welfare',
      component: Welfare
    },
/***********************************************  业务  房卡     ************************************************/
  	//房卡主页
  	{
  		path: '/roomCard/index/:oid',
      name: 'roomCard',
      component: RoomCard
  	},
  	//房间页
  	{
  		path: '/roomCard/room/:roomid',
      name: 'room',
      component: Room
  	},
  	//热门房间
  	{
  		path: '/roomCard/hot',
      name: 'hotRoom',
      component: HotRoom
  	},
    //设置房间属性
    {
      path: '/roomCard/setRoom',
      name: 'setRoom',
      component: setRoom
    },
    //群组信息
    {
      path: '/roomCard/groupInfo/:roomid',
      name: 'groupInfo',
      component: groupInfo
    },
    {
      path: '/roomCard/shareWX',
      name: 'shareWX',
      component: shareWX
    },
    //删除成员
    {
      path: '/roomCard/deleteMember',
      name: 'deleteMember',
      component: deleteMember
    },
  // 战绩详情
    {
      path: '/roomCard/recordDetails',
      name: 'recordDetails',
      component: recordDetails
    },
    // 全部玩家
    {
      path: '/roomCard/allPlayers',
      name: 'allPlayers',
      component: allPlayers
    }
  ]
})
