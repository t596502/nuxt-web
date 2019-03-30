<template>
    <div class="search-panel">
        <el-row class="m-header-searchbar">
            <el-col :span="3" class="left">
                <nuxt-link to="/">
                    <img src="//s0.meituan.net/bs/fe-web-meituan/e5eeaef/img/logo.png" />
                </nuxt-link>
            </el-col>
            <el-col :span="15" class="center">
                <div class="wrapper">
                    <el-input
                            @input="input"
                            @focus="focus"
                            @blur="blur"
                            v-model="search"
                            placeholder="搜索商家或地点" />
                    <nuxt-link :to="'/products?keyword=' + search">
                        <button class="el-button el-button--primary"><i class="el-icon-search"/></button>
                    </nuxt-link>
                    <dl
                            v-if="isHotPlace"
                            class="hotPlace">
                        <dt>热门搜索</dt>
                        <dd style="display: block" v-for="(item,index) in home.hotPlace.slice(0,5)" :key="index">
                            <nuxt-link :to="'/products?keyword=' + item">{{item}}</nuxt-link>
                        </dd>
                    </dl>
                    <dl

                            class="searchList" >
                        <dd v-for="(item,index) in searchList " :key="index"
                            v-if="isSearchList">
                            {{item.name}}
                        </dd>
                    </dl>
                </div>
                <!--搜索栏底部链接-->
                <p class="suggest">
                    <nuxt-link v-for="(item,index) in home.hotPlace.slice(0,5)"
                       :key="index"
                       :to="'/products?keyword=' + item" >{{item}}</nuxt-link>
                </p>
                <ul class="nav">
                    <li><nuxt-link
                            to="/"
                            class="takeout">美团外卖</nuxt-link></li>
                    <li><nuxt-link
                            to="/"
                            class="movie">猫眼电影</nuxt-link></li>
                    <li><nuxt-link
                            to="/"
                            class="hotel">美团酒店</nuxt-link></li>
                    <li><nuxt-link
                            to="/"
                            class="apartment">民宿/公寓</nuxt-link></li>
                    <li><nuxt-link
                            to="/"
                            class="business">商家入驻</nuxt-link></li>
                </ul>
            </el-col>
            <el-col :span="6" class="right">
                <ul class="security">
                    <li><i class="refund"/><p class="txt">随时退</p></li>
                    <li><i class="single"/><p class="txt">不满意免单</p></li>
                    <li><i class="overdue"/><p class="txt">过期退</p></li>
                </ul>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import _ from 'lodash'
    import {mapState} from 'vuex'
    export default {
        name: "searchbar",
        data(){
            return {
                isFocus:false,
                search:'',
                hotPlace:['火锅','火锅','火锅'],
                searchList:['故宫','故宫','故宫'],
            }
        },
        computed:{
            ...mapState(['home','geo']),
            isHotPlace(){
                return this.isFocus && !this.search
            },
            isSearchList(){
                return this.isFocus&&this.search
            }
        },
        methods:{
            focus(){
                this.isFocus=true
            },
            blur(){
                setTimeout(()=>{
                    this.isFocus=false
                },200)
            },
            input: _.debounce(async function() {
                let city=this.geo.position.city.replace('市','')
                let {status,data:{top,code}} = await this.$axios('/search/top',{
                    params:{
                        input:this.search,
                        city
                    }
                })
                if(status === 200 && code === 0){
                    this.searchList = top.slice(0,10)
                    console.log(this.searchList);
                }

            },300)
        }

    }
</script>

<style scoped>

</style>
