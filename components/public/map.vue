<template>
    <div :id="id"
        :style="`width:${width}px;height:${height}px;margin: 30px 0 0 30px`"
         class="m-map"
    >

    </div>
</template>

<script>
    export default {
        props: {
            width: {
                type: Number,
                default: 300
            },
            height: {
                type: Number,
                default: 300
            },
            point: {
                type: Array,
                default() {
                    return [116.46, 39.92]
                }
            }
        },
        data() {
            return {
                id: `map`,
                key: 'a680aaed0c9f82f5ee10965699b7359c'
            }
        },
        watch:{
            point(val){
                this.map.setCenter(val)
                this.marker.setPosition(val)
            },
        },
        mounted() {
            this.id = `map${Math.random().toString().slice(4, 6)}`
            window.myonLoad = ()=>{
                let map = new AMap.Map(this.id,{
                    resizeEnable: true,
                    zoom: 10,
                    center: [this.point[0].lng,this.point[0].lat]
                });
                this.map = map
                AMap.plugin('AMap.ToolBar',function(){//异步加载插件
                    const toolbar = new AMap.ToolBar();
                    map.addControl(toolbar);
                });
                let arr = []
                this.point.forEach(item=>{
                    console.log(item);
                    let marker = new AMap.Marker({
                        icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
                        position: [item.lng,item.lat],
                    });
                    // marker.setMap(map);
                    map.add(marker);
                })
            };

            const url = 'https://webapi.amap.com/maps?v=1.4.13&key=a680aaed0c9f82f5ee10965699b7359c&callback=myonLoad';
            const jsapi = document.createElement('script');
            jsapi.charset = 'utf-8';
            jsapi.src = url;
            document.head.appendChild(jsapi);
        }
    }
</script>

<style scoped>

</style>
