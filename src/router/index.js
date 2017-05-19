import Vue from 'vue'
import Router from 'vue-router'

//主入口
import Home from '@/moudles/main/home'
import RoomCard from '@/moudles/roomCard'

//主程序 模块
const Personal = r => require.ensure([], () => r(require('@/moudles/main/balance')), 'main')
const Balance = r => require.ensure([], () => r(require('@/moudles/main/personal')), 'main')
const Vip = r => require.ensure([], () => r(require('@/moudles/main/vip')), 'main')
const News = r => require.ensure([], () => r(require('@/moudles/main/news')), 'main')
const newsDetail = r => require.ensure([], () => r(require('@/moudles/main/newsDetail')), 'main')
const balanceDetailed = r => require.ensure([], () => r(require('@/moudles/main/balanceDetailed')), 'main')

// 超级大富翁 模块
const cashRedpack = r => require.ensure([], () => r(require('@/moudles//cashRedpack/index.vue')), 'cashRedpack')

//福利场模块
const Welfare = r => require.ensure([], () => r(require('@/moudles/welfare/index.vue')), 'welfare')


//血战到底 模块
const Room = r => require.ensure([], () => r(require('@/moudles/roomCard/room.vue')), 'roomCrad')
const HotRoom = r => require.ensure([], () => r(require('@/moudles/roomCard/HotRoom.vue')), 'roomCrad')
const setRoom = r => require.ensure([], () => r(require('@/moudles/roomCard/setRoom.vue')), 'roomCrad')
const shareWX = r => require.ensure([], () => r(require('@/moudles/roomCard/shareWX.vue')), 'roomCrad')
const groupInfo = r => require.ensure([], () => r(require('@/moudles/roomCard/groupInfo.vue')), 'roomCrad')
const deleteMember = r => require.ensure([], () => r(require('@/moudles/roomCard/deleteMember.vue')), 'roomCrad')
const recordDetails = r => require.ensure([], () => r(require('@/moudles/roomCard/recordDetails.vue')), 'roomCrad')
const allPlayers = r => require.ensure([], () => r(require('@/moudles/roomCard/allPlayers.vue')), 'roomCrad')
const searchPage = r => require.ensure([], () => r(require('@/moudles/roomCard/searchPage.vue')), 'roomCrad')
const historyRecord = r => require.ensure([], () => r(require('@/moudles/roomCard/historyRecord.vue')), 'roomCrad')
const roomCardTransfer = r => require.ensure([], () => r(require('@/moudles/roomCard/roomCardTransfer.vue')), 'roomCrad')
const transferRecord = r => require.ensure([], () => r(require('@/moudles/roomCard/transferRecord.vue')), 'roomCrad')
const transferSearch = r => require.ensure([], () => r(require('@/moudles/roomCard/transferSearch.vue')), 'roomCrad')
const transferDetail = r => require.ensure([], () => r(require('@/moudles/roomCard/transferDetail.vue')), 'roomCrad')
const resetRoom = r => require.ensure([], () => r(require('@/moudles/roomCard/resetRoom.vue')), 'roomCrad')
const myRoom = r => require.ensure([], () => r(require('@/moudles/roomCard/myRoom.vue')), 'roomCrad')
const myRecord = r => require.ensure([], () => r(require('@/moudles/roomCard/myRecord.vue')), 'roomCrad')
const roomCardActivity = r => require.ensure([], () => r(require('@/moudles/roomCard/roomCardActivity.vue')), 'roomCrad')



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
    {
    	path: '/welfare/index',
      name: 'Welfare',
      component: Welfare
    },
/***********************************************  业务  房卡     ************************************************/
    //超级大富翁主页
  	{
  		path: '/cashRedpack/index',
      name: 'cashRedpack',
      component: cashRedpack
  	},
   
/***********************************************  业务  房卡     ************************************************/
  	//房卡主页
  	{
  		path: '/roomCard/index/:oid/:page',
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
      path: '/roomCard/deleteMember/:roomid',
      name: 'deleteMember',
      component: deleteMember
    },
  // 战绩详情
    {
      path: '/roomCard/recordDetails/:boutid/:roomid/:userCode',
      name: 'recordDetails',
      component: recordDetails
    },
    // 全部玩家
    {
      path: '/roomCard/allPlayers/:roomid',
      name: 'allPlayers',
      component: allPlayers
    },
    // 搜索页面
    {
      path: '/roomCard/searchPage/:roomid/:userCode',
      name: 'searchPage',
      component: searchPage
    },
    // 历史记录
    {
      path: '/roomCard/historyRecord/:roomid',
      name: 'historyRecord',
      component: historyRecord
    },
    // 房卡转让
    {
      path: '/roomCard/roomCardTransfer',
      name: 'roomCardTransfer',
      component: roomCardTransfer
    },
    // 房卡转让记录
    {
      path: '/roomCard/transferRecord',
      name: 'transferRecord',
      component: transferRecord
    },
    // 房卡搜索
    {
      path: '/roomCard/transferSearch',
      name: 'transferSearch',
      component: transferSearch
    },
    // 转让详情
    {
      path: '/roomCard/transferDetail',
      name: 'transferDetail',
      component: transferDetail
    },
    // 重新设置
    {
      path: '/roomCard/resetRoom',
      name: 'resetRoom',
      component: resetRoom
    },
    // 我的房间
    {
      path: '/roomCard/myRoom',
      name: 'myRoom',
      component: myRoom
    },
    // 我的战绩
    {
      path: '/roomCard/myRecord',
      name: 'myRecord',
      component: myRecord
    },
    // 赠送房卡
    {
      path: '/roomCard/roomCardActivity',
      name: 'roomCardActivity',
      component: roomCardActivity
    },
  ]
})
