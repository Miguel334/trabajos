const fs=require ('fs')
const path= require('path')

const productsFilePath=path.join(__dirname,'../data/productsDataBase.json');
const products=JSON.parse(fs.readFileSync(productsFilePath,'UTF-8'))

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
var controller={
index:  function(req, res, next) {
    let ofertas=products.filter(function(elemento){
        return elemento.category=='in-sale'
    })

    let visitados=products.filter(function(elemento){
        return elemento.category=='visited'
    })
    res.render('index',{
        visitados:visitados,
        ofertas:ofertas,
        title:'Mercado Liebre Argentina',
        miles:toThousand
    });
  }
}
module.exports=controller