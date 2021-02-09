const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

window.onload = function (e) {
    var totalCarrito = document.querySelector('#totalCarrito');

    var totales = document.querySelectorAll('#totalInput')

    var totalesArray=[];

    for (let i = 0; i < totales.length; i++) {
        totalesArray.push(parseFloat(totales[i].value));
        totalCarrito.innerHTML="Total : $ "+toThousand((totalesArray.reduce(function(a, b){ return a + b; })));
        
    }


}