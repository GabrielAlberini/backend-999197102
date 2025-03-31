
// funcion nombrada
function sumar(n1, n2) {
  return n1 + n2
}

// arrow funcion
// la SINTAXIS de la arrow funcion indica que si el scope tiene solo una linea se puede obviar el return y las llaves
const sumar2 = (n1, n2) => n1 + n2

export { sumar, sumar2 }