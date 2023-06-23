let pagina = 1;
const btnAnterior = document.getElementById('btnAnterior')
const btnSiguiente = document.getElementById('btnSiguiente')


//Agregando paginacion para en un futuro implementar un scroll infinito

btnSiguiente.addEventListener('click',() =>{

    if(pagina < 1000){
        pagina += 1
        cargarPeliculas()
    }

})

btnAnterior.addEventListener('click',() =>{

    if(pagina > 1){
        pagina -= 1
        cargarPeliculas()
    }

})

const cargarPeliculas = async () =>{
    //Cuando se utiliza Fetch se devuleve una promesa y se guarda en la variable "respuesta"
    //Se utiliza el "async" a la funcion cargar peliculas para que se pueda utilizar "await" en la variable respuesta.

    try{
        const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=81fb6232ac7290f277ecce790982b5a3&page=${pagina}`);

        console.log(respuesta);

        if(respuesta.status === 200){
                //json tambien es un metodo asincrono asi ue hay que agregarle await
            const datos =  await respuesta.json();
            let peliculas = '';
            //por cada pelicula se va a insertar dentro del elemento "contenedor" un h1 con el titulo de la pelicula

            datos.results.forEach(pelicula =>{
                peliculas = peliculas += 
                `
                <div class="pelicula">
                    <img class = "poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
                    <h3 class="titulo">${pelicula.title}</h3>
                </div>
                `
                console.log(pelicula.poster_path)
                
            });

            document.getElementById('contenedor').innerHTML = peliculas;

        } else if (respuesta.status === 401){
            console.log('la llave esta mala')
        } else if (respuesta.status === 404){
            console.log('la pelicula no existe')
        } else{
            console.log('hubo un error y asaber que es ')
        }

        
    }

    //Se captura el error con catch, solo se activara si la logica de try no se ejecuto correctamente.
    catch(error){
        console.log(error);
    }


}

cargarPeliculas();