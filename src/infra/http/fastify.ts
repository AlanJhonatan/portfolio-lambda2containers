import fastify from 'fastify'
import { productRoutes, orderRoutes } from './routes.js'

const app = fastify()

app.register(productRoutes)
app.register(orderRoutes)

export { app }
