import process from 'process';

export const API_KEYS = {
	/* eslint-disable @typescript-eslint/naming-convention */
	GOOGLE_MAPS: 'AIzaSyAL92XIhZ_1DbgM_t3b9hgfawPDsqY8VZU',
	/* eslint-enable @typescript-eslint/naming-convention */
} as const;

export const API_URL = process.env.VERCEL ? `https://${process.env.VERCEL_URL!}` : 'http://localhost:3000';

export const VALID_EMAIL_REGEXP = /@voiceflow\.com$/i;
