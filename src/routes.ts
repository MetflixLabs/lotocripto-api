import { Router } from 'express'
import { jwtAuth } from './middlewares/jwtAuth'
import cookieParser from 'cookie-parser'
import { loginController } from './useCases/Access/LoginUseCase'
import { createParticipantController } from './useCases/Participant/CreateParticipantUseCase'
import { listParticipantController } from './useCases/Participant/ListParticipantUseCase'
import { updatePariticipantController } from './useCases/Participant/UpdateParticipantUseCase'
import { createUserController } from './useCases/User/CreateUserUseCase'
import { deleteUserController } from './useCases/User/DeleteUserUseCase'
import { findUserByIdController } from './useCases/User/FindUserByIdUseCase'
import { findUserByNameController } from './useCases/User/FindUserByNameUseCase'
import { listUserController } from './useCases/User/ListUserUseCase'
import { updateUserController } from './useCases/User/UpdateUserUseCase'

const router = Router()

// Login
router.post('/login', (request, response, next) => loginController.handle(request, response, next))

router.use(cookieParser())

// users
router.get('/users', jwtAuth, (request, response) => {
  if (request.body.id) return findUserByIdController.handle(request, response)
  else if (request.body.name) return findUserByNameController.handle(request, response)

  return listUserController.handle(request, response)
})

router.post('/users', jwtAuth, (request, response) =>
  createUserController.handle(request, response)
)
router.put('/users', jwtAuth, (request, response) => updateUserController.handle(request, response))
router.delete('/users', (request, response) => deleteUserController.handle(request, response))

// participants
router.get('/participants', jwtAuth, (request, response) =>
  listParticipantController.handle(request, response)
)
router.post('/participants', jwtAuth, (request, response) =>
  createParticipantController.handle(request, response)
)
router.put('/participants', jwtAuth, (request, response) =>
  updatePariticipantController.handle(request, response)
)

export { router }
