import { Router } from 'express'
import { createParticipantController } from './useCases/Participant/CreateParticipantUseCase'
import { listParticipantController } from './useCases/Participant/ListParticipantUseCase'
import { createUserController } from './useCases/User/CreateUserUseCase'
import { deleteUserController } from './useCases/User/DeleteUserUseCase'
import { findUserByIdController } from './useCases/User/FindUserByIdUseCase'
import { listUserController } from './useCases/User/ListUserUseCase'
import { updateUserController } from './useCases/User/UpdateUserUseCase'
const router = Router()

// users
router.get('/users', (request, response) => {
  if (request.body.id) return findUserByIdController.handle(request, response)

  return listUserController.handle(request, response)
})

router.post('/users', (request, response) => createUserController.handle(request, response))
router.put('/users', (request, response) => updateUserController.handle(request, response))
router.delete('/users', (request, response) => deleteUserController.handle(request, response))

// participants
router.post('/participants', (request, response) =>
  createParticipantController.handle(request, response)
)

router.get('/participants', (request, response) =>
  listParticipantController.handle(request, response)
)

export { router }
