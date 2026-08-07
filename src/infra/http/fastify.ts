import fastify from "fastify";
import { productRoutes } from "./routes.js";

const server = fastify();

const configs = {
    port: 8080
}

server.register(productRoutes)

server.listen({ ...configs }, (err, address) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }

  console.log(`Server listening at ${address}`)
})