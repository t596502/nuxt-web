import Router from 'koa-router';
import axios from './utils/axios'
import Menu from '../dbs/models/users'
let router = new Router({prefix:'/geo'});
router.get('/getPosition',async(ctx,next)=>{

    ctx.body={
        status:200,
        city:'深圳'
    }
});


router.post('/getMenu',async (ctx,next)=>{
    try{
        const data = await Menu.findOne()
        console.log(data);
    }catch (e) {
        console.log(e);
    }
});
export default router
