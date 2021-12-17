import got from 'got';
import {API_URL} from '../config';

export const http = got.extend({prefixUrl: API_URL, responseType: 'json'});
