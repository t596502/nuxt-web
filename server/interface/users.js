import Router from 'koa-router'
import Redis from 'koa-redis'
import nodeMailer from 'nodemailer'
import User from '../dbs/models/users'
import Passport from './utils/passport'
import {MD5} from './utils/crypto'
import Email from '../dbs/config'
import axios from './utils/axios'

let router = new Router({prefix: '/users'});
let Store = new Redis().client;

// 发送验证码
router.post('/verify', async (ctx, next) => {
    const {body} = ctx.request;
    const saveExpire = await Store.hget(`nodemail:${body.username}`, 'expire');

    if (saveExpire && new Date().getTime() - saveExpire < 0) {
        ctx.body = {
            code: -1,
            msg: '验证请求过于频繁，1分钟内1次'
        }
        return false
    }
    let transporter = nodeMailer.createTransport({
        service: 'qq',
        host: Email.smtp.host,
        port: 587,
        secure: false,
        auth: {
            user: Email.smtp.user,
            pass: Email.smtp.pass
        }
    });
    let ko = {
        code: Email.smtp.code(),
        expire: Email.smtp.expire(),
        email: body.email,
        user: body.username
    };
    let mailOptions = {
        from: `"test认证邮件" <${Email.smtp.user}>`,
        to: ko.email,
        subject: "nathan to you test",
        text: "测试注册码",
        html: `您的邀请码是${ko.code}`
    };
    try {
        let info = transporter.sendMail(mailOptions)
        console.log(info);
        ctx.body = {
            code: 0,
            msg: '验证码已发送'
        }
        Store.hmset(`nodemail:${ko.user}`, 'code', ko.code, 'expire', ko.expire, 'email', ko.email)
    } catch (e) {
        ctx.body = {code: -1, msg: '服务器异常，请稍候重试'}
    }

});

// 注册账号
router.post('/signup',async(ctx,next)=>{
    const {username,password,email,code} = ctx.request.body;
    console.log(ctx.request.body);
    if(!username || !password || !email){
        ctx.body ={
            code:-1,
            msg:'请输入用户名、密码、邮箱？'
        };
        return
    }
    if(code){
        const saveCode = await Store.hget(`nodemail:${username}`,'code');
        const saveExpire = await Store.hget(`nodemail:${username}`,'expire');
        if(code === saveCode){
            if(new Date().getTime() - saveExpire > 600000){
                ctx.body ={
                    code :-1,
                    msg:'验证码已过期，请重新尝试'
                }
                return false
            }

        }else {
            ctx.body ={
                code:-1,
                msg:'请输入正确的验证码'
            };
            return false
        }

    }else{
        ctx.body ={
            code:-1,
            msg:'请填写验证码'
        }
        return
    }

    let user = await User.find({username});
    if(user.length){
        ctx.body= {
            code: -1,
            msg:'已被注册'
        };
        return
    }
    console.log(MD5(password))
    try{
        let nuser = await User.create({username,password:MD5(password),email})
        if(nuser){
            let res = await axios.post('/users/signin',{username,password:MD5(password)})
            if(res.data && res.data.code === 0){
                ctx.body = {
                    code: 0,
                    msg: '注册成功',
                    user: res.data.user
                }
            }else {
                ctx.body = {
                    code: -1,
                    msg: 'error'
                }
                console.log(res.data.msg);
            }
        }else {
            ctx.body={
                code:-1,
                msg:'注册失败'
            }
        }
    }catch (e) {
        console.log(e);
    }

});

router.post('/signin',async(ctx,next)=>{
    return Passport.authenticate('local',(err,user,info,status)=>{
        if(err){
            ctx.body = {
                code:-1,
                msg:err
            }
        }else{
            if(user){
                ctx.body = {
                    code:0,
                    msg:'登录成功',
                    user
                };
                return ctx.login(user)
            }else {
                ctx.body = {
                    code:1,
                    msg:info
                }
            }
        }
    })(ctx,next)
});
router.get('/getUser',async(ctx,next)=> {
    console.log('getUser');
    if(ctx.isAuthenticated()){
        const {username,email} = ctx.session.passport.user
        ctx.body = {
            user:username,
            email
        }
    }else {
        ctx.body={
            user:'',
            email:''
        }
        console.log('没有登录');
    }
})
export default router
