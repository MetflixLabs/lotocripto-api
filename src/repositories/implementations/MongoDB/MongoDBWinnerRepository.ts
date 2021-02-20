import { WinnerFactory } from '../../../factories/WinnerFactory'
import { IWinner } from '../../../interfaces/IWinner'
import { WinnerDocument } from '../../../schemas/WinnerSchema'
import { IWinnerRepository } from '../../IWinnerRepository'

export class MongoDBWinnerRepository implements IWinnerRepository {
  async create(winner: IWinner): Promise<boolean> {
    const winnerDocument = await WinnerDocument.create(winner)

    return winnerDocument._id !== null
  }

  async listAll(page: number, limit: number): Promise<IWinner[] | null> {
    const skip = (page - 1) * limit

    const winnerDocument = await WinnerDocument.find({}).skip(skip).limit(limit)

    if (winnerDocument.length === 0) return null

    const winnerList = winnerDocument.map(winnerDocument => {
      const winnerFound = WinnerFactory({
        id: winnerDocument.id,
        userId: winnerDocument.userId,
        transactionId: winnerDocument.transactionId,
        amount: winnerDocument.amount,
        createdAt: winnerDocument.createdAt,
      })

      return winnerFound
    })

    return winnerList
  }

  async listByUserId(userId: string): Promise<IWinner[] | null> {
    const winnerDocument = await WinnerDocument.find({ userId })

    if (winnerDocument.length === 0) return null

    const winnerList = winnerDocument.map(winnerDocument => {
      const winner = WinnerFactory({
        userId: winnerDocument.userId,
        amount: winnerDocument.amount,
        transactionId: winnerDocument.transactionId,
        createdAt: winnerDocument.createdAt,
      })

      return winner
    })

    return winnerList
  }

  async findById(id: unknown): Promise<IWinner | null> {
    const winnerDocument = await WinnerDocument.findById({ _id: id })

    if (!winnerDocument?._id) return null

    const winnerFound = WinnerFactory({
      id: winnerDocument.id,
      userId: winnerDocument.userId,
      transactionId: winnerDocument.transactionId,
      amount: winnerDocument.amount,
      createdAt: winnerDocument.createdAt,
    })

    return winnerFound
  }

  async update(id: unknown, user: IWinner): Promise<boolean> {
    const winnerDocument = await WinnerDocument.findByIdAndUpdate({ _id: id }, user)

    return winnerDocument !== null
  }

  async delete(id: unknown): Promise<boolean> {
    const waitForResponse = (): Promise<unknown> => {
      return new Promise((resolve, reject) => {
        WinnerDocument.findByIdAndDelete(id, (err, outputNotification) => {
          if (err) return reject(err)

          return resolve(outputNotification)
        })
      })
    }

    const wasDeleted = await waitForResponse()

    return wasDeleted !== null
  }

  async findByEmail(email: string): Promise<IWinner | null> {
    const winnerDocument = await WinnerDocument.findOne({ email })

    if (!winnerDocument) return null

    const winnerFound = WinnerFactory({
      id: winnerDocument.id,
      userId: winnerDocument.userId,
      transactionId: winnerDocument.transactionId,
      amount: winnerDocument.amount,
      createdAt: winnerDocument.createdAt,
    })

    return winnerFound
  }

  async getCollectionLength(): Promise<number> {
    return await WinnerDocument.estimatedDocumentCount()
  }
}
