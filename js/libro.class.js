class Libro {
    //propiedades
    id = 0
    autor = '';
    titulo = '';

    agregar(infoLibro) {
        //console.log(array)
        //  this.autor = array[0]
        //  this.titulo = array[1]
        // this.id++
        this.autor = infoLibro.autor
        this.titulo = infoLibro.titulo
        this.id = infoLibro.id
            // console.log(this.id, this.autor, this.titulo)
        const tr = document.createElement("tr");
        tr.setAttribute('id', `${this.id}`)
        tr.innerHTML = `<th scope="row">${this.id}</th>
                            <td>${this.titulo}</td>
                            <td>${this.autor}</td>
                            <td>
                                <div class="btn-group" role="" aria-label="Basic example">
                                    <button id="editar${this.id}" type="button" class="btn btn-outline-warning">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button id="eliminar${this.id}" type="button" class="btn btn-outline-danger">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </div>
                            </td>`
            //LocalStorageOperation.almacenarLibro(infoLibro);
        return tr;
    }

    eliminar(element) {
        // Element solo puede tomar dos valores ('I', 'BUTTON')
        if (element.tagName === 'I') {
            element.parentElement.parentElement.parentElement.parentElement.remove();
            LocalStorageOperation.BorrarLibro(element.parentElement.parentElement.parentElement.parentElement.id);

        } else {
            element.parentElement.parentElement.parentElement.remove();
            LocalStorageOperation.BorrarLibro(element.parentElement.parentElement.parentElement.id);
        }
    }
}