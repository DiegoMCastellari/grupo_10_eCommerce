import React, { Component } from 'react'


class Category01 extends Component {
  constructor(props){
		super(props);
		this.state = {
			name : this.props.name,
      className : "card bg-info text-white shadow"
		}
  }
  cambiarColor(){
    this.state.className == "card bg-info text-white shadow"? this.setState({className : "card bg-info2 text-white shadow"}):this.setState({className : "card bg-info text-white shadow"})
  }
    render(){
    return (			 
         <div className="col-lg-6 mb-4">
    <div onClick={()=>this.cambiarColor()}  on className= {this.state.className} >
      <div className="card-body">{this.state.name}</div>
    </div>
  </div>
  )}};

export default Category01;