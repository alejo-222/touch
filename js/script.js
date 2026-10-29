// CREAR VARIABLES PARA LOS AUDIOS

let audioVentana1 = new Audio();
let audioVentana2 = new Audio();
let audioVentana3 = new Audio();
let audioVentana4 = new Audio();

// MOSTRAR Y OCULTAR VENTANAS

// ventana 1

let ventana1 = document.getElementById("ventana1");
let informacionVentana1 = document.getElementById("informacion-ventana1");
let visible1 = false;

ventana1.onclick = function () {
  if (visible1 == true) {
    visible1 = false;
    informacionVentana1.style.opacity = "0";
    audioVentana1.pause();
  } else {
    visible1 = true;
    informacionVentana1.style.opacity = "1";
    audioVentana1.play();
  }
};

// ventana 2

let ventana2 = document.getElementById("ventana2");
let informacionVentana2 = document.getElementById("informacion-ventana2");
let visible2 = false;

ventana2.onclick = function () {
  if (visible2 == true) {
    visible2 = false;
    informacionVentana2.style.opacity = "0";
    audioVentana2.pause();
  } else {
    visible2 = true;
    informacionVentana2.style.opacity = "1";
    audioVentana2.play();
  }
};

// ventana 3

let ventana3 = document.getElementById("ventana3");
let informacionVentana3 = document.getElementById("informacion-ventana3");
let visible3 = false;

ventana3.onclick = function () {
  if (visible3 == true) {
    visible3 = false;
    informacionVentana3.style.opacity = "0";
    audioVentana3.pause();
  } else {
    visible3 = true;
    informacionVentana3.style.opacity = "1";
    audioVentana3.play();
  }
};

// ventana 4

let ventana4 = document.getElementById("ventana4");
let informacionVentana4 = document.getElementById("informacion-ventana4");
let visible4 = false;

ventana4.onclick = function () {
  if (visible4 == true) {
    visible4 = false;
    informacionVentana4.style.opacity = "0";
    audioVentana4.pause();
  } else {
    visible4 = true;
    informacionVentana4.style.opacity = "1";
    audioVentana4.play();
  }
};

// MOSTRAR HORA LOCAL EN LA PÁGINA

let elementoHora = document.getElementById("hora");

function actualizarReloj() {
  let ahora = new Date();

  let horas = String(ahora.getHours()).padStart(2, "0");
  let minutos = String(ahora.getMinutes()).padStart(2, "0");
  let segundos = String(ahora.getSeconds()).padStart(2, "0");

  console.log(horas + ":" + minutos + ":" + segundos);

  elementoHora.textContent = horas + ":" + minutos + ":" + segundos;
}

actualizarReloj();
setInterval(actualizarReloj, 1000);

// CARGAR DATOS Y ASIGNAR A LOS CONTENEDORES

let datos;

async function cargarDatos() {
  let respuesta = await fetch("datos.json");
  datos = await respuesta.json();

  actualizarContenido();
}

// Cargar los datos al iniciar
cargarDatos();

let textoVentana1 = document.getElementById("texto-ventana1");
let textoVentana2 = document.getElementById("texto-ventana2");
let textoVentana3 = document.getElementById("texto-ventana3");
let textoVentana4 = document.getElementById("texto-ventana4");

// actualizar contenido

function actualizarContenido() {
  let ahora = new Date();
  let horas = ahora.getHours();
  let minutos = ahora.getMinutes();

  // Convertir la hora actual a minutos
  let horaActual = horas * 60 + minutos;

  // Buscar la franja horaria correspondiente
  let franja = datos.find(function (item) {
    let inicio = convertirAMinutos(item.hora_inicio);
    let fin = convertirAMinutos(item.hora_fin);

    if (inicio < fin) {
      return horaActual >= inicio && horaActual < fin;
    }

    // Franja que cruza la medianoche
    return horaActual >= inicio || horaActual < fin;
  });

  if (!franja) return;

  // Actualizar las cuatro ventanas
  textoVentana1.textContent = franja.ventana_1;
  textoVentana2.textContent = franja.ventana_2;
  textoVentana3.textContent = franja.ventana_3;
  textoVentana4.textContent = franja.ventana_4;

  // Actualizar y cargar archivos de audio
  audioVentana1.src = franja.audio_ventana_1;
  audioVentana1.load();
  audioVentana2.src = franja.audio_ventana_2;
  audioVentana2.load();
  audioVentana3.src = franja.audio_ventana_3;
  audioVentana3.load();
  audioVentana4.src = franja.audio_ventana_4;
  audioVentana4.load();
}

// Convertir "5:00" en 300 minutos
function convertirAMinutos(hora) {
  let partes = hora.split(":");
  return Number(partes[0]) * 60 + Number(partes[1]);
}

// Actualizar las ventanas cada minuto
setInterval(actualizarContenido, 60000);
