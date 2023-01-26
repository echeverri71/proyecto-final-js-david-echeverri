let carrito = [];

class Viaje {
    constructor( destino, precio, adultos) {
    
        this.destino = destino;
        this.precio = precio;
        this.adultos = adultos;
    }
}

let viajeMendoza = new Viaje('Mendoza', 1200, 1);
let viajeBariloche = new Viaje('Bairloche', 1500, 1);
let ViajeCataratas = new Viaje('Cataratas', 800, 1);

let viajes = [viajeMendoza, viajeBariloche, ViajeCataratas];

//CARRITO DE VIAJES

function agregar_a_reservas(e) {

    console.log(e.target);
    let boton = e.target;
    let card_body = boton.parentNode;
    let card = card_body.parentNode;

    let destino = card_body.querySelector("h3").textContent;
    let precio = card_body.querySelector("span").textContent;

    let viaje = {

        lugar: destino,
        precio: precio,
        adultos: 1,
    };

    carrito.push(viaje);

    calcularTotalCompra();

    mostrarViaje(viaje);
};


//SUMATORIA CARRITO

let totalCompra = document.getElementById('totalCompra');

let calcularTotalCompra = () => {
    
    let total = carrito.reduce((acc, el) => acc + el.precio, 0);
    totalCompra.innerHTML = `<p> ${total} </p>`;
    console.log (total);

};


//MUESTRA LAS RESERVAS DEL VIAJE

function mostrarViaje(viaje) {

    let fila = document.createElement("tr");
    fila.innerHTML = `<td>${viaje.lugar}</td>
                    <td>${viaje.adultos}</td>
                    <td>${viaje.precio}</td>
                    <td><button class="btn btn-danger eliminar_reserva">Eliminar Reserva</button></td>
                    `;

    let tabla = document.getElementById("tbody");
    tabla.append(fila);

    let btn_eleminar_reserva = document.querySelectorAll(".eliminar_reserva");

    for (let boton of btn_eleminar_reserva) {

        boton.addEventListener("click", eliminar_reserva);
    }
}

//ELIMINA LA RESERVAS DEL VIAJE

function eliminar_reserva(e) {

    let reserva = e.target.parentNode.parentNode;
    reserva.remove();
}


//BOTON VER Y ESCONDER RESERVAS

let btn_reservas = document.getElementById("mostrar_reservas");

btn_reservas.addEventListener("click", function () {

    let mis_reservas = document.getElementById("mis_reservas");

    if (mis_reservas.style.display != "none") {
        mis_reservas.style.display = "none";
    }
    else {
        mis_reservas.style.display = "block";
    }
})

let btn_reservar = document.querySelectorAll(".btn_reservar");

for (let boton of btn_reservar) {

    boton.addEventListener("click", agregar_a_reservas);
}

//LOCAL STORAGE

let destinos = [{ lugar: "mendoza", precio: 1200 }, { lugar: "bariloche", precio: 1500 }, { lugar: "cataratas", precio: 800 }];
localStorage.setItem("todo_destino", destinos);

let destinos_JSON = JSON.stringify(destinos);

localStorage.setItem("destinos", destinos_JSON);



