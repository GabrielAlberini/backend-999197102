import crypto from "node:crypto"

interface User {
  id: string;
  name: string;
  age: number;
  email?: string
}

const user1: User = {
  id: crypto.randomUUID(),
  name: "Juan",
  age: 25
}
const user2: User = {
  id: crypto.randomUUID(),
  name: "Pedro",
  age: 20
}

const user3: User = {
  id: "3",
  name: "Ana",
  age: 28,
  email: "ana@hotmail.com"
}

const users = [user1, user2, user3]

users.forEach((user) => {
  console.log(`Hola, soy ${user.name} y tengo ${user.age} años.`)
})