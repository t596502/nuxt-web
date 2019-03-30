<template>
    <div class="">
        <dl class="m-categroy">
            <dt>按拼音首字母选择：</dt>
            <dd
                    v-for="item in list"
                    :key="item">
                <a :href="'#city-'+item">{{ item }}</a>
            </dd>
        </dl>
        <dl v-for="item in block" :key="item.title" class="m-categroy-section">
            <dt :id="'city-'+item.title">{{ item.title }}</dt>
            <dd>
                <span v-for="c in item.city" :key="c">{{ c }}</span>
            </dd>
        </dl>
    </div>
</template>

<script>
    import pyjs from 'js-pinyin'

    export default {
        data() {
            return {
                block: [],
                list: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
            }
        },
        async mounted() {
            let blocks = [];
            let obj = {};
            let {status, data: {city}} = await this.$axios.get('/geo/city');
            if (status === 200) {
                city.forEach(item => {
                    const letter = pyjs.getFullChars(item.name).toLowerCase().slice(0, 1)
                    const uniCode = letter.codePointAt(0)
                    if (uniCode < 123 && uniCode > 96) {
                        if (!obj[letter]) {
                            obj[letter] = []
                        }
                        obj[letter].push(item.name)
                    }
                });
                for (let [key, value] of Object.entries(obj)) {
                    blocks.push({
                        title:key.toUpperCase(),
                        city:value
                    })
                }
                blocks.sort((a,b)=>{
                    return a.title.codePointAt(0) - b.title.codePointAt(0)
                });
                this.block = blocks
            }
        }
    }
</script>

<style lang="scss">
    @import "@/assets/css/changeCity/categroy.scss";
</style>
