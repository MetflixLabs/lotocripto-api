import { UserFactory } from '../../../factories/UserFactory'
import { IUser } from '../../../interfaces/IUser'
import { UserDocument } from '../../../schemas/UserSchema'
import { IUserRepository } from '../../IUserRepository'

export class MongoDBUserRepository implements IUserRepository {
  async create(user: IUser): Promise<IUser> {
    const userDocument = await UserDocument.create(user)

    const createdPrice = UserFactory({
      id: userDocument._id,
      name: userDocument.name,
      email: userDocument.name,
      password: userDocument.password,
      walletAddress: userDocument.walletAddress,
      createdAt: userDocument.createdAt,
      updatedAt: userDocument.updatedAt
    })

    return createdPrice
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
        password: userDocument.password,
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

    const foundPrice = UserFactory({
      id: userDocument.id,
      name: userDocument.name,
      email: userDocument.email,
      password: userDocument.password,
      walletAddress: userDocument.walletAddress,
      createdAt: userDocument.createdAt,
      updatedAt: userDocument.updatedAt
    })

    return foundPrice
  }

  async update(id: unknown, user: IUser): Promise<IUser | null> {
    const userDocument = await UserDocument.findByIdAndUpdate({ _id: id }, user, {
      new: true
    })

    if (!userDocument) return null

    const updatedUser = UserFactory({
      id: userDocument._id,
      walletAddress: userDocument.walletAddress,
      name: userDocument.name,
      password: userDocument.password,
      email: userDocument.email,
      createdAt: userDocument.createdAt,
      updatedAt: userDocument.updatedAt
    })

    return updatedUser
  }

  async delete(id: unknown): Promise<unknown> {
    const waitForResponse = (): Promise<unknown> => {
      return new Promise((resolve, reject) => {
        UserDocument.findByIdAndDelete(id, (err, outputNotification) => {
          if (err) return reject(err)

          return resolve(outputNotification)
        })
      })
    }

    return await waitForResponse()
  }

  async findByEmail(email: string): Promise<IUser | null> {
    const userDocument = await UserDocument.findOne({ email })

    if (!userDocument) return null

    const userFound = UserFactory({
      id: userDocument._id,
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
