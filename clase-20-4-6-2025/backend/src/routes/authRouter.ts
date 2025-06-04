import { Router } from "express"
import { register } from "../controllers/authController"

// http://localhost:1234/api/auth
const authRouter = Router()

// register
// http://localhost:1234/api/auth/register
authRouter.post("/register", register)

// login


export { authRouter }