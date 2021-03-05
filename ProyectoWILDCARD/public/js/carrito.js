window.onload = function (e) {

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

var precioUnitario = document.querySelectorAll('#precioUnitario');
var cantidad = document.querySelectorAll('#cantidad');
var cantidadInicial = document.querySelectorAll('#cantidadInicial');
var precio = document.querySelectorAll('#precio');
var precioXCantidad = document.querySelectorAll('#precioXCantidad');
var confirmarCambio = document.querySelectorAll('#confirmarCambio');//ENLACE
var descartarCambio = document.querySelectorAll('#descartarCambio');//ENLACE
var btnConfirmar = document.querySelectorAll('i#confirmar');//BOTON
var btnComprar = document.querySelector('#comprar');//ENLACE
var error = document.querySelector('p#error')
var error1 = document.querySelector('p#error1')
var id =document.querySelectorAll('#idSel');
var idCarrito =document.querySelector('#idCarrito');

var subtotal = document.querySelector('#subtotal');
var total = document.querySelector('#total')


for (let i = 0; i < cantidad.length; i++) {
    if(cantidad[i].value <1){
        btnConfirmar[i].style.color = "red";
        confirmarCambio[i].href = "#"
        btnComprar.href = "#";
        error1.innerHTML = "(*)El pedido no puede ser menor a una unidad"
    }else{
    confirmarCambio[i].href = "/users/carrito/cantidad" + "/" + id[i].value + "/" + cantidad[i].value + "/";
    }

}
for (let i = 0; i < precioUnitario.length; i++) {
    cantidad[i].addEventListener('input', function(event){
        if(cantidad[i].value <1){
            btnConfirmar[i].style.color = "red";
            confirmarCambio[i].href = "#"
            btnComprar.href = "#";
            error.innerHTML = "(*)El pedido no puede ser menor a una unidad"
        }else{
    precio[i].innerHTML = "$ " +toThousand((precioUnitario[i].value) * (cantidad[i].value));
    precioXCantidad[i].value =( (precioUnitario[i].value) * (cantidad[i].value))
    confirmarCambio[i].href = "/users/carrito/cantidad" + "/" + id[i].value + "/" + cantidad[i].value;}
    
    if (cantidad[i].value != cantidadInicial[i].value){
        btnConfirmar[i].style.color = "red";
        btnComprar.href = "#";
        error.innerHTML = "(*)Confirmar o cancelar los cambios para finalizar pedido"
    }
    else{
            btnConfirmar[i].style.color = "black";
            btnComprar.href = "/users/carrito/comprar/" + idCarrito.value
        }

})
}
for (let i = 0; i < descartarCambio.length; i++) {
    descartarCambio[i].addEventListener('input', function(event){
        cantidad[i].value = cantidadInicial[i].value;
        btnConfirmar[i].style.color = "black";
    })
}

    
    for (let i = 0; i < cantidad.length; i++) {
        cantidad[i].addEventListener('change', function(event){
            var arrayPrecios= [];
            for (let j = 0; j < precioUnitario.length; j++) {
                arrayPrecios.push((precioUnitario[j].value)*(cantidad[j].value));
                
                subtotal.innerHTML= "$ " + toThousand(arrayPrecios.reduce(function(a, b){ return a + b; }));
                total.innerHTML = subtotal.innerHTML;   
            }       
        })
    }

}