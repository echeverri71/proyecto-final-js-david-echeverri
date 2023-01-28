let carrito = [];

class Viaje {
    constructor(id, destino, precio, adultos) {

        this.id = id;
        this.destino = destino;
        this.precio = precio;
        this.adultos = adultos;
    }
}

let viajeMendoza = new Viaje(1, 'Mendoza', 1200, 1);
let viajeBariloche = new Viaje(2, 'Bairloche', 1500, 1);
let ViajeCataratas = new Viaje(3, 'Cataratas', 800, 1);

let viajes = [viajeMendoza, viajeBariloche, ViajeCataratas];

//CARRITO DE VIAJES

function agregar_a_reservas(e) {

    let boton = e.target;
    let card_body = boton.parentNode;
    let card = card_body.parentNode;

    let destino = card_body.querySelector("h3").textContent;
    let precio = Number(card_body.querySelector("span").textContent.replace('$', ''));

    let viaje = {

        lugar: destino,
        precio: precio,
        adultos: 1,
    };

    carrito.push(viaje);

    calcularTotalCompra();

    calcularTotalPersonas();

    mostrarViaje(viaje);
};


//SUMATORIA CARRITO

let totalCompra = document.getElementById('totalCompra');

let calcularTotalCompra = () => {

    let total = carrito.reduce((acc, el) => acc + el.precio, 0);
    totalCompra.innerHTML = `<p> ${total}$ </p>`;

};

//SUMATORIA PERSONAS

let totalPersonas = document.getElementById('personasTotal');

let calcularTotalPersonas = () => {

    let sumaPersonas = carrito.reduce((acc, el) => acc + el.adultos, 0);
    personasTotal.innerHTML = `<p> ${sumaPersonas} </p>`;
};


//RESERVAS DEL VIAJE

function mostrarViaje(viaje) {
    let fila = document.createElement("tr");
    fila.innerHTML = `<td>${viaje.lugar}</td>
                    <td>${viaje.adultos}</td>
                    <td>${viaje.precio}</td>
                    `;
    const td = document.createElement("td")
    const boton = document.createElement("button")
    boton.classList = "btn btn-danger eliminar_reserva"
    boton.innerText = "Eliminar"
    boton.addEventListener("click", (e) => {
        eliminar_precio(viaje.precio)
        eliminar_reserva(e)
        eliminar_adulto(e)
    });
    td.appendChild(boton)
    fila.appendChild(td)
    let tabla = document.getElementById("tbody");
    tabla.append(fila);
};

//ELIMINA LA RESERVAS DEL VIAJE

function eliminar_reserva(e) {

    let reserva = e.target.parentNode.parentNode;
    reserva.remove();

};
//ELIMINA PRECIO DEL VIAJE

const eliminar_precio = (precio) => {
    const viaje = carrito.find((viaje) => viaje.precio == precio);
    carrito.splice(carrito.indexOf(viaje), 1);
    calcularTotalCompra();
};


//ELIMINA ADULTO CANT

const eliminar_adulto = (adulto) => {
    const viaje = carrito.find((viaje) => viaje.adulto == adulto);
    carrito.splice(carrito.indexOf(viaje), 0);
    console.log(viaje);
    calcularTotalPersonas();
};


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
});

let btn_reservar = document.querySelectorAll(".btn_reservar");

for (let boton of btn_reservar) {
    boton.addEventListener("click", agregar_a_reservas);
};

//LOCAL STORAGE

let destinos = [{ lugar: "mendoza", precio: 1200 }, { lugar: "bariloche", precio: 1500 }, { lugar: "cataratas", precio: 800 }];
localStorage.setItem("todo_destino", destinos);

let destinos_JSON = JSON.stringify(destinos);

localStorage.setItem("destinos", destinos_JSON);


//TOASTYFY

let btn_toasty = document.getElementById('boton_reservar');

btn_toasty.addEventListener("click", function () {

    Toastify({
        text: "Felicidades, estas mas cerca de viajar",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        style: {
            background: "#ff6818",
        },

    }).showToast();

});

// API CLIMA

fetch("https://api.openweathermap.org/data/2.5/weather?q=Buenos Aires&lang=es&units=metric&appid=52379694ac89f11ac77ff45aab9257a2")

    .then(response => response.json())
    .then (data => {
    console.log(data);    
    let temperatura = document.getElementById ("temp");
    temperatura.innerText = (data.main.temp);

    let humedad = document.getElementById ("humedad");
    humedad.innerText = (data.main.humidity);

    let descripcion = document.getElementById ("descripcion");
    descripcion.innerText = (data.weather[0]. description);

    let tempMaxima = document.getElementById ("temp-max");
    tempMaxima.innerText = (data.main.temp_max);
        
    });

    