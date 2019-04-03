<template>
    <div class="m-menu">
        <dl class="nav"
            @mouseleave="itemLeave"
        >
            <dt>全部分类</dt>
            <dd v-for="(item,idx) in home.menu" :key="idx"
                @mouseenter="itemEnter"
            >
                <i :class="item.type"/>{{item.name}}<span class="arrow"/>
            </dd>
        </dl>
        <div class="detail"
             v-if="kind"
             @mouseenter="sover"
             @mouseleave="sout"
        >
            <template v-for="item in curdetail.child">
                <h4>{{item.title}}</h4>
                    <span v-for="(v, index) in item.child">{{v}}</span>
            </template>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
        data() {
            return {
                menu: [

                    {
                    type: 'food',
                    name: '美食',
                    child:[{
                        title:'美食',
                        child:['代金券','甜点饮品','火锅','自助餐','小吃快餐']
                    }]
                }, {
                    type: 'takeout',
                    name: '外卖',
                    child:[{
                        title:'外卖',
                        child:['外卖']
                    }]
                }, {
                    type: 'hotel',
                    name: '酒店',
                    child:[{
                        title:'酒店星级',
                        child:['经济型','舒适/三星','高档/四星','豪华/五星']
                    }]
                }
                ],
                kind:''
            }
        },
        mounted(){
        },
        computed:{
            ...mapState(['home']),

            curdetail(){
                return this.home.menu.filter(item=> item.type === this.kind)[0]
            }
        },
        methods:{
            itemEnter(e){
                this.kind = e.target.querySelector('i').className
            },
            itemLeave(){
                this.timer = setTimeout(()=>{
                    this.kind = ''
                },200)
            },
            sover(){
                clearTimeout(this.timer)
            },
            sout(){
                this.kind = ''
            }

        }
    }
</script>

<style scoped>

</style>
