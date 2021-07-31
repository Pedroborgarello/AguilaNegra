  
class Productos {
    constructor (bebida, precio, litros, id){
        this.bebida = bebida;
        this.precio = precio;
        this.litros = litros;
        this.id = id;
    }
    info() {
        return `
            Bebida: ${this.bebida} 
            Precio: ${this.precio} 
            Litros: ${this.litros}
        `
    }
}

let producto1 = new Productos("absolut", 1600, "1750ml", 1);
let producto2 = new Productos("bombay", 2200, "750ml", 2);
let producto3 = new Productos("jagermeister", 2500, "700ml", 3);
let producto4 = new Productos("jackDaniels", 4100, "750ml", 4);
let producto5 = new Productos("sky", 600, "750ml", 5);
let producto6 = new Productos("smirnoff", 500, "750ml", 6);
let producto7 = new Productos("fernet", 800, "1l", 7);
let producto8 = new Productos("gancia", 300, "950ml", 8);
let producto9 = new Productos("cerveza", 150, "1l", 9);

const carrito = [producto1, producto2, producto3, producto4, producto5, producto6, producto7, producto8, producto9];

let edad = 0;
let nombre;
let apellido;
let modalForm = document.querySelector('.modal-footer');
const divEdad = document.querySelector('#mayorEdad');
const divNombre = document.querySelector('#nombreOk');
const divApellido = document.querySelector('#apellidoOk');

$('.modal').modal('show');

$("#edad").change(function edadOk() {
    edad = $("#edad").val();
    console.log(edad);
    if (edad >= 18) {
        divEdad.innerHTML = ' ';
    } else {
        divEdad.innerHTML = ' ';
        $("#mayorEdad").prepend('<p class="mayorEdad">Debe ser mayor de edad</p>');
    }
});

$("#nombre").change(function nombreOk() {
    nombre = $("#nombre").val();
    console.log(nombre);
    if(nombre != "") {
        divNombre.innerHTML = ' ';
    } else {
        divNombre.innerHTML = ' ';
        $("#nombreOk").prepend('<p class="mayorEdad">Campo obligatorio</p>');
    }
});

$("#apellido").change(function apellidoOk() {
    apellido = $("#apellido").val();
    console.log(apellido);
    if (apellido != "") {
        divApellido.innerHTML = ' ';
    } else {
        divApellido.innerHTML = ' ';
        $("#apellidoOk").prepend('<p class="mayorEdad">Campo obligatorio</p>');
    }
});

$(modalForm).click(validarUsuario);

function validarUsuario(e) {
    e.preventDefault();
    
    if (e.target.classList.contains("btContinuar")) {
        
        if ((edad >= 18) && (nombre != undefined) && (apellido != undefined) ){
            
            $('.modal').modal('hide');
            $(".saludo").prepend(`<p class="msjSaludo" style="display: none" >¡Bienvenido ${apellido}, ${nombre}!</p>`);
            $(".msjSaludo").slideDown(2000)
                           .delay(500)
                           .animate({
                                fontSize: "50px",
                                fontWeight: 700,
                                margin: 0,
                                height: "50px"
                           }, 3000);
        } else {
            divEdad.innerHTML = ' ';
            divNombre.innerHTML = ' ';
            divApellido.innerHTML = ' ';
            $("#mayorEdad").prepend('<p class="mayorEdad">Debe ser mayor de edad</p>');
            $("#nombreOk").prepend('<p class="mayorEdad">Campo obligatorio</p>');
            $("#apellidoOk").prepend('<p class="mayorEdad">Campo obligatorio</p>');
        } 
    }
}
const divPreciofinal = document.querySelector('.precioFinal');
let resultPorMayor = 0;
let valorTotal = 0;
let cantidad = 0;
let calculo = 0;

$(document).ready(function() {
    $("select.selectVal").change(function() {
        let selectedItem = $(this).children("option:selected").val();
        const item = carrito.find(producto => producto.bebida == selectedItem);
            
        valorTotal = item.precio;
    });
    
    $("#cantidad").change(function cantidadPorMayor() {
        cantidad = $('#cantidad').val();
        calculo = valorTotal * cantidad;
    });

    $("#formPorMayor").click(resultadoFinal);

    function resultadoFinal(e) {
        e.preventDefault();
    
        if (e.target.classList.contains("btnForm")) {
            if (cantidad <= 4) {
                resultPorMayor = calculo;
                divPreciofinal.innerHTML = ' ';
                $("#precioFinal").prepend(`<p class="resultadoFinal">$${parseInt(resultPorMayor)}</p>`);
            } else if (cantidad >= 5 && cantidad <= 9) {
                resultPorMayor = calculo / 1.0526;
                divPreciofinal.innerHTML = ' ';
                $("#precioFinal").prepend(`<p class="resultadoFinal">$${parseInt(resultPorMayor)}</p>`);
            } else if (cantidad >= 10 && cantidad <= 19) {
                resultPorMayor = calculo / 1.1111;
                divPreciofinal.innerHTML = ' ';
                $("#precioFinal").prepend(`<p class="resultadoFinal">$${parseInt(resultPorMayor)}</p>`);
            } else {
                resultPorMayor = calculo / 1.25;
                divPreciofinal.innerHTML = ' ';
                $("#precioFinal").prepend(`<p class="resultadoFinal">$${parseInt(resultPorMayor)}</p>`);
            }
        }
    }
});



const divProductos = document.querySelector('.productos');
const listaNav = document.querySelector('.listaNav4');
const listaCarrito = document.querySelector('.tablaCarrito tbody');
const btVaciarCarrito = document.querySelector('#vaciarCarrito');
const btComprarCarrito = document.querySelector('#comprarCarrito');
const pCarrito = document.querySelector('.precioTotal');
const animacion = document.querySelector('#imgCarrito');
let carritoProducto = [];
let precioTotal = 0;
let precioTotal1 = 0;
let resultTotal = 0;
let aumentoNotifi = 0;



$(divProductos).click(agregarProducto);
$(listaCarrito).click(borrarProductos);
$(listaCarrito).click(restarCarrito);
$(listaCarrito).click(sumarCarrito);
$(btVaciarCarrito).click(vaciarCarrito);
$(btComprarCarrito).click(comprarCarrito);

document.addEventListener('DOMContentLoaded', () => {
    
    if (JSON.parse(localStorage.getItem('carritoProducto'))) {
        
        carritoProducto = JSON.parse(localStorage.getItem('carritoProducto'));
        aumentoNotifi = JSON.parse(localStorage.getItem('aumentoNotifi'));
    }
    
    $.ajax({
        url: "js/productos.json",
        dataType: 'json',
        success: function(prod, status, jqXHR) {
            crearListaDeProductos(prod);
            
        },
        error: function(jqXHR, status, error) {
            console.log(jqXHR);
            console.log(status);
            console.log(error);
        }
    });

    if(aumentoNotifi > 0) {
        listaNav.innerHTML = `<img src="images/carrito-nav.png" alt="carrito"><span class="notifiCarrito">${aumentoNotifi + 1}</span>`;
    }
    crearCarritoHtml();
});

function crearListaDeProductos(productos) {
    divProductos.innerHTML = ' ';
    productos.forEach(producto => {
        const {imagen, nombre, litros, precio, id} = producto;

        $(".productos").append(
            `
                <div class="bebida">
                    <img class="imgBebida" src="${imagen}" alt="absolut">
                    <div class="datos">
                        <p class="nombreBebida">${nombre}</p>
                        <p>${litros}</p>
                        <div class="divPrecio">
                            <span class="spanPrecio">$</span><p class="precio">${precio}</p>
                        </div>
                        <a class="agregarCarrito" data-id="${id}" href="#">agregar</a>
                    </div>
                </div>
            `
        );
    });
}

function vaciarCarrito(e) {
    e.preventDefault();
    carritoProducto = [];
    aumentoNotifi = 0;
    listaNav.innerHTML = '<img src="images/carrito-nav.png" alt="carrito">';
    crearCarritoHtml();
    guardarCarrito();
}

function comprarCarrito(e) {
    e.preventDefault();
    carritoProducto = [];
    aumentoNotifi = 0;
    listaNav.innerHTML = '<img src="images/carrito-nav.png" alt="carrito">';
    crearCarritoHtml();
    animacion.classList.add('activarCarrito');
    setTimeout(() => {
        animacion.classList.remove('activarCarrito');
    }, 1500);
    guardarCarrito();
}

function borrarProductos(e) {
    e.preventDefault();

    if (e.target.classList.contains("eliminarProducto")) {
        const bodyCarrito = e.target.parentElement.parentElement;
        const borrarId = e.target.getAttribute('data-id');
        let cantidad =  bodyCarrito.children[3].children[1].textContent;
        
        if(aumentoNotifi > 0) {
            aumentoNotifi -= Number(cantidad);
            listaNav.innerHTML = `<img src="images/carrito-nav.png" alt="carrito"><span class="notifiCarrito">${aumentoNotifi}</span>`;
            if (aumentoNotifi <= 0){
                listaNav.innerHTML = '<img src="images/carrito-nav.png" alt="carrito">';
            }
        } 
        
        bodyCarrito.remove();
        
        carritoProducto = carritoProducto.filter(producto => producto.id !== borrarId);
        
        guardarCarrito();
    }
    precioTotal1 = carritoProducto.map(producto => Number(producto.precio));
    precioTotal = precioTotal1.reduce((a, b) => a + b, 0);

    pCarrito.innerHTML = '<p class="pValorTotal">valor total:</p>';
    sumaTotal();
}

function agregarProducto(e) {
    e.preventDefault();
    
    if(e.target.classList.contains("agregarCarrito")){
        const divBebida = e.target.parentElement.parentElement;
        obtenerProducto(divBebida);

        aumentoNotifi++
        listaNav.innerHTML = `<img src="images/carrito-nav.png" alt="carrito"><span class="notifiCarrito">${aumentoNotifi}</span>`;
    }

}

function obtenerProducto(divBebida) {
    
    const productoAgregado = {
        imagen: divBebida.querySelector('img').src,
        nombre: divBebida.querySelector('.nombreBebida').textContent,
        precio: divBebida.querySelector('.precio').textContent,
        cantidad: 1,
        id: divBebida.querySelector('a').getAttribute('data-id')
    }
    
    const existe = carritoProducto.some( producto => producto.id === productoAgregado.id )
    
    if(existe){
        const productos = carritoProducto.map(producto => {
            if(producto.id === productoAgregado.id){
                producto.cantidad++;
                if (producto.cantidad <= 4) {
                    resultTotal = producto.cantidad;

                } else if (producto.cantidad >= 5 && producto.cantidad <= 9) {
                    resultTotal = producto.cantidad / 1.0526;

                } else if (producto.cantidad >= 10 && producto.cantidad <= 19) {
                    resultTotal = producto.cantidad / 1.1111;

                } else {
                    resultTotal = producto.cantidad / 1.25;

                }
                producto.precio = `${parseInt(productoAgregado.precio.slice(0) * resultTotal)}`
                
                return producto;
            } else{
                return producto;
            }
        });
        carritoProducto = productos;
    } else {
        carritoProducto.push(productoAgregado);
    }

    guardarCarrito();
    crearCarritoHtml();
}

function crearCarritoHtml() {
    borrarProductoHtml();
    borrarValorTotal();
    
    carritoProducto.forEach(producto =>{
        const fila = document.createElement('tr');
        fila.innerHTML = `
        <td>
            <img src="${producto.imagen}" width=40>
        </td>
        <td class="nombreBebidaCarrito">${producto.nombre}</td>
        <td class="precioCarrito">$${producto.precio}</td>
        <td class="filaCantidad"><span class="menos">-</span><span class="valorCantidad">${producto.cantidad}</span><span class="mas">+</span></td>
        <td>
            <a href="#" class="eliminarProducto" data-id="${producto.id}">X</a>
        </td>
        `
        listaCarrito.appendChild(fila);
        
        precioTotal += Number(producto.precio);
        
    });
    
    sumaTotal();
}

function sumaTotal() {

    const span = document.createElement('span');
    span.innerHTML = `$${precioTotal}`;

    pCarrito.appendChild(span);
}

function borrarValorTotal() {
    precioTotal = 0;
    pCarrito.innerHTML = '<p class="pValorTotal">valor total:</p>';
}

function restarCarrito(e) {
    
    if (e.target.classList.contains("menos")) {
        const bodyCarrito = e.target.parentElement.parentElement;
        
        restarCantidad(bodyCarrito);

    }
}

function restarCantidad(bodyCarrito) {

    const productoMod = {
        imagen: bodyCarrito.querySelector('img').src,
        nombre: bodyCarrito.querySelector('.nombreBebidaCarrito').textContent, 
        precio: bodyCarrito.querySelector('.precioCarrito').textContent,
        cantidad: bodyCarrito.querySelector('.valorCantidad').textContent,
        id: bodyCarrito.querySelector('a').getAttribute('data-id')
    }
    
    const tomandoProducto = carritoProducto.some(producto => producto.id === productoMod.id);
    
    const tomandoDatos = arrayProductos.find(producto => producto.id == productoMod.id);
         
    let newValor = 0;
    newValor = tomandoDatos.precio;

    if(tomandoProducto) {
        const productos = carritoProducto.map(producto => {
            if (producto.id === productoMod.id) {

                producto.cantidad--
            
                producto.precio = `${parseInt(productoMod.precio.slice(1) - newValor)}`
                
                aumentoNotifi--
                listaNav.innerHTML = `<img src="images/carrito-nav.png" alt="carrito"><span class="notifiCarrito">${aumentoNotifi}</span>`;
                
                return producto;
            } else {
                return producto;
            }
        });
        carritoProducto = productos;
    } else {
        carritoProducto.push(productoMod);
    }

    guardarCarrito();
    crearCarritoHtml();
    
}

function sumarCarrito(e) {
    if (e.target.classList.contains("mas")) {
        const bodyCarrito = e.target.parentElement.parentElement;

        sumarCantidad(bodyCarrito);

    }
}

function sumarCantidad(bodyCarrito) {

    const productoMod = {
        imagen: bodyCarrito.querySelector('img').src,
        nombre: bodyCarrito.querySelector('.nombreBebidaCarrito').textContent,
        precio: bodyCarrito.querySelector('.precioCarrito').textContent,
        cantidad: bodyCarrito.querySelector('.valorCantidad').textContent,
        id: bodyCarrito.querySelector('a').getAttribute('data-id')
    }

    const tomandoProducto = carritoProducto.some(producto => producto.id === productoMod.id);

    const tomandoDatos = arrayProductos.find(producto => producto.id == productoMod.id);

    let newValor = 0;
    newValor = tomandoDatos.precio;

    if (tomandoProducto) {
        const productos = carritoProducto.map(producto => {
            if (producto.id === productoMod.id) {

                producto.cantidad++

                producto.precio = `${parseInt(productoMod.precio.slice(1)) + Number(newValor)}`
                aumentoNotifi++
                listaNav.innerHTML = `<img src="images/carrito-nav.png" alt="carrito"><span class="notifiCarrito">${aumentoNotifi}</span>`;
                return producto;
            } else {
                return producto;
            }
        });
        carritoProducto = productos;
    } else {
        carritoProducto.push(productoMod);
    }

    guardarCarrito();
    crearCarritoHtml();

}

function borrarProductoHtml() {
    listaCarrito.innerHTML = '';
}

function guardarCarrito() {
    localStorage.setItem('carritoProducto', JSON.stringify(carritoProducto));
    localStorage.setItem('aumentoNotifi', JSON.stringify(aumentoNotifi));
}

$("#btPorMayor").click( function () {
    $('html, body').animate({
        scrollTop: $("#porMayor").offset().top
    }, 2000);
});

$("#btContacto").click(function () {
    $('html, body').animate({
        scrollTop: $("#contacto").offset().top
    }, 2000);
});

$("#btInicio").click(function () {
    $('html, body').animate({
        scrollTop: $("#header").offset().top
    }, 2000);
});

const iconoCarrito = document.querySelector('#iconoCarrito');
const menuCarrito = document.querySelector('#menuCarrito');
const fondoCarrito = document.querySelector('#fondoCarrito');
const cerrarCarrito = document.querySelector('#cerrarCarrito');

iconoCarrito.addEventListener('click', (e) => {
    menuCarrito.classList.toggle('activar');
    fondoCarrito.classList.toggle('fondo');
});

cerrarCarrito.addEventListener('click', (e) => {
    menuCarrito.classList.toggle('activar');
    fondoCarrito.classList.toggle('fondo');
});

fondoCarrito.addEventListener('click', (e) => {
    menuCarrito.classList.toggle('activar');
    fondoCarrito.classList.toggle('fondo');
})