import React from 'react';
import './colores.css';
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

function Tbody(props) {
    return (
    <tbody>
		<tr>
			<td>{props.name}</td>
			<td>{props.description}</td>
			<td>$ {toThousand(props.price)}</td>
			<td>
				<ul>
				<li>{props.categories}</li>
				</ul>
			</td>
			<td>
				<ul>
				{props.colors.map((property, i) =>
				<li   key={i+property+1}><span   key={i+property} className={property.nombre}>{property.nombre}</span></li>
				)}
				</ul>
			</td>
			<td>{props.user}</td>
		</tr>
	</tbody>
     );
    }
    
    export default Tbody;