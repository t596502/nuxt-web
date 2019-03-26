<template>
    <div class="m-iselect">
        <span class="name">按省份选择:</span>
        <el-select v-model="pvalue" placeholder="省份">
            <el-option
                    v-for="item in province"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
        </el-select>

        <el-select
                v-model="city"
                style="margin-left: 20px;"
                :disabled="!pvalue"
                placeholder="城市">
            <el-option
                    v-for="item in cityList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
        </el-select>
    </div>
</template>

<script>
    import _ from 'lodash'
    import {mapMutations} from 'vuex'
    export default {
        data() {
            return {
                province:[], // 省份列表
                pvalue: '', // 选择的省份
                cityList: [], // 城市列表
                city:'' // 选择的城市
            }
        },
        watch:{
            pvalue:_.debounce(async function(newV){
                if(newV){
                    const {status,data:{city}} = await this.$axios.get(`/geo/province/${newV}`)
                    if(status === 200){

                        this.cityList = Array.isArray(city) ? city.map(item =>{
                            return{
                                value:item.id,
                                label:item.name
                            }
                        }) : [];
                        this.city = ''
                    }
                }
            },300),
            city(newV){

                if(newV){
                    this.$router.replace({path:'/'})
                }
            }
        },
        mounted () {
            this.getProvince()
        },
        methods:{
            // ...mapMutations(['setPosition']),
            async getProvince(){
              const {status,data:{province}} = await this.$axios.get('/geo/province')
                if(status === 200){
                    this.province = province.map(item =>{
                        return{
                            value : item.id,
                            label:item.name
                        }
                    })
                }
            }
        },

    }
</script>

<style lang="scss">
    @import "@/assets/css/changeCity/iselect.scss";
</style>
