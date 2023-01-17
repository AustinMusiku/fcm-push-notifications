import { Application } from 'express'
import DefaultController from '../controllers/default.controller'

const defaultController = new DefaultController()

class DefaultRoute {
	public configure(app: Application): Application {
		app.route('/').get(defaultController.getEnvironmentVariables)

		return app
	}
}

export default new DefaultRoute()
