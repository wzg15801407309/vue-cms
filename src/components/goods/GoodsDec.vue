<!--  -->
<template>
    <div>
        <h3>{{info.title}}</h3>
        <hr>
        <div class="content" v-html="info.content"></div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                id: this.$route.params.id,
                info: {}
            }
        },
        created() {
            this.getInfo();
        },
        methods: {
            getInfo() {
                this.$http.get("static/json/goodsdec.json").then(
                    res => {
                        if (res.body.status === 0) {
                            console.log("Goodsdec:" + res.body.message[0]);
                            this.info = res.body.message[0];
                        } else {
                            Toast("获取数据失败了哦");
                        }
                    })
            }
        }
    }
</script>

<style lang='scss' scoped>
    h3 {
        color: #26a2ff;
        text-align: center;
        font-size: 18px;
        margin: 15px 0;
    }
    .content{
        color: #ccc;
    }
</style>
