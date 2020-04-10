<!-- 轮播图组件 -->
<template>
    <div>
        <mt-swipe :auto="4000">
            <!-- lunbotuList  需要父组件向子组件传值 -->
            <mt-swipe-item v-for='item in lunbotuList' :key='item.url'>
                <img :src="item.img" :class="{'full':isfull}">
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>

<script>
    export default {
        props:['lunbotuList','isfull']
    }
</script>

<style lang='scss' scoped>
.mint-swipe {
    height: 200px;
  }

  .mint-swipe img {
    height: 100%;
  }
  .mint-swipe-item{
      text-align: center;
  }
  .full{
    width: 100%;
  }
  /* .mint-swipe-item:nth-child(1) {
    background-color: aquamarine;
  }

  .mint-swipe-item:nth-child(2) {
    background-color: red;
  }

  .mint-swipe-item:nth-child(3) {
    background-color: thistle;
  } */
</style>
