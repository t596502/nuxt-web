const crypto=require('crypto');
export const MD5 = (str)=>{
    if(!str) console.log('没有str内容！');
    let obj=crypto.createHash('md5');
    obj.update(str);

    return obj.digest('hex');
}
