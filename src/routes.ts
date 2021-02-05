import { Router } from 'express'
import { createPriceController } from './useCases/User/CreateUserUseCase'
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
  return createPriceController.handle(request, response)
})

export { router }
