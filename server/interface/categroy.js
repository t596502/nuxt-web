import Router from 'koa-router';
import City from '../dbs/models/City'
import Categroy from "../dbs/models/categroy";

let router = new Router({prefix: '/categroy'})

router.post('/crumbs',async (ctx)=>{
    let result = await Categroy.findOne({city:ctx.request.body.city});
    console.log(result);
    if (result) {
      ctx.body = {
          code:0,
          areas: result.areas,
          types: result.types
      }
    } else {
      ctx.body = {
        areas: [],
        types: []
      }
    }

    // let {status,data:{areas,types}} = await axios.get('http://cp-tools.cn/categroy/crumbs',{
    //     params:{
    //         city:ctx.query.city.replace('市','') || "北京",
    //         sign
    //     }
    // })
    // ctx.body={
    //     areas: status===200?areas:[],
    //     types: status===200?types:[]
    // }
})


export default router;
