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

  async findByName(name: string, page: number, limit: number): Promise<IUser[] | null> {
    const skip = (page - 1) * limit

    const userDocumentList = await UserDocument.find({ name }).skip(skip).limit(limit)

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

  async getCollectionLength(): Promise<number> {
    return await UserDocument.estimatedDocumentCount()
  }
}
