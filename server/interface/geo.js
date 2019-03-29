import Router from 'koa-router';
import axios from './utils/axios'
import Menu from '../dbs/models/Menu'
import Province from '../dbs/models/province'
import City from '../dbs/models/City'

let router = new Router({prefix:'/geo'});
router.get('/getPosition',async(ctx,next)=>{

    ctx.body={
        status:200,
        city:'三亚'
    }
});

router.get('/province',async (ctx)=>{
    try{
        const result = await Province.find();
        ctx.body={
            code: 0,
            province:result.map(item=>{
                return{
                    id:item.id,
                    name:item.value[0]
                }
            })
        }
    }catch(e){
        console.log(e);
        ctx.body={
            code:-1,
            msg:'服务器繁忙，请稍候重试'
        }
    }
});
router.get('/province/:id',async (ctx)=>{
    const id = ctx.params.id;
    try{
        if(!id) {
            ctx.body={
                code:-1,
                msg:'没有传入ID'
            };
            return
        }
        const result = await City.findOne({id});
        ctx.body={
            code: 0,
            city:result.value.map(item => {
                return{
                    province:item.province,
                    id:item.id,
                    name:item.name
                }
            })
        }
    }catch(e){
        console.log(e);
        ctx.body={
            code:-1,
            msg:'服务器繁忙，请稍候重试'
        }
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
router.get('/hotCity', async (ctx) => {
    let list = [
      '北京市',
      '上海市',
      '广州市',
      '深圳市',
      '天津市',
      '西安市',
      '杭州市',
      '南京市',
      '武汉市',
      '成都市'
    ]
    let result = await City.find()
    let nList = []
    result.forEach(item => {
      nList = nList.concat(item.value.filter(k => list.includes(k.name) || list.includes(k.province)))
    })
    ctx.body = {
      hots: nList
    }
});
router.get('/city',async (ctx)=>{
    try{
        let city = []
        const result = await City.find({},['value']);
        result.forEach(item=>{
            city = city.concat(item.value)
        })
        city.forEach(item=>{
            if(item.name == '市辖区' || item.name == '省直辖县级行政区划'){
                item.name = item.province
            }
        });
        ctx.body={
            code: 0,
            city
        }
    }catch(e){
        console.log(e);
        ctx.body={
            code:-1,
            msg:'服务器繁忙，请稍候重试'
        }
    }
});
export default router
