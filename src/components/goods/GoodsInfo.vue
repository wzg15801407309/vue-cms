<!-- 商品详情页面 -->
<template>
    <div class="goodsinfo-container">
        <!-- 商品轮播区域 -->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <swiper :lunbotuList="lunbotuList" :isfull="true"></swiper>
                </div>
            </div>
        </div>
        <!-- 商品购买区域 -->
        <div class="mui-card">
            <div class="mui-card-header">{{goodsinfo.title}}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="price">市场价：<del>￥{{goodsinfo.market_price}}</del>&nbsp;&nbsp;销售价：<span
                        class="now_price">￥{{goodsinfo.sell_price}}</span>
                    </p>
                    <p class="numbox">购买数量：<numbox @getcount="getselectedCound" :max="goodsinfo.stock_quantity"></numbox> </p>
                   

                    <p>
                        <mt-button type="primary" size="small">立即购买</mt-button>
                        <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
                    </p>
                </div>
            </div>
        </div>
        <!-- 商品参数区域 -->
        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号：{{goodsinfo.goods_on}}</p>
                    <p>库存情况：{{goodsinfo.stock_quantity}}件</p>
                    <p>上架时间：{{goodsinfo.add_time}}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type="primary" size="large" plain @click="getDec(id)">图文简绍</mt-button>
                <mt-button type="danger" size="large"  plain @click="geComment(id)">商品评论</mt-button>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        Toast
    } from "mint-ui";
    import swiper from "../subcomponents/swiper.vue"
    import numbox from "../subcomponents/numbox.vue"
    export default {
        data() {
            return {
                id: this.$route.params.id,
                lunbotuList: [],
                goodsinfo: {},
                selectedCound:1
            }
        },
        created() {
            this.getBanner();
            this.getGoodsInfo();
        },
        methods: {
            getBanner() {
                this.$http.get("static/json/nunbotu.json").then(
                    res => {
                        if (res.body.status === 0) {
                            console.log("00000000" + res.body.message);
                            this.lunbotuList = res.body.message;
                        } else {
                            Toast("获取数据失败了哦");
                        }
                    })
            },
            getGoodsInfo() {
                this.$http.get("static/json/goodsinfo.json").then(
                    res => {
                        if (res.body.status === 0) {
                            this.goodsinfo = res.body.message[0];
                        } else {
                            Toast("获取数据失败了哦");
                        }
                    })
            },
            getDec(id){
                this.$router.push({name:"goodsdec",params:{id}})
            },
            geComment(id){
                this.$router.push({name:"goodscomment",params:{id}})
            },
            getselectedCound(count){
                this.selectedCound=count;
            },
            addToShopCar(){
                var goodsinfo={
                    id:this.id,
                    count:this.selectedCound,
                    price:this.goodsinfo.sell_price,
                    isselected:true
                };
                this.$store.commit("addToCar",goodsinfo)
            }
        },
        components: {
            swiper,
            numbox
        }
    }
</script>

<style lang='scss' scoped>
    .goodsinfo-container {
        background-color: #eee;
        overflow: hidden;
    }

    .mui-card-footer {
        display: block;
    }
    .numbox {
        display: flex;
        align-items: center
    }

    .mui-card-footer button {
        margin: 15px 0;
    }

    .now_price {
        color: red;
        font-size: 16px;
        font-weight: bold;
    }
</style>