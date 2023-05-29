import { GetServerSidePropsContext } from 'next';
import { parseCookies, setCookie, destroyCookie } from 'nookies';

export const accessTokenCookie = 'edko.access';
export const refreshTokenCookie = 'edko.refresh';

export type TokensType = {
  access: string;
  refresh: string;
};

export const getTokens = (ctx?: GetServerSidePropsContext): TokensType | null => {
  const cookies = parseCookies(ctx);
  const access = cookies[accessTokenCookie] || null;
  const refresh = cookies[refreshTokenCookie] || null;

  if (!(access && refresh)) {
    return null;
  }

  return {
    access,
    refresh
  };
};

export const setTokens = (tokens: TokensType, ctx?: GetServerSidePropsContext) => {
  setCookie(ctx, accessTokenCookie, tokens.access, { path: '/' });
  setCookie(ctx, refreshTokenCookie, tokens.refresh, { path: '/' });
};

export const removeTokens = (ctx?: GetServerSidePropsContext) => {
  destroyCookie(ctx, accessTokenCookie, { path: '/' });
  destroyCookie(ctx, refreshTokenCookie, { path: '/' });
};
