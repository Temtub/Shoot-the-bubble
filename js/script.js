import { Bubble } from "./Bubble.js"

// Obtén el elemento canvas y su contexto
let canvas = document.getElementById("bubbleCanvas")
let ctx = canvas.getContext("2d")

//Formulario
let form = document.getElementById("form")
let showFinishBox = document.getElementById("showFinishBox")
let showFinalScore = document.getElementById("showFinalScore")

let replay = document.getElementById("replay")
let inicio = document.getElementById("inicio")

let letra1 = document.getElementById("letra1")
let letra2 = document.getElementById("letra2")
let letra3 = document.getElementById("letra3")

let nombreJugador = ""

let juegoAcabado = false

// Tu objeto JSON
const jsonNombres = {
    nombre: "Rod",
    score: 9999
}

let records = document.getElementById("records")

// Cargar las imágenes para cada forma
let images = {
    'redBubble': document.createElement("IMG"),
    'blueBubble': document.createElement("IMG"),
    'yellowBubble': document.createElement("IMG")
    // Agrega más imágenes según las formas que tengas
}

images['redBubble'].src = './assets/images/redBubble.png'
images['blueBubble'].src = './assets/images/blueBubble.png'
images['yellowBubble'].src = './assets/images/yellowBubble.png'

// Array para almacenar todas las Bubbles
let bubbles = []
let score = 0

// Definir la duración del temporizador en segundos
const juegoDuration = 15
let temporizadorCrearBurbujasDuration = juegoDuration
let temporizadorCrearBurbujas
const FPS = 60

const nMaxBurbujas = 20

// Función para crear una nueva burbuja 
function createBubble() {
    if (bubbles.length < nMaxBurbujas) {
        bubbles.push(new Bubble(canvas, ctx, images))//Creamos una burbuja y la añadimos al array de burbujas
    } else {
        clearTimeout(temporizadorCrearBurbujas)
    }

}

// Función para dibujar y actualizar todas las burbujas
function drawAndUpdateBubbles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Recorremos todas las burbujas y las dibujamos y actualizamos
    for (let i = 0; i < bubbles.length; i++) {
        bubbles[i].draw()
        bubbles[i].update()
    }

    // Muestramos la puntuación 
    ctx.font = "20px Arial"
    ctx.fillStyle = "black"
    ctx.fillText("Score: " + score, 10, 30)

    // Muestra el temporizador
    ctx.fillText("Tiempo restante: " + temporizadorCrearBurbujasDuration + "s", 10, 60)

    // Programa el siguiente fotograma
    requestAnimationFrame(drawAndUpdateBubbles)
}

// Función para finalizar la partida
function endGame() {
    clearTimeout(temporizadorCrearBurbujas) // Detener el temporizador

    showFinishBox.classList.remove("dNone")

    guardarPuntuacion(nombreJugador, score)

    bubbleCanvas.classList.add("dNone")

    showFinalScore.textContent = score
    
    juegoAcabado=true
}

function guardarPuntuacion(nombre, puntuaje) {
    //Cpnseguir las puntuaciones
    const puntuacionesGuardadas = JSON.parse(localStorage.getItem('puntuaciones')) || []

    //Añadimos la puntuacion
    const puntuacion = {
        nombre: nombre,
        puntuacion: puntuaje
    }

    puntuacionesGuardadas.push(puntuacion)

    // Guardar el array actualizado en Local Storage
    localStorage.setItem('puntuaciones', JSON.stringify(puntuacionesGuardadas))
}

const contarReloj = () => {
    if (temporizadorCrearBurbujasDuration > 0) {
        //Reducimos el tiempo del contador
        temporizadorCrearBurbujasDuration--
    }
    else {
        console.log("llamo")
        clearTimeout(temporizadorCrearBurbujas)
        if(!juegoAcabado){
            endGame()

        }
        return
    }
}
//Funcion para cargar el juego
const seguimientoJuego = () => {
    // Temporizador para crear burbujas
    let temporizadorCrearBurbujas = setInterval(createBubble, 100) // Crea una nueva burbuja cada 0.5 segundos

    //Temporizador para el reloj
    setInterval(contarReloj, 1000)

    // Iniciar el ciclo de dibujo y actualización
    requestAnimationFrame(drawAndUpdateBubbles)
}

//Funcion cuando se da a iniciar
const iniciarJuego = (event) => {
    console.log(event)

    if (typeof event !== 'undefined') {
        event.preventDefault()
    }

    juegoAcabado = false

    nombreJugador = letra1.value + letra2.value + letra3.value 

    temporizadorCrearBurbujasDuration = juegoDuration

    //Quitamos el formulario
    form.classList.add("dNone")

    cargarYMostrarPuntuaciones()

    //Mostramos el canvas
    bubbleCanvas.classList.remove("dNone")

    //Quitamos la caja de la puntuacion
    showFinishBox.classList.add("dNone")

    //Limpiamos el temporizador existente
    clearInterval(temporizadorCrearBurbujas);

    //Reiniciamos las variables
    bubbles = [];
    score = 0;
    temporizadorCrearBurbujasDuration = juegoDuration;

    //Iniciamos el juego
    seguimientoJuego()
}

const reiniciar = () =>{

    //Convertimos el json a cadena
    const jsonString = JSON.stringify(jsonNombres);

    //Guardamos el json en local storage
    localStorage.setItem('jsonNombres', jsonString);

    //Recargamos la página
    location.reload()
}

function cargarYMostrarPuntuaciones() {
    records.textContent=""
    //Recuperar puntuaciones almacenadas
    const puntuacionesGuardadas = JSON.parse(localStorage.getItem('puntuaciones')) || []
    // localStorage.clear()

    let fragment = document.createDocumentFragment()
    console.log(puntuacionesGuardadas)
    puntuacionesGuardadas.forEach(puntuacion => {
        let box = document.createElement("DIV")
        let name = document.createElement("P")
        let num = document.createElement("P")
        console.log(puntuacion)
        if(num == ""){
            return 
        }
        
        box.classList.add("record")

        console.log("aqui")
        name.classList.add("record__text")
        num.classList.add("record__text")

        name.textContent = puntuacion.nombre
        num.textContent = puntuacion.puntuacion

        box.append(name)
        box.append(num)
        fragment.append(box)
    })

    records.append(fragment)
}

function reiniciarJuego() {
    // Detener los temporizadores
    clearInterval(temporizadorCrearBurbujas)
    // clearInterval(temporizadorReloj)

    // Limpiar el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Restablecer variables y estado del juego
    juegoAcabado = false
    nombreJugador = ""
    bubbles = []
    score = 0;
    temporizadorCrearBurbujasDuration = juegoDuration;

    // Iniciar el juego nuevamente
    iniciarJuego();
}




//Funcion para eliminar las burbujas
canvas.addEventListener("click", (event) => {

    //Tamaño del canvas
    let rect = canvas.getBoundingClientRect()

    //Posiciones del clik
    let mouseX = event.clientX - rect.left
    let mouseY = event.clientY - rect.top

    for (let i = 0; i < bubbles.length; i++) {
        let distance = Math.sqrt(
            Math.pow(mouseX - (bubbles[i].x + bubbles[i].size / 2), 2) +
            Math.pow(mouseY - (bubbles[i].y + bubbles[i].size / 2), 2)
        )

        if (distance < bubbles[i].size / 2) {
            score += bubbles[i].points // Sumamos los puntos de la burbuja 
            bubbles.splice(i, 1) // Eliminamos la burbuja
            i--
            
        }
    }
})

replay.addEventListener("click", reiniciarJuego);
inicio.addEventListener("click", reiniciar)
form.addEventListener("submit", iniciarJuego)

document.addEventListener("DOMContentLoaded", cargarYMostrarPuntuaciones)