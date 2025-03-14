import createClient, { Middleware } from 'openapi-fetch';
import { toast } from 'sonner';

import { env } from '@/config/env';
import type { paths } from '@/lib/api/v1';

const getAccessToken = (): string | null => {
  return localStorage.getItem('accessToken');
};

const authMiddleware: Middleware = {
  onRequest({ request }) {
    if (
      UNPROTECTED_ROUTES.some((pathname) => request.url.startsWith(pathname))
    ) {
      return undefined;
    }

    const accessToken = getAccessToken();
    if (accessToken) {
      request.headers.set('Authorization', `Bearer ${accessToken}`);
    }
    return request;
  },
  async onResponse({ response }) {
    if (!response.ok) {
      const json = await response.json();
      if (json.message) {
        toast.error(json.message);
      } else {
        toast.error(response.statusText);
      }
    }
    return response;
  },
};

const UNPROTECTED_ROUTES = ['/api/auth/login', '/api/auth/register'];

const client = createClient<paths>({ baseUrl: env.API_URL });
client.use(authMiddleware);

export default client;
