import { model, Schema } from "mongoose";

const authSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, {
  versionKey: false
})

const Auth = model("Auth", authSchema)

export { Auth }