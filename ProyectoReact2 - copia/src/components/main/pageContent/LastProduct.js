import React, { Component } from 'react';

const url = 'http://localhost:3000/img/products/'

class LastProduct extends Component{
	constructor(props){
		super(props);
		this.state = {
			LastProduct : "Cargando"
		}
	}
	componentDidMount(){
		fetch('http://localhost:3000/api/productosUltimo')
		.then(response =>{
			return response.json();
		})
		.then(response=>{
			this.setState({LastProduct : response.data[0]});
		})
		.catch(function(error){console.log(error)})
	}

	render(){ 
		console.log(this.state.LastProduct);
    return (
        <div className="col-lg-6 mb-4">
		<div className="card shadow mb-4">
		  <div className="card-header py-3">
			<h6 className="m-0 font-weight-bold text-primary">
			  Last product in Data Dase
			</h6>
		  </div>
		  <div className="card-body">
			<div className="text-center">
			  <img
				className="img-fluid px-3 px-sm-4 mt-3 mb-4"
				style={{width: "25rem;"}}
				src={typeof(this.state.LastProduct.imagenes) =="undefined" ? "product_dummy.svg" : url + this.state.LastProduct.imagenes[0].path}
				alt="image dummy"
			  />
			</div>
			<p>
			  {this.state.LastProduct.nombre}
			</p>
			<p>
			  {this.state.LastProduct.descripcion} de {this.state.LastProduct.usuario}
			</p>
			<a target="_blank" rel="nofollow" href="/">
			  View product detail
			</a>
		  </div>
		</div>
	  </div>

  );
}}

export default LastProduct;