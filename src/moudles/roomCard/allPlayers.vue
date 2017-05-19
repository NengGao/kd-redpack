<template>
  <div class="groupInfo flex-wrap">
    <div class="header">
      <div class="flex-wrap flex-center header-left">
        <i class="ic-close-white" @click=goBack></i>
        <div class="flex-wrap play-btn" @click="pullDown">
          <span>{{selectTitle}}</span>
          <em></em>
        </div>
      </div>
      <router-link tag="div" :to="'/roomCard/historyRecord/'+$route.params.roomid" class="header-right">历史记录</router-link>
    </div>
    <div class="content flex-con-1">
      <div class="scroll">
          <router-link tag="div" :to="'/roomCard/searchPage/'+$route.params.roomid + '/0'" class="flex-wrap flex-center input-info"><i class="ic-search"></i><span>输入对方ID号</span></router-link>
          <ul class="play-box"
              v-infinite-scroll="loadMore"
              infinite-scroll-disabled="loading"
              infinite-scroll-distance="30"
              infinite-scroll-immediate-check=true>
            <li :class="{'flex-wrap':true,'flex-center':true,'play-list':true,'active':_user.active}"  v-for="(_user,i) in userList">
              <div class="play-left flex-wrap">
                <img :src="_user.userImg" alt="">
                <div class="play-info">
                  <p>{{_user.userName}}</p>
                  <p>ID:{{_user.userCode}}</p>
                </div>
              </div>
              <div class="flex-wrap flex-center play-right-box">
                <div class="play-middle">{{_user.score | RMB_f}}</div>
                <div class="flex-wrap flex-center play-right">
                  <i class="ic-add" @click="addPoint(i)"></i>
                  <i class="ic-reduce" @click="reducePoint(i)"></i>
                  <i class="ic-clean" @click="changeTap(i)"></i>
                </div>
              </div>
            </li>
          </ul>
          <p class="page-infinite-loading" v-show="showLoading"><span><div class="mint-spinner-fading-circle circle-color-76" style="width: 28px; height: 28px;"><div class="mint-spinner-fading-circle-circle is-circle2"></div><div class="mint-spinner-fading-circle-circle is-circle3"></div><div class="mint-spinner-fading-circle-circle is-circle4"></div><div class="mint-spinner-fading-circle-circle is-circle5"></div><div class="mint-spinner-fading-circle-circle is-circle6"></div><div class="mint-spinner-fading-circle-circle is-circle7"></div><div class="mint-spinner-fading-circle-circle is-circle8"></div><div class="mint-spinner-fading-circle-circle is-circle9"></div><div class="mint-spinner-fading-circle-circle is-circle10"></div><div class="mint-spinner-fading-circle-circle is-circle11"></div><div class="mint-spinner-fading-circle-circle is-circle12"></div><div class="mint-spinner-fading-circle-circle is-circle13"></div></div></span>
          加载中...
          </p>
          <i class="ic-clean2" @click="cleanAll"></i>
      </div>
    </div>
    <!--刷选展开-->
    <div class="md-mask" :class="{ 'active': md.mask }"></div>
    <div class="filter-box" v-show="md.filterShow" :class="{'pullDown': md.filterShow}">
       <div class="filter-list" :class="{'active': item.active}" v-for="(item,index) in filterLis" @click="filterActive(index)">{{item.title}}</div>
    </div>

   <!--加分弹窗-->
   <div class="md-modal md-effect-1 md-point" :class="{ 'md-show': md.addPoint }">
			<div class="md-content">
				<i class="md-close ic-close-gray" @click="closeMd('addPoint')"></i>
				<div class="title">增加积分</div>
				<input type="number" class="inp" placeholder="请输入增加分数" v-model="point.add" @keyup="clearNoNum('add',point.add)"/>
				<div class="tips">玩家分数：<em>{{point.num | RMB_f}}</em></div>
				<input type="button" class="btn" value="确定" @click="confirmEvent(point.index)"/>
			</div>
		</div>

   <!--减分弹窗-->
   <div class="md-modal md-effect-1 md-point" :class="{ 'md-show': md.reducePoint }">
			<div class="md-content">
				<i class="md-close ic-close-gray" @click="closeMd('reducePoint')"></i>
				<div class="title">扣除积分</div>
				<input type="number" class="inp" placeholder="请输入扣除分数" v-model="point.reduce" @keyup="clearNoNum('reduce',point.reduce)"/>
				<div class="tips">玩家分数：<em>{{point.num | RMB_f}}</em></div>
				<input type="button" class="btn" value="确定" @click="confirmEvent(point.index)" />
			</div>
		</div>
  </div>
</template>

<script>

		import Vue from 'vue'
		import Api from '@/fetch/api'
		import config from '@/config'
		import common from '@/assets/js/common'
		import { Toast,MessageBox} from 'mint-ui'
    import { InfiniteScroll } from 'mint-ui';
    Vue.use(InfiniteScroll);
    export default{
    name: 'allPlayers',
    data(){
      return{
        user: this.$store.state.user,
        activeRoom: this.$store.getters.getActiveRoom || '',
       //  分页
        loading :false,
        showLoading :false,
        page:1,
        index:0,
        selectType:"all",
        //  分页
        md:{
          active: '',
          mask: false,
          filterShow:false,
          reducePoint : false,
          addPoint : false
        },
        point:{
        		add:'',
        		reduce :'',
        		num : '',
        		type: true,
        		index:　0
        },
        selectTitle : "全部玩家",
        selectAll :{
        		roomId: this.$route.params.roomid,
	    			userCode : '',
	    			orderBy : 'desc',
	    			selectType : 'all',
            page : 1,
            pageSize  : 10,
        },
        selectData : {
        		roomId: this.$route.params.roomid,
	    			userCode : '',
	    			orderBy : 'desc',
	    			selectType : 'all',
            page : 1,
            pageSize  : 10,
        },
        filterLis:[{title:'全部玩家',active:true,},{title:'点数不足',active:false,type:'selectType',val:'notEnough'},{title:'在线玩家',active:false,type:'selectType',val:'onLine'},{title:'离线玩家',active:false,type:'selectType',val:'downLine'},{title:'加入时间•倒序↓',active:false,type:'orderBy',val:'desc'},{title:'加入时间•正序↑',active:false,type:'orderBy',val:'asc'}],
        userList:[]
      }
    },
    methods:{
      showMd: function(md){
        this.md[md] = true;
        this.md.mask = true;
      },
			closeMd: function(md){
				if(md == 'all'){
					for(let Key in this.md){
						this.md[Key] = false;
						this.md.mask = false;
					}
				}else{
					this.md[md] = false
					this.md.mask = false
				}
			},
      loadMore() {
			    let self=this;
          self.loading = true;
          self.showLoading = true;
          self.page=self.page+1;
        setTimeout(() => {
            if(self.index==0){
              self.selectType='all';
            }else if(self.index==1){
              self.selectType='notEnough';
            }else if(self.index==2){
              self.selectType='onLine';
            }else if(self.index==3){
              self.selectType='downLine';
            }

          Api.getRoomUserScore(function(data){
            if(data.msgCode == '200'){
              self.userList = self.userList.concat(data.list);
              self.showLoading = false;
              self.loading = false;
            }else if(data.msgCode=='708') {
              Toast('暂无更多了哦！');
              self.loading = true;
              self.showLoading = false;
            }
          },{
            roomId: self.$route.params.roomid,
            userCode : '',
            orderBy : 'desc',
            selectType : self.selectType,
            page : self.page,
            pageSize  : 10,
          });
        }, 2500);
      },
      cleanAll:function () {
        let self=this;
        let roomId=self.$route.params.roomid;
        MessageBox.confirm('是否全部清零?').then(action => {
        Api.clearScore(function (data) {
          if(data.msgCode == '200'){
            Toast({message: '操作成功',duration: 1300,iconClass: 'ic-toast-success'});
          }else {
            Toast('清除失败');
          }
        },roomId)
        });
      },
      clearNoNum: function (data,obj) {
        this.point[data] = obj.replace(/[^\d.]/g,"");  //清除“数字”和“.”以外的字符
        this.point[data] = obj.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的
        this.point[data]= obj.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
        this.point[data] = obj.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');//只能输入两个小数
        if(obj.indexOf(".")< 0 && obj !=""){//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
          this.point[data]= parseFloat(obj);
        }
      },
      changeTap:function (i) {
        //清零功能
        let self=this;
        MessageBox.confirm('是否清零?').then(action => {
          Api.upDownScore(function(data){
            if(data.msgCode == '200'){
              self.userList[i].score=0;
              Toast({message: '操作成功',duration: 1300,iconClass: 'ic-toast-success'});
            }else {
              Toast('清除失败');
            }
          },{
            roomId: self.$route.params.roomid,
            userCode : self.userList[i].userCode,
            scores : 0
          })
        });
      },
      pullDown: function () {
        this.md.mask=!this.md.mask;
        this.md.filterShow=!this.md.filterShow;
      },
      goBack: function(){
				this.$router.back()
			},
      addPoint : function(index){
      		this.showMd('addPoint');
      		this.point.type = true;
      		this.point.index = index;
      		this.point.num = this.userList[index].score;
      },
      reducePoint : function(index){
      		this.showMd('reducePoint');
      		this.point.type = false;
      		this.point.index = index;
      		this.point.num = this.userList[index].score;
      },
      changeSelectData: function(type,val){
      		if(!type) this.selectData = this.selectAll;
      		this.selectData[type] = val;
      },
      filterActive: function (index) {
        this.loading = false;
        this.index=index;
        this.userList="";
        for (let i=0;i<this.filterLis.length;i++){
            this.filterLis[i].active=false;
        }
        this.filterLis[index].active=true;
        this.changeSelectData(this.filterLis[index].type,this.filterLis[index].val);
        this.selectTitle = this.filterLis[index].title;
        this.getRoomUserScore();
        this.pullDown();
        console.log(this.selectData);
      },
      confirmEvent: function (i) {
      		let self = this;
      		let scores = self.point.type ? self.point.add : -self.point.reduce;
					Api.upDownScore(function(data){
		    		if(data.msgCode == '200'){
		    				self.closeMd('all');
		    				let score = parseFloat(self.userList[i].score) + parseFloat(scores);
		    				self.$store.dispatch('activeRoom',self.activeRoom);
		    				self.userList[i].score = score;
								Toast({message: '操作成功',duration: 1300,iconClass: 'ic-toast-success'});
		    		}else{
		    				Toast({ message: data.msgNote, duration: 1500 });
		    		}
    			},{
	    			roomId: self.$route.params.roomid,
	    			userCode : self.userList[i].userCode,
	    			scores : scores
    			})
      },
      getRoomUserScore : function(){
      	let self = this;
      	Api.getRoomUserScore(function(data){
    			if(data.msgCode == '200'){
					   self.userList = data.list;
    			}
    		},self.selectData)
      }
    },
    beforeCreate(){
      	let self = this;
      	Api.getRoomUserScore(function(data){
    			if(data.msgCode == '200'){
					   self.userList = data.list;
    			}
    		},{
	    			roomId: self.$route.params.roomid,
	    			userCode : '',
	    			orderBy : 'desc',
	    			selectType : 'all',
            page : 1,
            pageSize  : 10,
    		})
    }
}

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../assets/sass/roomCard/allPlayers.scss";
</style>



