<template>
    <div class="m-user">
        <template v-if="user">
            欢迎您，<span class="username">{{ user }}</span>
            [<nuxt-link to="/exit">退出</nuxt-link>]
        </template>
        <template v-else>
            <nuxt-link
                    to="/login"
                    class="login">立即登录</nuxt-link>
            <nuxt-link
                    class="register"
                    to="/register">注册</nuxt-link>
        </template>
    </div>
</template>

<script>
    export default {
        // name: "user",
        data(){
            return{
                user:""
            }
        },
        mounted() {
            this.$axios.get('users/getUser').then(res=>{
                let {status,data} = res
                console.log(res);
                if(status ===200){
                        this.user = data.user
                }else {
                    console.log('服务器异常');
                }
            })
        }
    }
</script>

<style lang="css">

</style>
