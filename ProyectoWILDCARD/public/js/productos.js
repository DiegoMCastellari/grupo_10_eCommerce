window.onload = function (e) {
    var filtro = document.querySelector('form.formfiltro');
    var verFiltros = document.querySelector('button#verFiltros');

    console.log(filtro.style);
    verFiltros.addEventListener('click', function(event){
        if(filtro.style.display != "flex"){
        filtro.style.display = "flex";
        verFiltros.innerHTML="Ocultar Filtros"}
        else{
            filtro.style.display = "none";
            verFiltros.innerHTML="Ver Filtros"
        }
    })
}