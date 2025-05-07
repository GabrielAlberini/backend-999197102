# 🌽 API de Gestión de Películas con Mongoose

Este módulo permite conectar a una base de datos MongoDB y realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre una colección de películas (`Film`). Está implementado usando [Mongoose](https://mongoosejs.com/) en TypeScript.

---

## 📦 Requisitos

* Node.js
* MongoDB Atlas o local
* TypeScript
* `.env` con URI de conexión

---

## ⚙️ Configuración Inicial

1. Instalar dependencias:

   ```bash
   npm install mongoose
   ```

2. Crear un archivo `.env` en la raíz del proyecto con la siguiente variable:

   ```env
   URI_DB=mongodb://localhost:27017/"nombre de la base de datos" (en local)
   ```

3. Activar la carga de variables con:

   ```ts
   process.loadEnvFile()
   ```

---

## 📖 Estructura del Modelo

```ts
interface IFilm {
  title: string
  year: number
  rating: number
  gender: string
}

const filmSchema = new Schema({
  title: { type: String, required: true, unique: true },
  year: { type: Number, required: true },
  rating: { type: Number, default: 0 },
  gender: { type: String, required: true }
}, {
  versionKey: false
})
```

---

## 📚 Funciones Disponibles

### Conectar a la Base de Datos

```ts
await connectMongoDb()
```

Conecta a MongoDB usando la URI definida en `.env`.

---

### ✅ Agregar Película

```ts
await addNewFilm({ title, year, rating, gender })
```

* Valida los campos requeridos.
* Devuelve un objeto `success`, `data` y `message`.

---

### 📜 Obtener Todas las Películas

```ts
await getFilms()
```

* Recupera todos los documentos de la colección.

---

### 📃 Obtener Película por ID

```ts
await getFilm(id)
```

* Devuelve una película según su ID.
* Devuelve `film not found` si no existe.

---

### ✏️ Actualizar Película

```ts
await updateFilm(id, { rating: 10 })
```

* Actualiza los campos definidos.
* Devuelve la película actualizada.

---

### 🔥 Eliminar Película

```ts
await deleteFilm(id)
```

* Elimina una película por su ID.

---

## 🎡 Ejemplo de Uso

```ts
const main = async () => {
  await connectMongoDb()

  const savedFilm = await addNewFilm({
    title: "La sustancia",
    year: 2022,
    rating: 7.2,
    gender: "acción"
  })

  const allFilms = await getFilms()
  console.log(allFilms)
}

main()
```

---

## 📆 Errores Comunes

* URI de conexión inválida.
* Campos faltantes al crear una película.
* ID inválido o no existente.

---

## 🤖 Contribuciones

Pull Requests y sugerencias son bienvenidas.

---

## 📧 Contacto

Para consultas, contactar al desarrollador.
