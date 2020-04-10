import VueRouter from 'vue-router'
import HomeContainer from './components/HomeContainer.vue'
import MemberContainer from './components/MemberContainer.vue'
import ShopcarContainer from './components/shopcarContainer.vue'
import SearchContainer from './components/SearchContainer.vue'

import NewsList from './components/news/NewsList.vue'
import Newsinfo from './components/news/Newsinfo.vue'

import PhotoList from './components/photos/Photolist.vue'
import PhotoInfo from './components/photos/Photoinfo.vue'

import GoodsList from './components/goods/GoodsList.vue'
import GoodsInfo from './components/goods/GoodsInfo.vue'
import GoodsDec from './components/goods/GoodsDec.vue'
import GoodsComment from './components/goods/GoodsComment.vue'


// 3. 创建路由对象
var router = new VueRouter({
  routes: [{
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: HomeContainer
    },
    {
      path: '/member',
      component: MemberContainer
    },
    {
      path: '/shopcar',
      component: ShopcarContainer
    },
    {
      path: '/search',
      component: SearchContainer
    },
    {
      path: "/home/newlist",
      component: NewsList
    },
    {
      path: "/home/newsinfo/:id",
      component: Newsinfo
    },
    {
      path: "/home/photolist",
      component: PhotoList
    },
    {
      path: "/home/photoinfo/:id",
      component: PhotoInfo
    },
    {
      path: "/home/goodslist",
      component: GoodsList
    },
    {
      path: "/home/goodsinfo/:id",
      component: GoodsInfo,
      name: "goodsinfo"
    },
    {
      path: "/home/goodsdec/:id",
      component: GoodsDec,
      name: "goodsdec"
    },
    {
      path: "/home/goodscomment/:id",
      component: GoodsComment,
      name: "goodscomment"
    }
  ],
  // 默认的事router-link-active
  linkActiveClass: 'mui-active'
})

// 把路由对象暴露出去
export default router