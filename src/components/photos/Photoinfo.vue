<!--  -->
<template>
    <div class="info">
        <h3>{{ list.title }}</h3>
        <p class="subtitle">
            <span>发表时间：{{ list.add_time | dateFormat }}</span>
            <span>点击：{{ list.click }}次</span>
        </p>
        <hr>

        <!-- 缩略图 -->
        <div class="thumbs">
            <vue-preview :slides="imglstnpm" @close="handleClose"></vue-preview>
        </div>
        <!-- 图片内容区域 -->
        <div class="content" v-html="list.content"></div>
        <!-- 放置一个现成的 评论的子组件 -->
        <cmt-box></cmt-box>
    </div>
</template>

<script>
    import comment from '../subcomponents/comment.vue'
    export default {
        data() {
            return {
                id: this.$route.params.id,
                list: {},
                imglstnpm: []
            };
        },
        created() {
            this.getPhotoInfo();
            this.getSuoLuvTu();
        },
        methods: {
            getPhotoInfo() {
                this.$http.get("static/json/photoinfolist.json").then(res => {
                    if (res.body.status === 0) {
                        this.list = res.body.message[0];
                    }
                });
            },
            getSuoLuvTu() {
                this.$http.get("static/json/suonuotu.json").then(res => {
                    console.log(res.body.message);
                    if (res.body.status === 0) {
                        res.body.message.forEach(item => {
                            item.w = 600;
                            item.h = 400;
                            item.msrc = item.src; //关键点，赋值给它
                        });
                        this.imglstnpm = res.body.message;
                        console.log(res.body.message);
                    }
                })
            },
            handleClose() { //加上这个方法
                console.log('close event')
            }
        },
        components: {
            "cmt-box": comment
        }
    }
</script>

<style lang='scss' scoped>
    .info h3 {
        color: #26a2ff;
        text-align: center;
        font-size: 15px;
        margin: 15px 0;
    }

    .info .subtitle {
        display: flex;
        justify-content: space-between;
        margin: 0px 5px;
        font-size: 13px;
    }

    .info .content {
        margin: 0px 5px;
        font-size: 13px;
        line-height: 30px;
    }

    .thumbs /deep/ .my-gallery {
        display: flex;
        flex-wrap: wrap;
    }

    .thumbs /deep/ .my-gallery figure {
        width: 30%;
        margin: 5px;
    }

    .thumbs /deep/ .my-gallery figure img {
        width: 100%;
        box-shadow: 0 0 5px #999;
        border-radius: 5px;
    }
</style>
