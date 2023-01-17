import { Request, Response } from 'express'
import { FirebaseClient } from '../services/firebaseClient'

interface SendNotificationBody {
	title: string
	body: string
	imageUrl?: string
	sendToSpecificDeviceToken?: string
	gameID: string
}

class NotifyController {
	public async notifyUser(req: Request, res: Response) {
		const { title, body, sendToSpecificDeviceToken, gameID } =
			req.body as SendNotificationBody

		try {
			const response = await new FirebaseClient().sendNotification(
				{ title, body },
				{ sendToSpecificDeviceToken, gameID }
			)

			if (response) {
				return res.json({ message: 'Push notification has been sent!' })
			}

			return res.status(400).json({ message: response })
		} catch (error) {
			return res.status(500).json(error)
		}
	}
}

export default NotifyController
