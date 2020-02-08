const cors = require('cors')
const { PORT_ORIGIN } = require('../constants')

const corsMiddleware = cors({
	origin: process.env.CORS_ORIGIN || PORT_ORIGIN,
	credentials: true
})

module.exports = corsMiddleware
