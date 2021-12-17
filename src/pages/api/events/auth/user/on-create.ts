import type {NextApiHandler} from 'next';
import {z} from 'zod';
import * as firebase from 'firebase-admin';
import {VALID_EMAIL_REGEXP} from '../../../../../config';
import {firestore} from 'firebase-admin';

const userCreateEventSchema = z.object({
	email: z.string().email(),
});

type UserCreateEvent = z.infer<typeof userCreateEventSchema>;

export interface ResponseBody {
	isValid: boolean;
}

const auth = firebase.auth();

const handler: NextApiHandler = async (request, response) => {
	if (request.method !== 'POST') {
		response.status(405);
		return;
	}

	let body: UserCreateEvent;

	try {
		body = userCreateEventSchema.parse(request.body);
	} catch (error) {
		if (error instanceof z.ZodError) {
			response.status(422).json({error: error.message});
			return;
		}

		throw error;
	}

	if (VALID_EMAIL_REGEXP.test(body.email)) {
		response.status(200).json({isValid: true});
	} else {
		const user = await auth.getUserByEmail(body.email);

		await auth.updateUser(user.uid, {disabled: true});
		await firestore().collection('users').doc(user.uid).delete();

		response.status(200).json({isValid: false});
	}
};

export default handler;
