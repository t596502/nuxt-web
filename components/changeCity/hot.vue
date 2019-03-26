<template>
    <div class="m-hcity">
        <dl>
            <dt>热门城市：</dt>
            <dd
                    v-for="item in flter"
                    :key="item.id">{{ item.name==='市辖区'?item.province:item.name }}</dd>
        </dl>
    </div>
</template>

<script>
    export default {
        name: "hot",
        data(){
            return{
                hotCity:[],
                // 北京上海广州深圳天津西安重庆杭州南京武汉成都
            }
        },
        computed:{
            flter(){
                this.hotCity.forEach(item=>{
                    if(item.province.indexOf('市') > -1){
                        item.province.replace('市','')
                    }
                })
                console.log(this.hotCity);
                return this.hotCity
            },
        },
        async mounted() {
            const {status,data:{hots}} = await this.$axios.get('/geo/hotCity')
            console.log(hots);
            if(status === 200){
                this.hotCity = hots
            }
        }
    }
</script>

<style lang="scss">
@import "@/assets/css/changeCity/hot.scss";
</style>
