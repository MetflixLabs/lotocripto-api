import { Router } from 'express'
import { createUserController } from './useCases/User/CreateUserUseCase'
import { findUserByIdController } from './useCases/User/FindUserByIdUseCase'
const router = Router()

/**
 * @swagger
 *  /users:
 *    post:
 *      description: Create user
 *    responses:
 *      201:
 *        description: Success
 *      500:
 *        description: Failed
 *
 */
router.post('/users', (request, response) => {
  return createUserController.handle(request, response)
})

router.get('/users', (request, response) => {
  return findUserByIdController.handle(request, response)
})

export { router }
