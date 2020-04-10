<!--  -->
<template>
    <div>
        <div class="mui-numbox" data-numbox-min='1'>
            <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
            <input id="test" class="mui-input-numbox" type="number" value="1" 
            @change="countChanged" ref="numbox"/>
            <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
        </div>
    </div>
</template>

<script>
    import mui from "../../lib/mui/js/mui.min.js"
    export default {
        mounted(){
            mui(".mui-numbox").numbox();
        },
        methods:{
            countChanged(){
                console.log(this.$refs.numbox.value);
                this.$emit("getcount",parseInt(this.$refs.numbox.value))
            }
        },
        data() {
            return {}
        },
        watch:{
            "max":function(newval,oldval){
                mui(".mui-numbox").numbox().setOption("max",newval);
            }
        }
    }
</script>

<style lang='scss' scoped>

</style>
