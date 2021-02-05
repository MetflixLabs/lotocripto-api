import express from 'express'
import { router } from './routes'
import mongoose from 'mongoose'
import swaggerUI from 'swagger-ui-express'
import swaggerDocument from './swagger/docs'

mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_USER_PWD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
)

const app = express()

const swaggerOptions = {
  ...swaggerDocument,
  apis: ['src/routes.ts']
}

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerOptions))
app.use(express.json())
app.use('/api', router)

export { app }
