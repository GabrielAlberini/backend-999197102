## 🟢 Crear (Create)
- Crear una nueva base de datos llamada mi_base.

- Crear una colección dentro de esa base de datos llamada productos.

- Insertar al menos 3 documentos con los campos: nombre, precio, y stock.

## 🔵 Leer (Read)
- Visualizar todos los documentos de la colección productos.

- Buscar un documento cuyo nombre sea específico (por ejemplo: "nombre": "Lapicera").

- Aplicar un filtro para mostrar los productos con precio mayor a 100.

## 🟡 Actualizar (Update)
- Actualizar el campo stock de un producto específico.

- Modificar múltiples documentos para agregar un nuevo campo llamado categoria con valor "papelería".

## 🔴 Eliminar (Delete)
- Eliminar un producto por su nombre.

- Eliminar todos los productos cuyo stock sea igual a 0.

# 📚 Consigna: CRUD de Libros en MongoDB usando TypeScript

**Objetivo:**
Crear una serie de funciones que permitan administrar una colección de libros utilizando mongoose y TypeScript, sin servidor, solo desde un archivo ejecutable con funciones.

## 🧩 Modelo de libro
Cada libro debe tener los siguientes campos:

- title (string, requerido) — título del libro

- author (string, requerido) — autor/a del libro

- publishedYear (number, requerido) — año de publicación

- genre (string, requerido) — género literario

- available (boolean, opcional, default true) — si está disponible para préstamo

## 🧪 Funciones a implementar

createBook(book: BookData): 
*Crea un nuevo libro.*

getAllBooks(): 
*Muestra todos los libros.*

getBookById(id: string): 
*Muestra un libro por su ID.*

updateBook(id: string, data: Partial<BookData>): 
*Actualiza cualquier campo del libro.*

deleteBook(id: string): 
*Elimina un libro por su ID.*

(Opcional) getBooksByGenre(genre: string): 
*Muestra los libros que pertenezcan a un género específico.*