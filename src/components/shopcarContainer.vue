<!-- 购物车 -->
<template>
  <div class="shopcar-container">

    <div class="goods-list">
      <!-- 商品列表项区域 -->
      <div class="mui-card" v-for="(item, i) in goodslist" :key="item.id">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <!-- " -->
            <mt-switch v-model="$store.getters.getGoodsSelected[item.id]"
              @change="selectedChanged(item.id, $store.getters.getGoodsSelected[item.id])"></mt-switch>
            <img :src="item.thumb_path">
            <div class="info">
              <h1>{{ item.title }}</h1>
              <p>
                <span class="price">￥{{ item.sell_price }}</span>
                <numbox :initcount="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"></numbox>
                <!-- <numbox  ></numbox> -->
                <a href="#" @click.prevent="remove(item.id, i)">删除</a>
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
    <!-- 结算区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner jiesuan">
          <div class="left">
            <p>总计（不含运费）</p>
            <p>已勾选商品 <span class="red">{{ $store.getters.getGoodsAmout.count }}</span> 件， 总价 <span
                class="red">￥{{ $store.getters.getGoodsAmout.amount }}</span></p>
          </div>
          <mt-button type="danger">去结算</mt-button>
        </div>
      </div>
    </div>
    <!-- 测试 -->
    <!-- <p>{{ $store.getters.getGoodsSelected }}</p> -->
  </div>
</template>

<script>
  import numbox from "../components/subcomponents/shopcarnumbox.vue";
  export default {
    data() {
      return {
        goodslist: []
      }
    },
    created() {
      this.getGoodsList();
    },
    methods: {
      getGoodsList() {
        // 正场情况的数据处理
        // // 1. 获取到 store 中所有的商品的Id，然后拼接出一个 用逗号分隔的 字符串
        // var idArr = [];
        // this.$store.state.car.forEach(item => idArr.push(item.id));
        // // 如果 购物车中没有商品，则直接返回，不需要请求数据接口，否则会报错
        // if (idArr.length <= 0) {
        //   return;
        // }
        // // 获取购物车商品列表
        // .get("api/goods/getshopcarlist/" + idArr.join(",")).then(result => {
        //   if (result.body.status === 0) {
        //     console.log(result.body.message);
        //     this.goodslist = result.body.message;
        //   }
        // });
        // 

        // 自己拼接数据
        var idArr = [];
        this.$store.state.car.forEach(item => idArr.push(item.id));
        // 如果 购物车中没有商品，则直接返回，不需要请求数据接口，否则会报错
        if (idArr.length <= 0) {
          return;
        }
        for (var i = 0; i < idArr.length; i++) {
          var goodsinfo = {
            cou: 1,
            id: idArr[i],
            sell_price: 1993,
            title: "goods" + (i + 1),
            thumb_path: "static/images/plants/p-plants-3.jpg"
          };
          this.goodslist.push(goodsinfo);
        }
        console.log(this.goodslist)
      },
      remove(itemID, listindex) {
        this.goodslist.splice(listindex, 1);
        this.$store.commit("removeForCar", itemID);
      },
      selectedChanged(id, value) {
        // 同步store的数据
        this.$store.commit("selectChanged", {
          id: id,
          isselected: value
        });
      }
    },
    components: {
      numbox
    }
  }
</script>

<style lang='scss' scoped>
  .shopcar-container {
    background-color: #eee;
    overflow: hidden;
  }

  .shopcar-container .goods-list .mui-card-content-inner {
    display: flex;
    align-items: center;
  }

  .shopcar-container .goods-list img {
    width: 60px;
    margin: 0 5px;
  }

  .shopcar-container .goods-list h1 {
    font-size: 13px;
  }

  .info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

  }

  .info .price {
    color: red;
    font-weight: bold;
  }

  .jiesuan {
    display: flex;
    justify-content: space-between;
    align-items: center;

  }

  .jiesuan .red {
    color: red;
    font-weight: bold;
    font-size: 16px;
  }
</style>
