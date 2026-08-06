import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { productsController } from "../composition-root.js";

export async function productRoutes(server: FastifyInstance) {
    server.get('/products', async (req: FastifyRequest, reply: FastifyReply) => {
        return productsController.listProducts(req, reply)
    })

    server.get('/products/:id', async (req: FastifyRequest, reply: FastifyReply) => {
        return reply.status(200).send({ status: 'Listing by :id !'})
    })

    server.post('/products/:id', async (req: FastifyRequest, reply: FastifyReply) => {
        return reply.status(200).send({ status: 'Created new Product !'})
    })
}