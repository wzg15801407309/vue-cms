<!-- 图片分享 -->
<template>
  <div>
    <!-- 顶部滑动条区域 -->
    <div id="slider" class="mui-slider">
      <div id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
        <div class="mui-scroll">
          <a :class="['mui-control-item', item.id == 0 ? 'mui-active' : '']" v-for="item in cates" :key="item.id"
            @tap="getPhotoListByCateId(item.id)">
            {{ item.title}}
          </a>
        </div>
      </div>
    </div>
    <!-- 图片列表 -->
    <ul class="photo-list">
      <router-link v-for="item in list" :key="item.id" :to="'/home/photoinfo/' + item.id" tag="li">
        <img v-lazy="item.imgurl">
        <div class="info">
          <h1 class="info-title">{{ item.title}}</h1>
          <div class="info-body">{{ item.zhaiyao }}</div>
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script>
  // 1. 导入 mui 的js文件
  import mui from "../../lib/mui/js/mui.min.js";
  export default {
    data() {
      return {
        cates: [],
        list: []
      }
    },
    created() {
      this.getAllCategroy();
      this.getPhotoListByCateId(0);
    },
    mounted() {
      // 当 组件中的DOM结构被渲染好并放到页面中后，会执行这个 钩子函数
      // 如果要操作元素了，最好在 mounted 里面，因为，这里时候的 DOM 元素 是最新的
      // 2. 初始化滑动控件
      mui(".mui-scroll-wrapper").scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
      });
    },
    methods: {
      getAllCategroy() {
        this.$http.get("static/json/photoListslider.json").then(
          res => {
            res.body.message.unshift({
              title: "全部",
              id: 0
            });
            console.log(res.body.message);
            this.cates = res.body.message;
          }
        )
      },
      getPhotoListByCateId(cateId) {
        console.log(cateId);
        let str;
        if (cateId === 0) {
          str = "static/json/photolistAll.json";
        } else if (cateId > 0 && cateId < 3) {
          console.log("////////"+cateId);
          str = "static/json/photolistAll1.json";
        } else if (cateId > 2 && cateId < 6) {
          str = "static/json/photolistAll2.json";
        } else if (cateId > 5) {
          str = "static/json/photolistAll3.json";
        }
       

        this.$http.get(str).then(result => {
          if (result.body.status === 0) {
            this.list = result.body.message;
          }
        })
      }
    }
  }
</script>

<style lang='scss' scoped>
  * {
    touch-action: pan-y;
  }
  .photo-list{
    list-style: none;
    margin: 0;
    padding: 10px;
    padding-bottom: 0px;
  }
  .photo-list li {
    min-height: 150px;
    background-color: #ccc;
    text-align: center;
    margin-bottom: 10px;
    box-shadow: 0px 0px 9px #999999;
    position: relative;
  }
  .photo-list li img{
    width: 100%;
    vertical-align: middle;
  }
 img[lazy="loading"] {
    width: 40px;
    height: 40px;
    margin: auto;
  }
  .photo-list .info{
    color: #fff;
    text-align: left;
    position: absolute;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.18)
  }
  .photo-list .info .info-title{
    font-size: 14px;
  }
  .photo-list .info .info-body{
    font-size: 13px;
  }
</style>
