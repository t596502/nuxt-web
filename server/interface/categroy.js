import Route from 'koa-router';
import Categroy from '../dbs/models/categroy'

const router = new Route({prefix:'/categroy'});

router.get('/crumbs',async(ctx)=>{
    const city = ctx.query.city || '大庆';
    console.log(city);
    let result = await Categroy.findOne({city:city});
    console.log(result);
    ctx.body={
        code:0,
        data:result
    }
});
export default router
