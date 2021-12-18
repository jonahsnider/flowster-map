import got from 'got';
import {APP_URL} from '../config';

// TODO: This is unused but I still want to keep it around
export const http = got.extend({prefixUrl: APP_URL, responseType: 'json'});
