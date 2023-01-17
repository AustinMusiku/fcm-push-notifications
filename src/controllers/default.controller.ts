import { Request, Response } from 'express'

class DefaultController {
	public async getEnvironmentVariables(req: Request, res: Response) {
		return res.json({
			FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL,
			FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
			FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY
		})
	}
}

export default DefaultController
