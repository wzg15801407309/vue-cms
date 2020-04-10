// 入口文件
import Vue from 'vue'
//路由
import VueRouter from 'vue-router'
Vue.use(VueRouter);
// 注册vuex
import Vuex from 'vuex'
Vue.use(Vuex)
// 获取本地保存的购物车的数据，没有car就为[]
var locaCar = JSON.parse(localStorage.getItem('car') || "[]")
// var car=JSON.parse(localStorage.getItem("car"))||[];
var store = new Vuex.Store({
  state: {
    // car:locaCar
    car: locaCar
  },
  mutations: {
    addToCar(state, goodsinfo) {
      var flag = false;
      // 把商品信息保存在stroe中

      state.car.some(item => {
        if (item.id == goodsinfo.id) {
          flag = true;
          item.count += parseInt(goodsinfo.count);
          return true;
        }
      })

      if (!flag) {
        state.car.push(goodsinfo);
      }
      // 把car数据存在本地,下次打开网页时候还有加入的购物车的物品
      console.log(JSON.stringify(state.car))
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    updateGoodsInfo(state, goodsinfo) {
      state.car.some(item => {
        if (item.id == goodsinfo.id) {
          item.count = parseInt(goodsinfo.count);
          return true;
        }
      })
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    removeForCar(state, id) {
      state.car.some((item, i) => {
        if (item.id == id) {
          state.car.splice(i, 1);
          return true;
        }
      })
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    selectChanged(state, info) {
      state.car.some((item, i) => {
        if (item.id == info.id) {
          item.isselected = info.isselected;
          return true;
        }
      })
      localStorage.setItem('car', JSON.stringify(state.car))
    }
  },
  getters: {
    getAllCount(state) {
      var c = 0;
      state.car.forEach(item => {
        c += item.count;
      })
      return c;
    },
    getGoodsCount(state) {
      var o = {}
      state.car.forEach(item => {
        o[item.id] = item.count
      })
      return o;
    },
    getGoodsSelected(state) {
      var o = {}
      state.car.forEach(item => {
        o[item.id] = item.isselected;
      })
      return o;
    },
    getGoodsAmout(state) {
      var o = {
        count: 0,
        amount: 0
      }
      state.car.forEach(item => {
        if (item.isselected) {
          o.count += item.count;
          o.amount += item.price * item.count;
        }
      })
      return o;
    }
  }
})
// 导入App的根组件
import app from './App.vue'
// 导入到mui组件
// import {Header,Swipe,SwipeItem,Button,Lazyload} from 'mint-ui'
// Vue.component(Header.name,Header)
// Vue.component(Swipe.name,Swipe)
// Vue.component(SwipeItem.name,SwipeItem)
// Vue.component(Button.name,Button)
// Vue.use(Lazyload)
import MinUI from "mint-ui"
Vue.use(MinUI);
import 'mint-ui/lib/style.css'
// 导入mui的样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

// 安装
import VueResource from 'vue-resource'
Vue.use(VueResource)
// 设置根路径
// Vue.http.options.root="http://vue.studyit.io"
// Vue.http.headers.common['Authorization'] = 'Access-Control-Allow-Origin';
Vue.config.devtools = true
// 导入时间插件（格式化时间）
import moment from 'moment'

import VuePreview from 'vue-preview'
Vue.use(VuePreview)

// 定义全局的过滤器
Vue.filter('dateFormat', function (datastr, pattern = "YYYY-MM-DD HH:mm:ss") {
  // moment()  直接调用得到当前的时间
  return moment(datastr).format(pattern)
})
import router from './router'
var vm = new Vue({
  el: '#app',
  render: c => c(app),
  router,
  store
})
