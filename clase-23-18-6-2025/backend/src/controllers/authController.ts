import { Request, Response } from "express";
import bcryptjs from "bcryptjs"
import { Auth } from "../models/authModel";
import jwt from "jsonwebtoken"

process.loadEnvFile()

interface User {
  username: string
  email: string
  password: string
}

const register = async (req: Request, res: Response): Promise<any> => {
  try {
    const body = req.body
    const { username, email, password }: User = body

    // hashear la contraseña
    const hash = await bcryptjs.hash(password, 10)

    const newDataUser = { username, email, password: hash }

    const newUser = new Auth(newDataUser)
    await newUser.save()

    res.status(201).json({
      success: true,
      message: "usuario creado con éxito",
      data: { _id: newUser._id, username: newDataUser.username, email: newDataUser.email }
    })
  } catch (error) {
    const err = error as Error
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
}

const login = async (req: Request, res: Response): Promise<any> => {
  try {
    const body = req.body
    const { email, password }: Partial<User> = body

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "data invalida"
      })
    }

    const user = await Auth.findOne({ email })
    if (!user) {
      return res.status(401).json({ success: false, message: "unathorized" })
    }

    const validatePassword = await bcryptjs.compare(password, user.password)

    if (!validatePassword) {
      return res.status(401).json({ success: false, message: "unathorized" })
    }

    // generar el permiso que permita el acceso a los productos
    // token -> credencial 
    // 1 - payload -> la información del usuario logueado 
    // 2 - clave secreta -> clave que valida mi token
    // 3 - tiempo de expiración -> sesión

    const payload = { _id: user._id, username: user.username }
    const secretKey = process.env.JWT_SECRET!

    const token = jwt.sign(payload, secretKey, { expiresIn: "1m" })

    res.json({
      success: true,
      message: "usuario logueado",
      token
    })
  } catch (error) {
    const err = error as Error
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
}

export { register, login }