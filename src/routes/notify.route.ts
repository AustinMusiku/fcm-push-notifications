import { Application } from 'express'
import NotifyController from '../controllers/notify.controller'

const notifyController = new NotifyController()

class NotifyRoute {
	public configure(app: Application): Application {
		app.route('/notify').post(notifyController.notifyUser)

		return app
	}
}

export default new NotifyRoute()
