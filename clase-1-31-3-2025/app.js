// para utilizar los módulos de otros archivos, se indica el nombre y la ruta preveniente
import { showPassword, credential } from "./variables.js"
import { sumar, sumar2 } from "./arrow-functions.js"

const nombre = "María"
const edad = 28

console.log(`Hola, soy ${nombre} y tengo ${edad} años.`)

// npm init
// crea un proyecto de node
// crea un package.json, el "dni" de un proyecto de node

const password = showPassword("pepe123")
console.log(password)
console.log(`My credential is ${credential}`)

const resultado = sumar(1, 200)
console.log(resultado)

const resultado2 = sumar2(100, 200)
console.log(resultado2)