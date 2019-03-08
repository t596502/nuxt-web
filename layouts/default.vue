<template>
  <el-container class="layout-default">
    <el-header height="197px">
      <my-header></my-header>
    </el-header>
    <el-main>
      <nuxt />
    </el-main>
    <el-footer height="100%">Footer</el-footer>
  </el-container>
</template>
<script>
  import MyHeader from '~/components/public/header/index.vue'
  // import myHeader from '@/components/public/footer/index.vue'
  export default {
    components:{
      MyHeader,
    }
  }
</script>

<style lang="scss">
  @import "@/assets/css/public/header/index.scss";
</style>
