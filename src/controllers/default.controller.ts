import { Request, Response } from 'express'

class DefaultController {
	public async getDefaultRoute(req: Request, res: Response) {
		return res.json({
			status: 200,
			msg: "success hitting default route"
		})
	}
}

export default DefaultController
