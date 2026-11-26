import { fail, json, publicPayload, readState } from '../lib/store.js';

export async function GET(request) {
  if (request.method !== 'GET') {
    return fail('Method not allowed', 405);
  }

  try {
    const state = await readState();
    return json(publicPayload(state));
  } catch (error) {
    console.error('Failed to read public store state:', error);
    return fail('Unable to load store data.', 500);
  }
}
