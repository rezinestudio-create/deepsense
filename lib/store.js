import { get, put } from '@vercel/blob';
import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';

export const OWNER_EMAIL = 'rezinestudio@gmail.com';
export const BLOB_PATH = 'deepsense/store-state.json';

// Used only for the very first login. Set OWNER_PASSWORD in Vercel to override this.
const BOOTSTRAP_PASSWORD = process.env.OWNER_PASSWORD || 'DeepsenseOwner2025!';

const NO_STORE = 'no-store, max-age=0';

export function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': NO_STORE
    }
  });
}

export function fail(message, status = 400) {
  return json({ error: message }, status);
}

export async function readJson(request) {
  try {
    const raw = await request.text();
    if (raw.length > 4_000_000) return null;
    return raw ? JSON.parse(raw) : {};
  } catch {
    return null;
  }
}

export function hashPassword(password) {
  const salt = randomBytes(16).toString('hex');
  return {
    salt,
    hash: scryptSync(password, salt, 64).toString('hex')
  };
}

export function verifyPassword(password, record) {
  if (!record || !record.salt || !record.hash) return false;
  const expected = Buffer.from(record.hash, 'hex');
  const actual = scryptSync(password, record.salt, expected.length);
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}

export function bootstrapPasswordRecord() {
  return hashPassword(BOOTSTRAP_PASSWORD);
}

export async function readState() {
  const result = await get(BLOB_PATH, {
    access: 'private',
    useCache: false
  });

  if (!result || result.statusCode !== 200 || !result.stream) return null;

  const text = await new Response(result.stream).text();
  if (!text) return null;

  return {
    ...JSON.parse(text),
    etag: result.blob.etag,
    updatedAt: result.blob.uploadedAt
  };
}

export async function writeState(state) {
  const { etag, updatedAt, ...persisted } = state;

  const result = await put(BLOB_PATH, JSON.stringify(persisted), {
    access: 'private',
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: 'application/json; charset=utf-8',
    cacheControlMaxAge: 60
  });

  return {
    ...persisted,
    etag: result.etag,
    updatedAt: new Date().toISOString()
  };
}

export function publicPayload(state) {
  return {
    products: Array.isArray(state?.products) ? state.products : null,
    payments: Array.isArray(state?.payments) ? state.payments : null,
    updatedAt: state?.updatedAt || null
  };
}

export function ownerPayload(state) {
  return {
    products: Array.isArray(state?.products) ? state.products : [],
    payments: Array.isArray(state?.payments) ? state.payments : [],
    keys: state?.keys && typeof state.keys === 'object' ? state.keys : {},
    updatedAt: state?.updatedAt || null,
    etag: state?.etag || null
  };
}

export function passwordFromRequest(request) {
  return (
    request.headers.get('x-owner-password') ||
    request.headers.get('authorization')?.replace(/^Bearer\s+/i, '') ||
    ''
  );
}

export function isEmailAllowed(email) {
  return String(email || '').trim().toLowerCase() === OWNER_EMAIL.toLowerCase();
}
