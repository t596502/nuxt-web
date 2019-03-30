import Route from 'koa-router'
import Poi from '../dbs/models/poi'

const router = new Route({prefix: '/search'});

router.get('/top',async (ctx)=>{
    console.log(1);
    try{
        if(!ctx.query.city) {
            ctx.body={
                code:-1,
                msg:'请输入城市'
            };
            return
        }
        if(ctx.query.list){
            let list = await Poi.find();
            ctx.body={
                code:0,
                list
            }
        }else {
            let top = await Poi.find({'name':new RegExp(ctx.query.input), city:ctx.query.city}).limit(10);
            const newTop = top.map(item=>{
                return {
                    name:item.name,
                    type:item.type
                }
            });
            ctx.body={
                code:0,
                top:newTop
            }
        }

    }catch (e) {
        ctx.body={
            code:-1,
            top:'服务器繁忙，稍后重试'
        }
    }
})
router.get('/hotPlace', async (ctx, next) => {
    console.log(ctx.query);
    let city = ctx.store ? ctx.store.state.position.city : ctx.query.city
    try {
        const res = await Poi.find({city}).limit(10);
        ctx.body= {
            code: 0,
            result:res.map(item=> item.name)
        }
    } catch (e) {
        ctx.body= {
            code: -1,

            msg:'服务器繁忙'
        };
        console.log(e);
    }
});
export default router
