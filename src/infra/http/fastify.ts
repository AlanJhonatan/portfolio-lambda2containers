import fastify from 'fastify'
import { productRoutes } from './routes.js'

const app = fastify()

app.register(productRoutes)

export { app }
