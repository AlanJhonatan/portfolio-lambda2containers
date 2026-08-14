import { app } from './fastify.js'

const configs = {
	port: 8080,
}

app.listen({ ...configs }, (err, address) => {
	if (err) {
		console.error(err)
		process.exit(1)
	}

	console.log(`[listening] ${address}`)
})
