const users = [
  {
    _id: 'a1b2c3d4-e5f6-7890-ab12-cdef34567890',
    name: 'Laura Martínez',
    email: 'laura.martinez@example.com',
    password: 'hashed_password_123',
    age: 28,
    gender: 'female',
    phone: '+54 911 2345 6789',
    address: {
      street: 'Av. Siempre Viva 123',
      city: 'Buenos Aires',
      state: 'CABA',
      zip: '1425',
      country: 'Argentina'
    },
    isActive: true,
    role: 'user',
    createdAt: '2024-10-01T10:15:00Z',
    updatedAt: '2025-01-15T12:00:00Z'
  },
  {
    _id: 'b2c3d4e5-f6a7-8901-bc23-def456789012',
    name: 'Carlos Gómez',
    email: 'carlos.gomez@example.com',
    password: 'hashed_password_456',
    age: 35,
    gender: 'male',
    phone: '+54 911 9876 5432',
    address: {
      street: 'Calle Falsa 456',
      city: 'Córdoba',
      state: 'Córdoba',
      zip: '5000',
      country: 'Argentina'
    },
    isActive: false,
    role: 'admin',
    createdAt: '2023-12-20T08:30:00Z',
    updatedAt: '2024-06-05T09:45:00Z'
  },
  {
    _id: 'c3d4e5f6-a7b8-9012-cd34-ef5678901234',
    name: 'Sofía Ruiz',
    email: 'sofia.ruiz@example.com',
    password: 'hashed_password_789',
    age: 41,
    gender: 'non-binary',
    phone: '+54 911 1122 3344',
    address: {
      street: 'Ruta 9 km 123',
      city: 'Rosario',
      state: 'Santa Fe',
      zip: '2000',
      country: 'Argentina'
    },
    isActive: true,
    role: 'editor',
    createdAt: '2024-05-10T14:20:00Z',
    updatedAt: '2025-04-01T11:10:00Z'
  }
];


// 1 . Validar en el frontend los datos ingresados en el formulario
// 2 . Validar los datos que llegan al backend
// 3 . El backend resuelve la respuesta para el frontedn
// 4 . El frontend muestra en la ui la respuesta recibida del backend

interface User {
  _id: string
  name: string
  email: string,
  password: string,
  age: number,
  gender: string,
  phone: string,
  address: any,
  isActive: boolean,
  role: string,
  createdAt: string,
  updatedAt: string
}

interface Res {
  success: boolean,
  message: string,
  data?: User
}

const getUserById = (id: string): Res => {
  // CASO DE NO ÉXITO
  if (!id) {
    return {
      success: false,
      message: "ID is required"
    }
  }
  // CASO DE NO ÉXITO
  if (typeof id !== "string") {
    return {
      success: false,
      message: "The ID should be a string"
    }
  }
  // CASO DE NO ÉXITO
  if (id.length !== 36) {
    return {
      success: false,
      message: "Invalid ID"
    }
  }
  // CASO DE NO ÉXITO
  if (id.split("-").length !== 5) {
    return {
      success: false,
      message: "Invalid ID"
    }
  }

  // LECTURA EN LA BASE DE DATOS
  const user = users.find(user => user._id === id)

  // CASO DE NO ÉXITO
  if (!user) {
    return {
      success: false,
      message: "User not found"
    }
  }

  // RETORNANDO EL CASO DE ÉXITO
  return {
    success: true,
    data: user,
    message: "Found user by id"
  }
}

const createUser = (user: User) => {
  console.log("Agregando usuario!")
}

// PRIMERO RESUELVO EL CASO DE NO ÉXITO, Y LUEGO EL DE ÉXITO
