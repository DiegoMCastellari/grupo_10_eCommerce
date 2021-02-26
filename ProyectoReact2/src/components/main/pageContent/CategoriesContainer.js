
import React, { Component } from 'react';

import Category01 from './CategoriesContainer/Category01'

var categoriesName=["cargando"];

class CategoriesContainer extends Component{
	constructor(props){
		super(props);
		this.state = {
			categoriesName : []
		}
	}
	componentDidMount(){
		fetch('http://localhost:3000/api/categories')
		.then(response =>{
			return response.json();
		})
		.then(response=>{
			this.setState({categoriesName : ((response.data).map((categories)=> categories.nombre))});
		})
		.catch(function(error){console.log(error)})
	}

render(){ 
	categoriesName = this.state.categoriesName;
    return (
        <div className="col-lg-6 mb-4">
		<div className="card shadow mb-4">
		  <div className="card-header py-3">
			<h6 className="m-0 font-weight-bold text-primary">
			  Categories in Data Base
			</h6>
		  </div>
		  <div className="card-body">
			<div className="row">
				{categoriesName.map((category)=>
				<Category01
				name = {category}  />)}
			</div>
		  </div>
		</div>
	  </div>

  )}};


export default CategoriesContainer;