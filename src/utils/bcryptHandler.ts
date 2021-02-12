import bcrypt from 'bcrypt'
const SALT_ROUNDS = 10

interface IBcryptHandler {
  encrypt: (plainPassword: string) => Promise<string>
  compare: (plainPassword: string, hash: string) => Promise<boolean>
}

export const bcryptHandler: IBcryptHandler = {
  encrypt: async (plainPassword: string) => await bcrypt.hash(plainPassword, SALT_ROUNDS),
  compare: async (plainPassword: string, hash: string) => await bcrypt.compare(plainPassword, hash)
}
