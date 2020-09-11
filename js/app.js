// Elementos input con información de libro Nuevo
const autor = document.getElementById('inputAutor')
const titulo = document.getElementById('inputTitulo')
const tabla = document.getElementById('tbody')
const inputBuscar = document.getElementById('inputBuscar')

//const patern = /^[a-zA-Z0-9]{3,20}$/;
///^[a-zA-ZÁ-ÿ0-9\s]{3,20}$/;
const patern = /^[a-zA-ZÁ-ÿ0-9\s]{3,100}$/;

const libro = new Libro()

EventListener();
//let id = 0;
let ultimoId = Number(LocalStorageOperation.ultimoId());
ultimoId++;
PrepararDom();

function EventListener() {
    document.getElementById('btnAdd').addEventListener('click', PrepararLibro);
    tabla.addEventListener('click', Acciones);
    document.getElementById('btnVaciar').addEventListener('click', vaciarLibreria);
    document.getElementById('btnBuscar').addEventListener('click', BuscarLibro);

}

function PrepararLibro() {
    //    console.log(ultimoId);
    if ((autor.value != '' && titulo.value != '') && (patern.test(autor.value) && patern.test(titulo.value))) {
        //libro.agregar([autor.value, titulo.value])
        const infoLibro = {
            //Dos puntos hacen la asignacion de =
            //id: id++,
            id: ultimoId,
            titulo: titulo.value.trim(),
            autor: autor.value.trim()

        }

        let validarNuevosDatos = LocalStorageOperation.ValidarTituloAutor(infoLibro.titulo.trim().toLowerCase(), infoLibro.autor.trim().toLowerCase());
        if (validarNuevosDatos == 0) {
            //let tr = libro.agregar([autor.value, titulo.value])
            let tr = libro.agregar(infoLibro)
                //console.log(tr);            
            tabla.appendChild(tr);
            LocalStorageOperation.almacenarLibro(infoLibro);

            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Se ha agregado el libro',
                showConfirmButton: false,
                timer: 1000
            })
            autor.value = '';
            titulo.value = '';
        } else {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Intente de nuevo, ya que los datos del libro previamente ingresados, ya existen.',
                showConfirmButton: false,
                timer: 1500
            })
        }
    } else {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Datos no válidos',
            showConfirmButton: false,
            timer: 1000
        })
    }


}

function Acciones(event) {
    //console.log(event.target.tagName);
    if (event.target.tagName === 'I' || event.target.tagName === 'BUTTON') {

        // libro.eliminar(event.target.tagName)
        // Filtrar botones editar y eliminar
        if (event.target.className.includes("btn-warning") || event.target.className.includes("fa-trash")) {
            libro.eliminar(event.target);
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Se elimino el libro',
                showConfirmButton: false,
                timer: 1000
            })
        }
    }
}

//Renderizar los elementos en LS (localStorage)
function PrepararDom() {
    const librosLS = LocalStorageOperation.ObtenerLS()
        //console.log(librosLS)
    console.log(librosLS.length);
    for (let i = 0; i < librosLS.length; i++) {
        const instanciaLibro = new Libro()
            //instanciaLibro.agregar(librosLS);
        console.log(librosLS[i]);
        //let tr = libro.agregar(librosLS[i]);
        // tabla.appendChild(tr);
        tabla.appendChild(instanciaLibro.agregar(librosLS[i]));
    }
}


//Eliminar todos los elementos de la tabla. 
function vaciarLibreria() {
    console.log(tabla.firstChild);
    while (tabla.firstChild) {
        tabla.firstChild.remove();
    }

    //Eliminar LocalStorage
    LocalStorageOperation.BorrarStorage();
}

//Realizar busqueda del libro
function BuscarLibro(event) {
    event.preventDefault()
        //Validar que el input tenga texto
    if (inputBuscar.value != '') {
        //Cuando la busqueda genera resultados se imprime una alerta con dichos resultados
        let resultado = LocalStorageOperation.BuscarTitulo(inputBuscar.value.trim().toLowerCase())
        console.log(resultado);
        if (resultado != '') {
            Swal.fire(
                    'Busqueda exitosa',
                    `El libro con titulo ${resultado.titulo} tiene el id ${resultado.id} y fue escrito por ${resultado.autor}`,
                    'success'
                )
                //Cuando la busqueda no genera resultados se imprime una '' (string vacio) y una alerta de error
        } else {
            Swal.fire(
                'Sin Resultados',
                `No existe el libro con titulo ${inputBuscar.value}`,
                'error'
            )
        }
    }
    inputBuscar.value = ''
}
