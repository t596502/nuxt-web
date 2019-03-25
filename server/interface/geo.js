import Router from 'koa-router';
import axios from './utils/axios'
import Menu from '../dbs/models/Menu'
let router = new Router({prefix:'/geo'});
router.get('/getPosition',async(ctx,next)=>{

    ctx.body={
        status:200,
        city:'三亚'
    }
});


router.post('/getMenu',async (ctx,next)=>{
    try{
        const data = await Menu.findOne();
        ctx.body={
            code:200,
            menu:data.menu
        }
    }catch (e) {
        ctx.body={
            code:-1,
            msg:'服务器繁忙，请稍候重试'
        }
    }
});
export default router
