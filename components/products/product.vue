<template>
  <dl class="s-item">
    <dt>
      <img
        :src="meta.img"
        alt="商品图片">
    </dt>
    <dd>
      <h3><nuxt-link :to="{path:'detail',query:{keyword:meta.name,type:meta.module}}">{{ meta.name }}</nuxt-link></h3>
      <el-rate
        v-model="meta.rate"
        :colors="['#ff9900', '#ff9900', '#FF9900']"
        disabled/>
      <span
        v-if="meta.rate>4"
        class="s-item-comment">很好</span><span
          v-else-if="meta.rate>3"
          class="s-item-comment">一般</span><span
            v-else
            class="s-item-comment">很差</span>
      <span class="s-item-value">{{ meta.rate }}分</span>
      <span class="s-item-comment-total">{{ meta.comment }}人评论</span>
      <p>
        <span class="s-item-type">{{ meta.type }}</span>
        <span class="s-item-addr">{{ meta.addr }}</span>
      </p>
      <p style="display: flex;justify-content: space-between; align-items: center;">
        <em class="s-item-price">￥{{ meta.price }}起</em>
        <!--<b>{{ meta.status }}</b>-->
        <el-button type="success" plain @click="addCart">加入购物车</el-button>
      </p>
      <ul>
        <!-- <li>
          <span class="detail-type">门票</span>{{meta.ticket}}
        </li>
        <li>
          <span class="detail-type">跟团</span>{{meta.group}}
        </li> -->
        <li v-if="meta.scene&&meta.scene.length">
          <span class="detail-type">景酒</span>{{ meta.scene }}
        </li>
        <li v-else>
          <span class="detail-type">景酒</span>暂无描述
        </li>
      </ul>
    </dd>
  </dl>
</template>

<script>
export default {
  props: {
    meta: {
      type:Object,
      default(){
        return {}
      }
    }
  },
  methods:{
    addCart:async function (){
      console.log(this.meta);
      let {status,data:{code,cartNo}} = await this.$axios.post('/cart/create',{
        id: Math.random().toString().slice(3,9),
        detail:{
          name:this.meta.name,
          img:this.meta.img,
          price:this.meta.price
        }
      })
      if(status === 200 && code === 0){
        this.$router.push(`/cart?id=${cartNo}`)
      }else {
        console.log('购物车加入失败');
      }
    }
  }
}
</script>
