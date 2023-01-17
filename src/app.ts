import express, { Application, json, urlencoded } from 'express'
import defaultRoute from './routes/default.route'
import notifyRoute from './routes/notify.route'

class App {
	app: Application

	constructor() {
		this.app = express()
		this.configureMiddlewares()
		this.configureRoutes()
	}

	configureMiddlewares() {
		this.app.use(json())
		this.app.use(urlencoded({ extended: false }))
	}

	configureRoutes() {
		this.app = notifyRoute.configure(this.app)
		this.app = defaultRoute.configure(this.app)
	}
}

export default new App().app
