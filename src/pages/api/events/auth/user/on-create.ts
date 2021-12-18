import type firebase from 'firebase-admin';
import {firestore} from 'firebase-admin';
import type {NextApiHandler} from 'next';
import {z} from 'zod';
import {Firebase} from '../../../../../backend/firebase';
import {VALID_EMAIL_REGEXP} from '../../../../../config';

const userCreateEventSchema = z.object({
	email: z.string().email(),
});

type UserCreateEvent = z.infer<typeof userCreateEventSchema>;

export interface ResponseBody {
	isValid: boolean;
}

const auth = Firebase.app.auth();

const handler: NextApiHandler<{isValid: boolean} | {error: string}> = async (request, response) => {
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

	const isValid = VALID_EMAIL_REGEXP.test(body.email);
	response.status(200).json({isValid});

	if (!isValid) {
		let user: firebase.auth.UserRecord;

		try {
			user = await auth.getUserByEmail(body.email);
		} catch (error) {
			if (error instanceof Error && (error as Error & {code: string}).code === 'auth/user-not-found') {
				// Don't let attackers use this route to enumerate accounts by email, silently continue
				return;
			}

			throw error;
		}

		if (!user.disabled) {
			await auth.updateUser(user.uid, {disabled: true});
		}

		await firestore().collection('users').doc(user.uid).delete();
	}
};

export default handler;
