
window.addEventListener('load', function(e){
    
    var imagen = document.querySelector('#gift');

    fetch('https://api.giphy.com/v1/gifs/search?api_key=5pZ8PAFyPU5zN4vH4Hajx3fZm3Oa9bbB&q=aplausos&limit=1&offset=0&rating=g&lang=es')
    .then(function(response){
        return response.json();
    })
    .then(function(resultado){
        console.log(resultado);
        resultado.data.forEach(gift => {
            imagen.innerHTML += "<img" + " src="+ gift.images.original.url +"alt=></img>"})
})
    .catch(function(error){
        console.log(error);
    })
})
