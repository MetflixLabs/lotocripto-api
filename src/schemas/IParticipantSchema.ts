import { model, Schema, Model, Document } from 'mongoose'
import { IParticipant } from '../interfaces/IParticipant'

const ParticipantSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    walletAddress: { type: String, required: true },
    createdAt: { type: Date, default: Date.now(), required: true }
  },
  { timestamps: true }
)

export const ParticipantDocument: Model<Document & IParticipant> = model(
  'rounds',
  ParticipantSchema
)
