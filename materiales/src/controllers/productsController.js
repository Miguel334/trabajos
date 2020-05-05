const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	root: (req, res) => {
		res.render('products',{
			productos:products,
			miles:toThousand
		})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		let producto=products.find(function(elem){
			return elem.id==req.params.productId;
		})
		console.log(producto)
		res.render('detail',{
			miles:toThousand,
			producto:producto

		})
	},

	// Create - Form to create
	create: (req, res) => {
		res.render('product-create-form')
	},
	
	// Create -  Method to store
	store: (req, res) => {
		let ultimo=products[products.length-1]
		let nuevoProducto={
			id: ultimo.id+1,
			name: req.body.name,
			description:req.body.description ,
			price:req.body.price ,
			discount:req.body.discount ,
			category:req.body.category
		}
		products.push(nuevoProducto)
		let modificacion= JSON.stringify(products)
		fs.writeFileSync(productsFilePath,modificacion)

		res.redirect('/');
	},

	// Update - Form to edit
	edit: (req, res) => {
		let producto=products.find(function(elemento){
			return elemento.id==req.params.productId
		})
		
		res.render('product-edit-form',{
			productToEdit:producto,
			
		})
	},
	// Update - Method to update
	update: (req, res) => {
		let subir=products
		subir.forEach(elemento=>{
			if(req.params.productId==elemento.id){
				
    			elemento.name=req.body.name ,
     			elemento.price=req.body.price ,
     			elemento.discount= req.body.discount,
	 			elemento.category=req.body.category ,
	 			elemento.description=req.body.description
	    
			}
		})
		subir=JSON.stringify(subir);
		fs.writeFileSync(productsFilePath,subir)
		res.redirect('/');
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		let nuevoJSON= products.filter(function(elemento){
			return elemento.id != req.params.productId;
		})
		console.log(nuevoJSON);
		let string= JSON.stringify(nuevoJSON);
		fs.writeFileSync(productsFilePath,string);
		res.redirect('/');
	}
};

module.exports = controller;