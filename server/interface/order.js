import Router from 'koa-router';
import Cart from '../dbs/models/cart'
import Order from '../dbs/models/Order'
import {MD5} from './utils/crypto'

const router = new Router({prefix:'/order'});

// 创建订单
/*
* @params id:购物车ID； count：数量
*
* */

router.post('/createOrder', async ctx=>{
    if(!ctx.isAuthenticated()){
        ctx.body = {
            code:-1,
            msg:'places LOGIN'
        }
    }else {
        const time = Date()
        const orderId =MD5(Math.random() * 1000 + time ).toString();

        const {count,id} = ctx.request.body;
        try{
            const cart = await Cart.findOne({id});
            console.log(cart);

            const order = new Order({
                time,
                id:orderId,
                total:cart.detail[0].price * count,
                imgs:cart.detail[0].img,
                name:cart.detail[0].name,
                user:ctx.session.passport.user,
                status:0,
                count
            })
            const result = await order.save()
            if(result){
                ctx.body={
                    code:0,
                    orderId
                }
            }else {
                ctx.body={
                    code:-1,
                    msg:'没有保存成功'
                }
            }

        }catch(e){
            console.log(e);
            ctx.body={
                code:-1,
                msg:'服务器繁忙请稍候重试'
            }
        }


    }

});

router.post('/getOrders',async ctx=>{
    if(!ctx.isAuthenticated()) {
        ctx.body = {
            code: 201,
            msg: 'places LOGIN',
            list:[],
            is_login:ctx.isAuthenticated()
        }
    }else{
      try{
          const user = ctx.session.passport.user
          const res = await Order.find({user})
          console.log(res);
          if(res){
              ctx.body={
                  code:0,
                  list:res
              }
          }
        }catch(e){
            console.log(e);
            ctx.body={
                code:-1,
                msg:'服务器繁忙'
            }
        }
    }
});
export default router
