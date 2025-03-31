// para que el objeto no tome como refencia esta variable, se debe hacer referencia a la propiedad del objeto mediante "this"
// let name = "pepe"

// un objeto es una estructura de datos que contiene propiedes y métodos
const persona = {
  nombre: "Angelina",
  tienePerros: true,
  nombreDeMascota: "Athena",
  saludar() {
    return `Hola, soy ${this.nombre} y mi mascota se llama ${this.nombreDeMascota}`
  }
}

// console.log(persona.nombre) // <- nombre de la persona
// console.log(persona.tienePerros) // <- saber si tiene perro persona
// console.log(persona.nombreDeMascota) // <- nombre del perro de la persona
// console.log(persona.saludar()) // <- el saludo de la persona

const { nombre, tienePerros, nombreDeMascota } = persona

console.log(nombre) // <- nombre de la persona
console.log(tienePerros) // <- saber si tiene perro persona
console.log(nombreDeMascota) // <- nombre del perro de la persona
console.log(persona.saludar()) // <- el saludo de la persona

const mascota = {
  nombreMascota: "Athenas",
  colores: ["blanco", "negro"],
  raza: "Border Collie"
}

const { nombreMascota, colores, raza } = mascota

console.log(nombreDeMascota, "<- nombre de la mascota")
console.log(colores, "<- colores de la mascota")
console.log(raza, "<- raza de la mascota")