import {
  bootstrapPasswordRecord,
  fail,
  hashPassword,
  isEmailAllowed,
  json,
  ownerPayload,
  passwordFromRequest,
  readJson,
  readState,
  verifyPassword,
  writeState
} from '../lib/store.js';

export async function POST(request) {
  if (request.method !== 'POST') {
    return fail('Method not allowed', 405);
  }

  const body = await readJson(request);
  if (!body) return fail('Invalid request body.', 400);

  const action = String(body.action || '');

  try {
    if (action === 'login') {
      if (!isEmailAllowed(body.email)) {
        return fail('Access denied. That is not the registered owner account.', 403);
      }

      const password = String(body.password || '');
      let state = await readState();

      if (!state) {
        const seed = bootstrapPasswordRecord();
        if (!verifyPassword(password, seed)) {
          return fail('Incorrect password. Please verify master password and try again.', 401);
        }

        state = {
          products: Array.isArray(body.defaults?.products) ? body.defaults.products : [],
          payments: Array.isArray(body.defaults?.payments) ? body.defaults.payments : [],
          keys: body.defaults?.keys && typeof body.defaults.keys === 'object' ? body.defaults.keys : {},
          passwordHash: seed
        };
        state = await writeState(state);
      } else if (!verifyPassword(password, state.passwordHash)) {
        return fail('Incorrect password. Please verify master password and try again.', 401);
      }

      return json(ownerPayload(state));
    }

    const password = passwordFromRequest(request);
    let state = await readState();

    if (!state) {
      return fail('Store has not been initialized. Log in once from the Owner Console first.', 409);
    }
    if (!verifyPassword(password, state.passwordHash)) {
      return fail('Owner session expired. Please log in again.', 401);
    }

    if (action === 'get') {
      return json(ownerPayload(state));
    }

    if (action === 'save') {
      if (!Array.isArray(body.products) || !Array.isArray(body.payments)) {
        return fail('Invalid store payload.', 400);
      }
      if (!body.keys || typeof body.keys !== 'object' || Array.isArray(body.keys)) {
        return fail('Invalid key inventory.', 400);
      }

      state.products = body.products;
      state.payments = body.payments;
      state.keys = body.keys;
      state = await writeState(state);

      return json(ownerPayload(state));
    }

    if (action === 'changePassword') {
      const newPassword = String(body.newPassword || '');
      if (newPassword.length < 6) {
        return fail('New password must be at least 6 characters long.', 400);
      }

      state.passwordHash = hashPassword(newPassword);
      state = await writeState(state);

      return json(ownerPayload(state));
    }

    return fail('Unknown action.', 400);
  } catch (error) {
    console.error('Owner API error:', error);
    return fail('Unable to reach the shared store. Try again in a moment.', 500);
  }
}
