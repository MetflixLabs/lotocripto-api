import { Router } from 'express'
import { createUserController } from './useCases/User/CreateUserUseCase'
import { deleteUserController } from './useCases/User/DeleteUserUseCase'
import { findUserByIdController } from './useCases/User/FindUserByIdUseCase'
import { listUserController } from './useCases/User/ListUserUseCase'
import { updateUserController } from './useCases/User/UpdateUserUseCase'
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
  if (request.body.id) return findUserByIdController.handle(request, response)

  return listUserController.handle(request, response)
})

router.put('/users', (request, response) => {
  return updateUserController.handle(request, response)
})

router.delete('/users', (request, response) => {
  return deleteUserController.handle(request, response)
})

export { router }
