import React from 'react';
import propTypes from 'prop-types';

function ProductsDatabase(props) {
    return (
<div className="col-md-4 mb-4">
		<div className={props.borde}>
		  <div className="card-body">
			<div className="row no-gutters align-items-center">
			  <div className="col mr-2">
				<div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
				  {' '}
				  {props.tittle}
				</div>
				<div className="h5 mb-0 font-weight-bold text-gray-800">
				{props.cifra}
				</div>
			  </div>
			  <div className="col-auto">
				<i className={props.icono}></i>
			  </div>
			</div>
		  </div>
		</div>
	  </div>
  );
}
ProductsDatabase.propTypes ={
	tittle : propTypes.string.isRequired,
	borde : propTypes.string.isRequired,
	cifra : propTypes.oneOfType([
		propTypes.string.isRequired,
		propTypes.number.isRequired
	  ])
};
ProductsDatabase.defaultProps = {
	tittle : 'Agregar un Titulo',
	borde : 'card border-left-primary shadow h-100 py-2',
	cifra : 'Insertar un valor',
	icono : 'fas fa-clipboard-list fa-2x text-gray-300'
};

export default ProductsDatabase;