import awsLambdaFastify from '@fastify/aws-lambda'
import { app } from './fastify.js'

export const handler = awsLambdaFastify(app)
