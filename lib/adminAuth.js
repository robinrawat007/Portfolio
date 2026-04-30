import { createHmac } from 'crypto';

export function getAdminToken() {
  const secret = process.env.ADMIN_SESSION_SECRET || 'dev-only-insecure-secret';
  const password = process.env.ADMIN_PASSWORD || '';
  return createHmac('sha256', secret)
    .update('admin:' + password)
    .digest('hex');
}

export function validateAdminRequest(request) {
  const auth = request.headers.get('authorization');
  if (!auth?.startsWith('Bearer ')) return false;
  const token = auth.slice(7);
  return token === getAdminToken();
}
