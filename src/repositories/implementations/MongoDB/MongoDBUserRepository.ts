import { UserFactory } from '../../../factories/UserFactory'
import { IUser } from '../../../interfaces/IUser'
import { UserDocument } from '../../../schemas/UserSchema'
import { IUserRepository } from '../../IUserRepository'

export class MongoDBUserRepository implements IUserRepository {
  async create(user: IUser): Promise<boolean> {
    const userDocument = await UserDocument.create(user)

    return userDocument._id !== null
  }

  async listAll(page: number, limit: number): Promise<IUser[] | null> {
    const skip = (page - 1) * limit

    const userDocumentList = await UserDocument.find({}).skip(skip).limit(limit)

    if (userDocumentList.length === 0) return null

    const userList = userDocumentList.map((userDocument: IUser) => {
      const userFound = UserFactory({
        id: userDocument.id,
        name: userDocument.name,
        email: userDocument.email,
        walletAddress: userDocument.walletAddress,
        createdAt: userDocument.createdAt,
        updatedAt: userDocument.updatedAt
      })

      return userFound
    })

    return userList
  }

  async findByName(name: string): Promise<IUser | null> {
    const userDocument = await UserDocument.findOne({ name })

    if (!userDocument) return null

    const userFound = UserFactory({
      id: userDocument.id,
      name: userDocument.name,
      email: userDocument.email,
      password: userDocument.password,
      walletAddress: userDocument.walletAddress,
      createdAt: userDocument.createdAt,
      updatedAt: userDocument.updatedAt
    })

    return userFound
  }

  async findById(id: unknown): Promise<IUser | null> {
    const userDocument = await UserDocument.findById({ _id: id })

    if (!userDocument?._id) return null

    const userFound = UserFactory({
      id: userDocument.id,
      name: userDocument.name,
      email: userDocument.email,
      walletAddress: userDocument.walletAddress,
      createdAt: userDocument.createdAt,
      updatedAt: userDocument.updatedAt
    })

    return userFound
  }

  async update(id: unknown, user: IUser): Promise<boolean> {
    const userDocument = await UserDocument.findByIdAndUpdate({ _id: id }, user)

    return userDocument !== null
  }

  async delete(id: unknown): Promise<boolean> {
    const waitForResponse = (): Promise<unknown> => {
      return new Promise((resolve, reject) => {
        UserDocument.findByIdAndDelete(id, (err, outputNotification) => {
          if (err) return reject(err)

          return resolve(outputNotification)
        })
      })
    }

    const wasDeleted = await waitForResponse()

    return wasDeleted !== null
  }

  async findByEmail(email: string): Promise<IUser | null> {
    const userDocument = await UserDocument.findOne({ email })

    if (!userDocument) return null

    const userFound = UserFactory({
      id: userDocument._id,
      name: userDocument.name,
      email: userDocument.email,
      walletAddress: userDocument.walletAddress,
      createdAt: userDocument.createdAt,
      updatedAt: userDocument.updatedAt
    })

    return userFound
  }

  async findByWallet(walletAddress: string): Promise<IUser | null> {
    const userDocument = await UserDocument.findOne({ walletAddress })

    if (!userDocument) return null

    const userFound = UserFactory({
      id: userDocument.id,
      name: userDocument.name,
      email: userDocument.email,
      password: userDocument.password,
      walletAddress: userDocument.walletAddress,
      createdAt: userDocument.createdAt,
      updatedAt: userDocument.updatedAt
    })

    return userFound
  }

  async getCollectionLength(): Promise<number> {
    return await UserDocument.estimatedDocumentCount()
  }
}
