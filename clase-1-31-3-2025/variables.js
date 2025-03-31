// un espacio que se reserva en la memoria de nuestra pc
// para identificar ese espacio reservado, accedemos mediante el nombre de la variable

const showPassword = (pass) => {
  return `Your password is ${pass}`
}

const credential = "GMDW123"

const favoritesColors = ["red", "blue", "yellow"]
favoritesColors.push("violet")
console.log(favoritesColors)

let name = "Simon"
console.log(name, "<- name")

name = 32
console.log(name, "<- name")

// convertir la funcion showPassword en un módulo
export { showPassword, credential }
