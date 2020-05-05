const fs=require ('fs')
const path= require('path')

const productsFilePath=path.join(__dirname,'../data/productsDataBase.json');
const products=JSON.parse(fs.readFileSync(productsFilePath,'UTF-8'))

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

var controller={
producto:function(req,res,next){
    let producto=products.find(function(elemento){
        return elemento.id==req.params.id;
    });
   
    var title='Mercado Liebre |'+ producto.name
    res.render('detail',{
        producto:producto,
        title:title,
        miles:toThousand
    });
}

}
module.exports=controller