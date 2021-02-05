import { SwaggerUiOptions } from 'swagger-ui-express'

export default <SwaggerUiOptions>{
  swagger: '2.0',
  info: {
    version: '1.0.0',
    title: 'lotocripto-api',
    description: 'Node.js express API for www.lotocripto.com.br',
    license: { name: 'MIT', url: 'https://opensource.org/licenses/MIT' }
  },
  host: 'localhost:3333',
  basePath: '/api',
  tags: [{ name: 'Users', description: 'API for users in the system' }],
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  paths: {
    '/users': {
      post: {
        tags: ['Users'],
        description: 'Create new user in system',
        parameters: [
          {
            name: 'user',
            in: 'body',
            description: 'User that we want to create',
            schema: { $ref: '#/definitions/User' }
          }
        ],
        produces: ['application/json'],
        responses: {
          '201': { description: 'New user is created', schema: { $ref: '#/definitions/User' } }
        }
      },
      get: {
        tags: ['Users'],
        summary: 'Get all users in system',
        responses: { '200': { description: 'OK', schema: { $ref: '#/definitions/Users' } } }
      }
    },
    '/users/{userId}': {
      parameters: [
        {
          name: 'userId',
          in: 'path',
          required: true,
          description: 'ID of user that we want to find',
          type: 'string'
        }
      ],
      get: {
        tags: ['Users'],
        summary: 'Get user with given ID',
        responses: {
          '200': { description: 'User is found', schema: { $ref: '#/definitions/User' } }
        }
      },
      delete: {
        summary: 'Delete user with given ID',
        tags: ['Users'],
        responses: {
          '200': { description: 'User is deleted', schema: { $ref: '#/definitions/User' } }
        }
      },
      put: {
        summary: 'Update user with give ID',
        tags: ['Users'],
        parameters: [
          {
            name: 'user',
            in: 'body',
            description: 'User with new values of properties',
            schema: { $ref: '#/definitions/User' }
          }
        ],
        responses: {
          '200': { description: 'User is updated', schema: { $ref: '#/definitions/User' } }
        }
      }
    }
  },
  definitions: {
    User: {
      required: ['email', 'name', 'password'],
      properties: {
        name: { type: 'string', uniqueItems: true },
        email: { type: 'string', uniqueItems: true },
        password: { type: 'string' }
      }
    },
    Users: { type: 'array', $ref: '#/definitions/User' }
  }
}
