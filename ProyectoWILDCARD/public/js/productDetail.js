window.onload = function () {

    const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    var formulario = document.querySelector('#formulario');

    var precio = document.querySelector('#inputPrecio');
    var cantidad = document.querySelector('#inputCantidad');
    var subtotal = document.querySelector('#subtotal');

    var imagenSelect = document.querySelector('#imagenSelect');
    var listadoImagenes = document.querySelectorAll('#listadoImagenes')

   cantidad.addEventListener('input', function(event){
       subtotal.innerHTML ="Subtotal: $"+  toThousand (cantidad.value*precio.value)
   })

    var talles = document.querySelectorAll('input#talle');
    var colores = document.querySelectorAll('input#color');

    var isCheckedTalles = [];
    var isCheckedColores = [];

    formulario.addEventListener('submit', function(event){

        //TALLES

        for(i =0; i < talles.length; i++){//COMPROBAR SI ESTA SELECCIONADO TALLE
            if(talles[i].checked){
                isCheckedTalles.push(1) //SI ESTA SELECCIONADO SE AGREGA A PUSH EL 1
            }}
            if(isCheckedTalles.length==0){//SE PREGUNTA SI EL LARGO ES IGUAL A CERO
                event.preventDefault();
                var tallesError = document.querySelector('#tallesError');
                tallesError.innerHTML = "<li>" + "Seleccione un talle." + "</li>";
            }
            else{
                var tallesError = document.querySelector('#tallesError');
                tallesError.innerHTML = "";}
            console.log(isCheckedTalles);
        

        //COLORES

        for(i =0; i < colores.length; i++){//COMPROBAR SI ESTA SELECCIONADO COLOR
            if(colores[i].checked){
                isCheckedColores.push(1) //SI ESTA SELECCIONADO SE AGREGA A PUSH EL 1
            }}
            if(isCheckedColores.length==0){//SE PREGUNTA SI EL LARGO ES IGUAL A CERO
                event.preventDefault();
                var coloresError = document.querySelector('#coloresError');
                coloresError.innerHTML = "<li>" + "Seleccione un color." + "</li>";
            }
            else{
                var coloresError = document.querySelector('#coloresError');
                coloresError.innerHTML = "";}
            console.log(isCheckedColores);

    })
        //IMAGENES
        listadoImagenes.forEach(imagen => {
            imagen.addEventListener('click', function(event){
                imagenSelect.setAttribute('src', imagen.src)
            })
            
        });


}