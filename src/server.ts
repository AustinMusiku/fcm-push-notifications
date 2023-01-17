import http, { Server } from 'http'
import app from './app'
import { config } from 'dotenv'

config()

const port = process.env.PORT || 8080

app.listen(port, () => {
	console.log('Server is running on port 3000')
})
