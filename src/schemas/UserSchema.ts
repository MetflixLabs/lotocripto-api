import { model, Schema, Model, Document } from 'mongoose'
import { IUser } from '../interfaces/IUser'

// export type IUserSchema = Document & IUser

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true, select: true },
    walletAddress: { type: String, required: true },
    createdAt: { type: Date, default: Date.now(), required: true }
  },
  { timestamps: true }
)

export const UserDocument: Model<Document & IUser> = model('users', UserSchema)
