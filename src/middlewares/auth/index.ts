import 'dotenv/config'
import { AuthMiddleware } from './AuthMiddleware'
import { AuthValidation } from './AuthValidation'

const SECRET = process.env.SECRET

const authValidation = new AuthValidation(SECRET)
const authMiddleware = new AuthMiddleware(authValidation)

export default authMiddleware.auth
