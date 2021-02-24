import React, { Component } from 'react';
import ProductsDatabase from './pageContent/ProductsDatabase'
import LastProduct from './pageContent/LastProduct'
import CategoriesContainer from './pageContent/CategoriesContainer'
import Tbody from './pageContent/Tbody'

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

var productos;
var properties = [
{ 
tittle :'PRODUCTS IN DATABASE',
cifra : '0',
borde : 'card border-left-primary shadow h-100 py-2',
icono:'fas fa-clipboard-list fa-2x text-gray-300'
},
{
tittle : 'AMOUNT IN PRODUCTS',
cifra : '0',
borde : 'card border-left-success shadow h-100 py-2',
icono :'fas fa-dollar-sign fa-2x text-gray-300'
},
{
tittle : 'USERS QUANTITY',
cifra : '0',
borde : 'card border-left-warning shadow h-100 py-2',
icono :'fas fa-user-check fa-2x text-gray-300'
}];

var tableProperties = [{
	nombre : '',
	descripcion : '',
	precio : '',
	categorias : ['Category 01', 'Category 02', 'Category 03'],
	colores : [{className : 'text-danger',
				colorName : 'Red'},
				{className : 'text-primary',
				colorName : 'Blue'},
				{className : 'text-success',
				colorName : 'Green'},],
	stock : 245
}];


class PageContent extends Component {
	constructor(){
		super();
		this.state = {
			users : "",
			products : "",
			productsPrice : "",
			allProducts : []
		}
	}
	componentDidMount(){
		fetch('http://localhost:3000/api/users')
		.then(response =>{
			return response.json();
		})
		.then(response=>{
			this.setState({users : response.meta.total});
		})
		.then(fetch('http://localhost:3000/api/productos')
		.then(res =>{
			return res.json();
		})
		.then(res=>{
			this.setState({products : res.meta.total, 
					productsPrice :  res.meta.totalPrice,
				allProducts : res.data})
		})
		.catch(function(error){console.log(error)})
		)}

	
    render(){
		tableProperties = this.state.allProducts;
		console.log(productos);
		properties[2].cifra = this.state.users;
		properties[0].cifra = this.state.products;
		properties[1].cifra = "$ " + toThousand(this.state.productsPrice);
		return (
		<div className="container-fluid">
	<div className="d-sm-flex align-items-center justify-content-between mb-4">
	  <h1 className="h3 mb-0 text-gray-800">App Dashboard</h1>
	</div>

	<div className="row">
	{properties.map((property, i) =>
        <ProductsDatabase key={i}
                  tittle={property.tittle}
				  cifra ={property.cifra}
				  borde ={property.borde}
				  icono ={property.icono} />
      )}
	</div>

	<div className="row">
	  <LastProduct/>
	  <CategoriesContainer/>

	
	</div>
	<h1 className="h3 mb-2 text-gray-800">All the products in the Database</h1>
	<div className="card shadow mb-4">
						<div className="card-body">
							<div className="table-responsive">
								<table className="table table-bordered" id="dataTable" width="100%" cellspacing="0">
									<thead>
										<tr>
											<th>Name</th>
											<th>Description</th>
											<th>Price</th>
											<th>Categories</th>
											<th>Colors</th>
											<th>User</th>
										</tr>
									</thead>
									<tfoot>
										<tr>
											<th>Name</th>
											<th>Description</th>
											<th>Price</th>
											<th>Categories</th>
											<th>Colors</th>
											<th>User</th>
										</tr>
									</tfoot>
									{tableProperties.map((property, i) =>
									<Tbody key={i+property.nombre}
									name ={property.nombre}
									description={property.descripcion}
									price={property.precio}
									categories={property.categorias.nombre}
									colors={property.colores}
									user={property.usuario}
									/>      )}
								</table>
							</div>
						</div>
					</div>
  </div>
  );
}}

export default PageContent;