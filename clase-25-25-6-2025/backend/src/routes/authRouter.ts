import { Router } from "express"
import { login, register } from "../controllers/authController"

// http://localhost:1234/api/auth
const authRouter = Router()

// register
// http://localhost:1234/api/auth/register
authRouter.post("/register", register)

// login
// http://localhost:1234/api/auth/login
authRouter.post("/login", login)


export { authRouter }