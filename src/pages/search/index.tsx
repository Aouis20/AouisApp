import { AuthenticatedAppLayout } from '@/common/AuthenticatedAppLayout';
import { getUserInfo } from '@/features/accounts/helper';
import { redirectToLoginProps } from '@/features/authentication/redirect.helper';
import { getTokens } from '@/features/authentication/tokens.helper';
import { SearchPage } from '@/features/search/components/SearchPage';
import { setupPrivateApi } from '@/pages/api';
import { PullStateInstance, PullstateCore } from '@/pullstate.core';
import { HTTPError } from 'ky';
import type { GetServerSidePropsContext, NextPage } from 'next';
import { useTranslations } from 'next-intl';
import Head from 'next/head';

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const stateInstance = PullstateCore.instantiate({ ssr: true });
  const api = setupPrivateApi(ctx);

  try {
    const authTokens = getTokens(ctx);
    if (authTokens?.access) {
      await getUserInfo(stateInstance, api);
    }
    return {
      props: {
        snapshot: stateInstance.getPullstateSnapshot(),
        messages: {
          ...(await import(`public/locales/${ctx.locale}/common.json`)).default,
          ...(await import(`public/locales/${ctx.locale}/content.json`))
            .default,
        },
      },
    };
  } catch (e) {
    const error = e as HTTPError;
    if (error?.response?.status === 401) {
      return redirectToLoginProps();
    }
  }
};

interface SearchPageProps {
  snapshot: PullStateInstance;
}

const Search: NextPage<SearchPageProps> = ({ snapshot }) => {
  const instance = PullstateCore.instantiate({ hydrateSnapshot: snapshot });
  const t = useTranslations();

  return (
    <AuthenticatedAppLayout instance={instance}>
      <Head>
        <title>
          {t('header.navigation.search')} | {t('appName')}
        </title>
        <meta name="description" content="Aouis Search" />
      </Head>

      <SearchPage />
    </AuthenticatedAppLayout>
  );
};

export default Search;
