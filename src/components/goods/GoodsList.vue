<!-- 商品购买 -->
<template>
  <div class="goods-list">
    <!-- 在页面中有两种方式条转 -->
    <!-- 使用a  标签叫标签跳转 -->
    <!-- 使用  window。location。href 的形式叫编程试跳转 -->

    <!-- 这里使用的是标签试的跳转 -->
    <!-- <router-link class="goodsitem" v-for="item in goodslist" :key="item.id" :to="`/home/goodsinfo/`+item.id" tag="div">
      <img :src="item.img_url" alt="">
      <h1>{{item.title}}</h1>
      <div class="item-down">
        <p class="price"><span class="new">￥{{item.sell_price}}</span><span class="old">￥{{item.market_price}}</span></p>
        <p class="sell"><span>热卖中</span><span>剩{{item.stock_quantity}}件</span></p>
      </div>
    </router-link> -->

    <div class="goodsitem" v-for="item in goodslist" :key="item.id" @click="goDetail(item.id)">
      <img :src="item.img_url" alt="">
      <h1>{{item.title}}</h1>
      <div class="item-down">
        <p class="price"><span class="new">￥{{item.sell_price}}</span><span class="old">￥{{item.market_price}}</span></p>
        <p class="sell"><span>热卖中</span><span>剩{{item.stock_quantity}}件</span></p>
      </div>
    </div>
    <mt-button type="danger" size="large" @click=getMore>加载更多</mt-button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        pageindex:1,
        goodslist:[]
      }
    },
    created(){
      this.getGoodsList();
    },
    methods:{
      getGoodsList(){
        this.$http.get("static/json/goodslist.json").then(res=>{
          if(res.body.status===0)
          {
            console.log("//////////////");
            this.goodslist=this.goodslist.concat(res.body.message);
          }
        })
      },
      getMore(){
        this.pageindex++;
        if( this.pageindex<3)
        {
            this.getGoodsList();
        }
      },
      goDetail(id)
      {
        // 区别   this.$router    this.$route
        //  this.$router：是一个路由导航对象，用它可以方便的实现路由的前进  后退 和跳转到新的页面
        //  this.$route ：是路由的参数对象  所有路由中的参数  parame query 都属于他
        this.$router.push({name:"goodsinfo", params:{id}})
      }
    }
  }
</script>

<style lang='scss' scoped>
  .goods-list {
    display: flex;
    flex-wrap: wrap;
    padding: 10px 7px;
    justify-content: space-between;
  }

  .goods-list .goodsitem {
    width: 49%;
    border: 1px solid #ccc;
    box-shadow: 0 0 5px #ccc;
    margin-bottom: 7px;
    padding: 3px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 200px;
  }

  .goods-list .goodsitem img {
    width: 100%;
  }

  .goods-list .goodsitem h1 {
    font-size: 14px;
  }

  .goods-list .goodsitem .item-down {
    background-color: #eee;
  }

  .goods-list .goodsitem .item-down p {
    margin: 0;
    padding: 5px;
  }

  .goods-list .goodsitem .item-down .price .new {
    font-size: 16px;
    color: red;
    font-weight: bold;
  }

  .goods-list .goodsitem .item-down .price .old {
    text-decoration: line-through;
    font-size: 12px;
    margin-left: 10px;
  }

  .goods-list .goodsitem .item-down .sell {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
  }

  /* .goods-list .goodsitem .item-down .sell span {
    color: #ccc
  } */
</style>
