import { model, Schema, Model, Document } from 'mongoose'
import { IParticipant } from '../interfaces/IParticipant'

const ParticipantSchema: Schema = new Schema(
  {
    userId: { type: String, required: true },
    socketId: { type: String, required: true },
    startDate: { type: String, required: true },
    elegible: { type: Boolean },
    createdAt: { type: Date, default: Date.now(), required: true }
  },
  { timestamps: true }
)

export const ParticipantDocument: Model<Document & IParticipant> = model(
  'participants',
  ParticipantSchema
)
