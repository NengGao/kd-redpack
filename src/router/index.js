import Vue from 'vue'
import Router from 'vue-router'

//主入口
import Home from '@/moudles/main/home'
import RoomCard from '@/moudles/roomCard'

//主程序 模块
const Personal = r => require.ensure([], () => r(require('@/moudles/main/personal')), 'main')
const Balance = r => require.ensure([], () => r(require('@/moudles/main/balance')), 'main')
const Vip = r => require.ensure([], () => r(require('@/moudles/main/vip')), 'main')
const Buy = r => require.ensure([], () => r(require('@/moudles/main/buy')), 'main')
const Shop = r => require.ensure([], () => r(require('@/moudles/main/shop')), 'main')
const About = r => require.ensure([], () => r(require('@/moudles/main/about')), 'main')
const News = r => require.ensure([], () => r(require('@/moudles/main/news')), 'main')
const newsDetail = r => require.ensure([], () => r(require('@/moudles/main/newsDetail')), 'main')
const balanceDetailed = r => require.ensure([], () => r(require('@/moudles/main/balanceDetailed')), 'main')

// 客服系统

const Customer = r => require.ensure([], () => r(require('@/moudles/customer/index.vue')), 'customer')
// 超级大富翁 模块
const cashRedpack = r => require.ensure([], () => r(require('@/moudles/cashRedpack/index.vue')), 'cashRedpack')
const cashGroupInfo = r => require.ensure([], () => r(require('@/moudles/cashRedpack/groupInfo.vue')), 'cashRedpack')

//福利场模块
const Welfare = r => require.ensure([], () => r(require('@/moudles/welfare/index.vue')), 'welfare')

//红包竞猜模块
const redpackPK = r => require.ensure([], () => r(require('@/moudles/redpackPK/index.vue')), 'redpackPK')

//豆豆接龙模块
const redpackKld = r => require.ensure([], () => r(require('@/moudles/redpackKld/index.vue')), 'redpackKld')

//商品抢拍模块
const goodsAuction = r => require.ensure([], () => r(require('@/moudles/goodsAuction/index.vue')), 'goodsAuction')
const myAuction = r => require.ensure([], () => r(require('@/moudles/goodsAuction/myAuction.vue')), 'goodsAuction')
const auctionRecord = r => require.ensure([], () => r(require('@/moudles/goodsAuction/auctionRecord.vue')), 'goodsAuction')


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
    	path: '/about',
      name: 'About',
      component: About
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
  //  乐豆商城
    {
    	path: '/shop',
      name: 'Shop',
      component: Shop
    },
   //  购买快乐豆
    {
    	path: '/buy',
      name: 'Buy',
      component: Buy
    },

/***********************************************  客服系统     *********************************************************/
    {
      path: '/customer',
      name: 'Customer',
      component: Customer
    },
/***********************************************  业务  整点福利红包     ************************************************/
    {
    	path: '/welfare/index',
      name: 'Welfare',
      component: Welfare
    },

/***********************************************  业务  超级大富翁     **************************************************/
    //超级大富翁主页
  	{
  		path: '/cashRedpack/index',
      name: 'cashRedpack',
      component: cashRedpack
  	},
  	{
  		path: '/cashRedpack/groupInfo/:roomid',
      name: 'cashGroupInfo',
      component: cashGroupInfo
  	},
/***********************************************  业务  红包竞猜     ****************************************************/
    //红包竞猜主页
    {
      path: '/redpackPK/index',
      name: 'redpackPK',
      component: redpackPK
    },

/***********************************************  业务  豆豆接龙     ****************************************************/
    //豆豆接龙主页
    {
      path: '/redpackKld/index',
      name: 'redpackKld',
      component: redpackKld
    },
    /***********************************************  业务  商品抢拍     ************************************************/
    //商品抢拍主页
    {
      path: '/goodsAuction/index/:goodsCode',
      name: 'goodsAuction',
      component: goodsAuction
    },
    //我的抢拍
    {
      path: '/goodsAuction/myAuction',
      name: 'myAuction',
      component: myAuction
    },
//抢拍结果记录
    {
      path: '/goodsAuction/auctionRecord/:period',
      name: 'auctionRecord',
      component: auctionRecord
    },

/***********************************************  业务  房卡     ********************************************************/
  	//房卡主页
  	{
  		path: '/roomCard/index/:page',
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
