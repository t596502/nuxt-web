<template>
    <div class="page-register">
        <article class="header">
            <header>
                <a href="/" class="site-logo"/>
                <span class="login">
          <em class="bold">已有美团账号？</em>
          <a href="/login">
            <el-button
                    type="primary"
                    size="small">登录</el-button>
          </a>
        </span>
            </header>
        </article>
        <section>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="昵称" prop="name">
                    <el-input v-model="ruleForm.name" />
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="ruleForm.email" />
                    <el-button
                            size="mini"
                            round
                            @click="sendMsg">发送验证码</el-button>
                    <span class="status">{{ statusMsg }}</span>
                </el-form-item>
                <el-form-item label="验证码" prop="code">
                    <el-input v-model="ruleForm.code" maxlength="4" />
                </el-form-item>

                <el-form-item label="密码" prop="pwd">
                    <el-input type="password" v-model="ruleForm.pwd" />
                </el-form-item>
                <el-form-item label="确认密码" prop="cpwd">
                    <el-input type="password" v-model="ruleForm.cpwd" />
                </el-form-item>
                <el-form-item>
                    <el-button
                            type="primary"
                            @click="register">同意以下协议并注册</el-button>
                    <div class="error">{{ error }}</div>
                </el-form-item>
                <el-form-item>
                    <a
                            class="f1"
                            href="http://www.meituan.com/about/terms"
                            target="_blank">《美团网用户协议》</a>
                </el-form-item>
            </el-form>
        </section>
    </div>
</template>

<script>
    export default {
        name: "register",
        layout:'blank',
        data(){
            return{
                statusMsg:'',
                ruleForm:{
                    name:'',
                    email:'',
                    pwd:'',
                    cpwd:'',
                    code:''
                },
                rules:{
                    name:[{required: true, type: 'string', message: '请输入昵称', trigger: 'blur'}],
                    email:[{required: true, type: 'email', message: '请输入正确的邮箱', trigger: 'blur'}],
                    pwd:[{required: true, message: '请输入密码', trigger: 'blur'}],
                    cpwd:[{required: true,message: '请确认密码',trigger: 'blur'},{
                        validator:(rule,value,callback)=>{
                            if(!value){
                                callback(new Error('请再次输入密码'))
                            }else if(value !== this.ruleForm.pwd){
                                callback(new Error('两次输入密码不一致'))
                            }else {
                                callback()
                            }
                        },
                        trigger: 'blur'
                    }]
                },
                statusMsg:'',
                error:''
            }
        },
        methods:{
            sendMsg(){
                let namePass;
                let emailPass;
                if(this.timerid) return
                this.$refs['ruleForm'].validateField('name',(valid)=>{
                    namePass = valid
                });
                if(namePass) return false
                this.$refs['ruleForm'].validateField('email',(valid)=>{
                    emailPass = valid
                });
                if(!namePass && !emailPass){
                    const params={username:this.ruleForm.name,email:this.ruleForm.email}
                    this.$axios.post('/users/verify',params).then((res)=>{
                        console.log(res);
                        const {status,data} = res
                        if(status === 200 && data && data.code === 0){
                            let count = 60;
                            this.statusMsg = `验证码已发送,剩余${count--}秒`;
                            this.timerid = setInterval(()=> {
                                this.statusMsg = `验证码已发送,剩余${count--}秒`;
                                if (count === 0) {
                                    this.statusMsg = ''
                                    clearInterval(this.timerid)
                                    this.timerid = null
                                }
                            }, 1000)
                        } else {
                            this.error = data.msg
                            setTimeout(()=>{
                                this.error = ''
                            },1500)
                        }
                    })
                }

            },
            primary(){

            },
            register(){
                const params= {
                    username:this.ruleForm.name,
                    password:this.ruleForm.cpwd,
                    email:this.ruleForm.email,
                    code:this.ruleForm.code
                };
              this.$axios.post('/users/signup',params).then(res=>{
                  console.log(res);
                  const {status,data} = res
                  if(status === 200 && data && data.code === 0) {
                      this.$router.push({path:'/'})
                  }else {
                      this.error = data.msg
                      setTimeout(()=>{
                          this.error = ''
                      },1500)
                  }
              })
            },
        }
    }
</script>

<style scoped lang="scss">
    @import "@/assets/css/register/index.scss";
</style>
