window.onload = function (e) {
 
    var stock = document.querySelectorAll('#stock');
    var pedido = document.querySelectorAll('#pedido');
    var neto = document.querySelectorAll('#neto');

    for (let i = 0; i < stock.length; i++) {
       neto[i].value = stock[i].value - pedido[i].value
        
    };


}