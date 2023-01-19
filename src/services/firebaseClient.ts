import * as admin from 'firebase-admin'

interface Message {
	title: string
	body: string
}

interface SendMessageOptions {
	sendToSpecificDeviceToken?: string
	opponent: string
	gameID: string
}

export class FirebaseClient {
	public firebaseClient = !admin.apps.length
		? admin.initializeApp({
				credential: admin.credential.cert({
					clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
					privateKey: process.env.FIREBASE_PRIVATE_KEY,
					projectId: process.env.FIREBASE_PROJECT_ID,
				}),
				serviceAccountId: process.env.FIREBASE_CLIENT_EMAIL,
		  })
		: admin

	async sendNotification(message: Message, options: SendMessageOptions) {
		const messageData = {
			data: {
				link: `https://xoisland.up.railway.app/multiplayer?mode=hosted&opponent=${options.opponent}&gameId=${options.gameID}`,
			},
			notification: {
				title: message.title,
				body: message.body,
			},
			webpush: {
				notification: {
					icon: 'https://xoisland.up.railway.app/maskable_icon.png',
				},
				fcmOptions: {
					link: `https://xoisland.up.railway.app/multiplayer?mode=hosted&opponent=${options.opponent}&gameId=${options.gameID}`,
				},
			},
			token: options.sendToSpecificDeviceToken,
		} as admin.messaging.Message

		const response = await this.firebaseClient.messaging().send(messageData)
		
		return response
	}
}
