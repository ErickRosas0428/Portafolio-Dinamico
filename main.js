const grid =new Muuri('.grid',{
    layout: {
      rounding: false,
    },
});

//Listener agregados para filtrar las categorias
window.addEventListener('load', () => {
    grid.refreshItems().layout();
    document.getElementById('grid').classList.add('imagenes-cargadas');
    ///Animacion de texto para mostrar la seleccion en negritas
    const enlaces = document.querySelectorAll('#categorias a');
    enlaces.forEach( (elemento) => { 
      elemento.addEventListener('click', (evento) => {
        evento.preventDefault();
        enlaces.forEach((enlace) => enlace.classList.remove('activo'));
        evento.target.classList.add('activo');
        //Seleccion y Filtrado de las Categorias
        const categoria = evento.target.innerHTML.toLowerCase();
        categoria === 'todos' ? grid.filter('[data-categoria]') : grid.filter(`[data-categoria="${categoria}"]`);
      });
    } );

    //Listenner para barra de busqueda
    document.querySelector('#barra-busqueda').addEventListener('input', (evento) => {
      const busqueda = evento.target.value;
      grid.filter( (item) => item.getElement().dataset.etiquetas.includes(busqueda) );
    });

    //Listenner para las imagenes del documento
    const overlay = document.getElementById('overlay');
    document.querySelectorAll('.grid .item img').forEach((elemento) => {

      //Seleccion de Imagenes  y busqueda de ruta
      elemento.addEventListener('click', () =>{
        const ruta = elemento.getAttribute('src');
        const descripcion = elemento.parentNode.parentNode.dataset.descripcion;

        overlay.classList.add('activo')
        document.querySelector('#overlay img').src = ruta;
        document.querySelector('#overlay .descripcion').innerHTML = descripcion;
      });
    });

    //Evenlistenner del boton cerrar
    document.querySelector('#btn-cerrar-popup').addEventListener('click', ()=> {
      overlay.classList.remove('activo');
    });
});