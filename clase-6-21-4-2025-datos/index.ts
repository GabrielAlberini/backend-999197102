import os from "node:os"
import fileSystem from "node:fs"
import crypto from "node:crypto"

// Diferencia entre persistencia de datos y precesamiento de datos
const sumar = (n1: number, n2: number) => {
  let result: number = n1 + n2

  return result
}

const suma = sumar(10, 101)
console.log(suma, "<- resultado de suma")

// En sistemas hay dos tipos de momoria:
// Disco duro -> la información se persiste
// Memoria RAM -> memoria reservada para procesos

console.log("Hola desde el editor de texto!")

const colores = ["azul", "rojo", "amarillo"]

console.log(os.platform(), "<-- sistema operativo de mi pc")

// sincrónico -> esperar a que termine
// asincrónico -> continua, te aviso cuando termine
const data = fileSystem.readFileSync("./colores.json", "utf-8")

// [
//   "azul",
//   "rojo",
//   "amarillo"
// ]
const parsedData = JSON.parse(data)

parsedData.push("lila")

console.log(parsedData)

fileSystem.writeFileSync("./colores.json", JSON.stringify(parsedData))