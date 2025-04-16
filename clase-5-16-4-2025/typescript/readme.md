## 🧪 Ejercicio 1: Validar tipo con interfaz

Crear una interfaz User con los campos:

- id: string

- name: string

- age: number

Crear una función createUser que reciba esos tres parámetros y devuelva un objeto User.

Crear 2 usuarios válidos.

Crear un tercer usuario con una propiedad extra (email) y ver qué pasa si lo tipás como User.

## 🧹 Ejercicio 2: Limpieza de datos inválidos

Crear una interfaz Task con:

- id: string

- title: string

- completed: boolean

Crear un array de tareas, algunas válidas y otras con campos extra o con tipos incorrectos.

Escribir una función cleanTasks que filtre y retorne solo las tareas que cumplen con la interfaz.