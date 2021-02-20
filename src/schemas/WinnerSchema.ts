import { model, Schema, Model, Document } from 'mongoose'
import { IWinner } from '../interfaces/IWinner'

const WinnerSchema: Schema = new Schema(
  {
    userId: { type: String, required: true },
    transactionId: { type: String, required: true },
    amount: { type: String, required: true },
  },
  { timestamps: true }
)

export const WinnerDocument: Model<Document & IWinner> = model('winners', WinnerSchema)
