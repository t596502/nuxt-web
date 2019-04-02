import Router from 'koa-router';
import Cart from '../dbs/models/cart'
import {MD5} from './utils/crypto'
import Passport from './utils/passport'

const router = new Router({prefix:'/cart'});

router.post('/create',async ctx=>{

    if(!ctx.isAuthenticated()){
        ctx.body ={
            code:-1,
            msg:'please login!'
        }
    }else {
        const time = Date()
        const cartNo =MD5(Math.random() * 1000 + time ).toString()
        const {detail,id} = ctx.request.body;

        const cart = new Cart({
            id:cartNo,
            user:ctx.session.passport.user,
            detail:detail,
            time,
            cartNo
        });

        const result = await cart.save();
        if(result){
            ctx.body={
                code:0,
                cartNo
            }
        }else {
            ctx.body={
                code:-1,
                msg:'购物车没有加入成功'
            }
        }
    }

})

router.post('/getCart',async ctx=>{
    const id = ctx.request.body.id
    if(!id){
        ctx.body = {
            code: -1,
            msg:'缺少ID参数'
        }
    }
    if(!ctx.isAuthenticated()){
        ctx.body ={
            code:-1,
            msg:'please login!'
        }
    }else {
        try{
            const cart = await Cart.findOne({id})
            ctx.body={
                code:0,
                data:{detail: cart ? cart.detail[0] : {}}
            }
        }catch(e){
            console.log(e);
            ctx.body = {
                code: -1,
                data: {}
            }
        }
    }
    })
export default router
