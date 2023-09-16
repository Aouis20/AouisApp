import ky from 'ky-universal';
import { KyInstance } from 'ky/distribution/types/ky';
import { GetServerSidePropsContext } from 'next';
import { refreshUserAccessToken } from '../features/authentication/api';
import { getTokens, setTokens } from '../features/authentication/tokens.helper';

const API_BASE_URL = 'http://127.0.0.1:8000';

export const setupPrivateApi = (ctx?: GetServerSidePropsContext): KyInstance => {
  const authTokens = getTokens(ctx);

  const baseInstance = ky.create({
    prefixUrl: API_BASE_URL,
    retry: 0
  });

  return baseInstance.extend({
    retry: {
      limit: 2,
      methods: ['get', 'post', 'put', 'patch', 'head', 'delete', 'options'],
      statusCodes: [401]
    },
    hooks: {
      beforeRequest: [
        (request) => {
          if (!request.headers.has('authorization') && authTokens?.access) {
            request.headers.set('Authorization', `Bearer ${authTokens.access}`);
          }
        }
      ],
      beforeRetry: [
        async ({ request }) => {
          if (!authTokens?.access) {
            return;
          }

          const { access } = await refreshUserAccessToken(authTokens, baseInstance);
          authTokens.access = access;
          request.headers.set('Authorization', `Bearer ${access}`);
          setTokens(authTokens, ctx);
        }
      ]
    }
  });
};

export const setupPublicApi = (): KyInstance => {
  const baseInstance = ky.create({
    prefixUrl: API_BASE_URL,
    retry: 0
  });

  return baseInstance;
};
