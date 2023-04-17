class Producto {
    constructor(id, nombre, precio, stock, img) {
        this.id = id;
        this.nombre = nombre;
        this.cantidad = 1;
        this.precio = precio;
        this.stock = stock;
        this.img = img;
    }
}

class ProductoController {
    constructor() {
        this.listaProductos = [];
        this.contenedor_productos = document.getElementById("contenedor_productos");
    }

    levantarProductos() {
        this.listaProductos = [
            new Producto(1, "Galaxy Tab S7 FE", 100000, 5, "./img/tablet.jfif"),
            new Producto(2, "Galaxy Buds2 Lavender", 100000, 5, "./img/galaxyBuds.jfif"),
            new Producto(3, "Galaxy Watch4 40mm Gold + Galaxy SmartTag", 100000, 5, "./img/samartwatch.jfif"),
            new Producto(4, "Teclado Samsung Trio 500 Multi Bluetooth Blanco", 100000, 5, "./img/teclado.jfif"),
            new Producto(5, "Samsung Galaxy S22 Ultra 5G 128GB - Reacondicionado - Negro", 100000, 5, "./img/S22.jfif"),
            new Producto(6, "Monitor Samsung Plano 27 IPS 1080p75Hz", 100000, 5, "./img/monitor.jfif"),
            new Producto(7, "Samsung Galaxy Z Flip3 5G 256GB - Reacondicionado - Crema", 100000, 5, "./img/flip.jfif"),
            new Producto(8, "Samsung Galaxy Tab S6 Lite Azul 10.4 WiFi 64gb + bookcover + lapiz", 100000, 5, "./img/tabs6.jfif"),
            new Producto(9, "Televisor Led 50 AU7090G UHD 4K Smart Tv 2022", 100000, 5, "./img/samrttv.jfif"),
            new Producto(10, "Celular Smartphone Samsung Galaxy Z Fold4 5G 256 GB", 100000, 5, "./img/fold.jfif"),
            new Producto(11, "Celular Samsung Galaxy A51 Dual 4GB 128GB Rosa", 100000, 5, "./img/A51.jfif"),
            new Producto(12, "Smartphone Samsung Galaxy S23+ 512GB Green 5G + Galaxy Buds2 Negro", 100000, 5, "./img/s23.jfif")
        ]
    }

    mostrarEnDOM() {
        this.listaProductos.forEach(producto => {
            this.contenedor_productos.innerHTML += `
            <div class="card" style="width: 18rem;">
                <img src="${producto.img}" class="card-img-top" alt="${producto.nombre}">
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text">$${producto.precio}</p>
                    <a href="#" onclick="agregarAlCarrito(${producto.id})" class="btn btn-primary">Agregar al Carro</a>
                </div>
            </div>`
        })

    }
}

class CarritoController {
    constructor() {
        this.listaCarrito = []
        this.contenedor_carrito = document.getElementById("contenedor_carrito");
        this.calculo_total = document.getElementById("total");
    }

    guardarEnStorage(){
        let listaCarritoJSON = JSON.stringify(this.listaCarrito);
        localStorage.setItem("listaCarrito", listaCarritoJSON);
    }

    verificarExistenciaEnStorage(){
        this.listaCarrito = JSON.parse(localStorage.getItem("listaCarrito")) || []; 

        if(this.listaCarrito.length > 0){
            this.mostrarEnDom()
        }
    }

    agregar(producto) {
        this.listaCarrito.push(producto);
    }

    limpiar(){
        this.contenedor_carrito.innerHTML = ""
    }

    mostrarEnDom() {
        this.limpiar()

        this.listaCarrito.forEach(producto => {
        this.contenedor_carrito.innerHTML += `
        <div class="card mb-1 p-0" style="max-width: 100%;">
            <div class="row g-0">
              <div class="col-md-4">
                <img src="${producto.img}" class="img-fluid rounded-center" alt="${producto.nombre}">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">${producto.nombre}</h5>
                  <p class="card-text mb-1"><strong>Cantidad:</strong> ${producto.cantidad}</p>
                  <p class="card-text mb-2"><strong>Precio:</strong> $${producto.precio}</p>
                  <div class="btn-group" role="group" aria-label="Basic example">
                  <a href="#" onclick="disminuirCantidad(${producto.id})" class="card-button btn btn-secondary">-</a>
                  <a href="#" onclick="incrementarCantidad(${producto.id})" class="card-button btn btn-success">+</a>
                  <a href="#" onclick="quitarProducto(${producto.id})" class="card-button btn btn-danger">x</a>
              </div>
                </div>
              </div>
            </div>
        </div>`
        })
    }

    precioTotal() {
        this.calculo_total.innerHTML = "";
    
        let sumatoria = 0;
    
        for(let i = 0 ; i < this.listaCarrito.length; i++) {
            sumatoria += this.listaCarrito[i].precio * this.listaCarrito[i].cantidad;
        }
    
        this.calculo_total.innerHTML += `Total de tu compra: $${sumatoria}`;
    }    
}

const controladorProductos = new ProductoController();
controladorProductos.levantarProductos();

const controladorCarrito = new CarritoController();
controladorCarrito.verificarExistenciaEnStorage();
controladorProductos.mostrarEnDOM();

function mostrarCarrito() { 
    controladorCarrito.mostrarEnDom()
    controladorCarrito.precioTotal()
    controladorCarrito.guardarEnStorage()
}

function agregarAlCarrito(id) {
    let producto = controladorProductos.listaProductos.find(producto => producto.id == id);
    console.log(producto)

    let booleano = controladorCarrito.listaCarrito.some(producto => producto.id == id)

    if (booleano) {
        producto.cantidad++
        mostrarCarrito()
    } else {
        controladorCarrito.agregar(producto)
        mostrarCarrito()
    }
    
}


function incrementarCantidad(id) {
    let producto = controladorCarrito.listaCarrito.find(producto => producto.id == id)

    producto.cantidad++
    mostrarCarrito()
}

function disminuirCantidad(id) {
    let producto = controladorCarrito.listaCarrito.find(producto => producto.id == id)

    producto.cantidad--

    if (producto.cantidad == 0) {
        quitarProducto(id)
    }

    mostrarCarrito()
}

function quitarProducto(id) {
    let producto = controladorCarrito.listaCarrito.find(producto => producto.id == id);
    producto.cantidad = 1;

    let indice = controladorCarrito.listaCarrito.findIndex(producto => producto.id == id);
    controladorCarrito.listaCarrito.splice(indice, 1);

    mostrarCarrito()
}

