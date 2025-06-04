import { Request, Response } from "express";
import bcryptjs from "bcryptjs"
import { Auth } from "../models/authModel";

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
      data: newUser
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

    res.json({
      success: true,
      message: "usuario logueado"
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