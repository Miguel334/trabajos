const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	root: (req, res) => {
		let visitados=products.filter(function(elemento){
		 return elemento.category=='visited'});
		 let ofertas=products.filter(function(elemento){
			return elemento.category=='in-sale'});
			
		res.render('index',{
			visitados:visitados,
			ofertas:ofertas,
			miles:toThousand
		})
	},
	search: (req, res) => {
		res.render('results')
	},
};

module.exports = controller;
