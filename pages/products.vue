<template>
    <el-row class="page-product">
        <el-col :span="19">
            <crumbs :keyword="keyword"/>
            <categroy
                    :types="types"
                    :areas="areas"/>
            <list :list="list"/>
        </el-col>
        <el-col :span="5">
            <amap
                    :width="230"
                    :height="290"
                    :point="point"/>
        </el-col>
    </el-row>

</template>

<script>
    import Crumbs from '@/components/products/crumbs.vue'
    import Categroy from '@/components/products/categroy.vue'
    import List from '@/components/products/list.vue'
    import Amap from '@/components/public/map.vue'

    export default {
        components: {
            Crumbs,
            Categroy,
            List,
            Amap
        },
        data() {
            return {
                list: [],
                types: [],
                areas: [],
                keyword: '',
                point: [116.397428, 39.90923]
            }
        },
        methods:{

        },
        async asyncData(ctx) {
            let keyword = ctx.query.keyword;

            let city = '连云港';

            let {status, data: {list}} = await ctx.$axios.get('/search/top', {
                params: {
                    city,
                    list:1
                }
            })

            let {status: status2, data: {areas, types}} = await ctx.$axios.post('/categroy/crumbs', {city,})
            if (status === 200 && status2 === 200) {
                return {
                    keyword,
                    types: types.slice(0, 6),
                    areas,
                    list: list.map((item) => {
                        return {
                            type: item.type,
                            name: item.name,
                            tel: item.tel,
                            img:'https://p1.meituan.net/hotel/10d7bbfdd5281200a1fb1e94f85b0ef8124132.jpg@440w_250h_1e_1c',
                            comment: Math.floor(Math.random()*10000),
                            rate: Math.floor(Math.random()*10),
                            price: Math.floor(Math.random()*100),
                            location:{lat:item.longtide,lng:item.latitude}
                        }
                    }),
                    // point:list.filter((item) => item.longtide && item.latitude)
                    point:list.map((item) => {
                        return {
                            lng:item.longtide,lat:item.latitude
                        }
                    })
                }
            }

        }
    }
</script>

<style lang="scss">
    @import "@/assets/css/products/index.scss";
</style>
