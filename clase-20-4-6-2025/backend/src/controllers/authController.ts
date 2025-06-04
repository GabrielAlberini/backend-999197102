import { Request, Response } from "express";

const register = async (req: Request, res: Response): Promise<any> => {
  try {

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

  } catch (error) {
    const err = error as Error
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
}

export { register, login }