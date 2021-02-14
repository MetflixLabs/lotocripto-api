import { ParticipantFactory } from '../../../factories/ParticipantFactory'
import { IParticipant } from '../../../interfaces/IParticipant'
import { ParticipantDocument } from '../../../schemas/ParticipantSchema'
import { UserDocument } from '../../../schemas/UserSchema'
import { IParticipantRepository } from '../../IParticipantRepository'

export class MongoDBParticipantRepository implements IParticipantRepository {
  async create(participant: IParticipant): Promise<IParticipant> {
    const participantDocument = await ParticipantDocument.create(participant)

    const createdParticipant = ParticipantFactory({
      id: participantDocument._id,
      userId: participantDocument.userId,
      socketId: participantDocument.socketId,
      startDate: participantDocument.startDate,
      elegible: participantDocument.elegible
    })

    return createdParticipant
  }

  async update(id: unknown, participant: IParticipant): Promise<IParticipant | null> {
    const participantDocument = await ParticipantDocument.findByIdAndUpdate(
      { _id: id },
      participant,
      {
        new: true
      }
    )

    if (!participantDocument) return null

    const participantFound = ParticipantFactory({
      id: participantDocument._id,
      userId: participantDocument.userId,
      socketId: participantDocument.socketId,
      startDate: participantDocument.startDate,
      elegible: participantDocument.elegible,
      createdAt: participantDocument.createdAt,
      updatedAt: participantDocument.updatedAt
    })

    return participantFound
  }

  async deleteBySocketId(socketId: string): Promise<boolean> {
    const waitForResponse = (): Promise<unknown> => {
      return new Promise((resolve, reject) => {
        ParticipantDocument.findByIdAndDelete(socketId, (err, outputNotification) => {
          if (err) return reject(err)

          return resolve(outputNotification)
        })
      })
    }

    const wasDeleted = await waitForResponse()

    return wasDeleted !== null
  }

  async listAll(page: number, limit: number): Promise<IParticipant[] | null> {
    const skip = (page - 1) * limit

    const participantDocument = await ParticipantDocument.find({}).skip(skip).limit(limit)

    if (participantDocument.length === 0) return null

    const participantList = participantDocument.map(participantDocument => {
      const participantFound = ParticipantFactory({
        id: participantDocument._id,
        userId: participantDocument.userId,
        socketId: participantDocument.socketId,
        startDate: participantDocument.startDate,
        elegible: participantDocument.elegible
      })

      return participantFound
    })

    return participantList
  }

  async findById(id: unknown): Promise<IParticipant | null> {
    const participantDocument = await ParticipantDocument.findById({ _id: id })

    if (!participantDocument?._id) return null

    const participantFound = ParticipantFactory({
      id: participantDocument._id,
      userId: participantDocument.userId,
      socketId: participantDocument.socketId,
      startDate: participantDocument.startDate,
      elegible: participantDocument.elegible
    })

    return participantFound
  }

  async findBySocketId(socketId: string): Promise<IParticipant | null> {
    const participantDocument = await ParticipantDocument.findOne({ socketId })

    if (!participantDocument) return null

    const participantFound = ParticipantFactory({
      id: participantDocument._id,
      userId: participantDocument.userId,
      socketId: participantDocument.socketId,
      startDate: participantDocument.startDate,
      elegible: participantDocument.elegible
    })

    return participantFound
  }

  async findByUserId(userId: string): Promise<IParticipant | null> {
    const participantDocument = await ParticipantDocument.findOne({ userId })

    if (!participantDocument) return null

    const participantFound = ParticipantFactory({
      id: participantDocument._id,
      userId: participantDocument.userId,
      socketId: participantDocument.socketId,
      startDate: participantDocument.startDate,
      elegible: participantDocument.elegible
    })

    return participantFound
  }

  async deleteAll() {}

  async getCollectionLength(): Promise<number> {
    return await ParticipantDocument.estimatedDocumentCount()
  }
}
