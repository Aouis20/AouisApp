import { setupPrivateApi } from '@/api';
import { AuthenticatedAppLayout } from '@/common/AuthenticatedAppLayout';
import { getUserInfo } from '@/features/accounts/account.helper';
import { redirectToLoginProps } from '@/features/authentication/redirect.helper';
import SearchPage from '@/features/search/components/SearchPage';
import { PullStateInstance, PullstateCore } from '@/pullstate.core';
import { HTTPError } from 'ky-universal';
import type { GetServerSidePropsContext, NextPage } from 'next';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const stateInstance = PullstateCore.instantiate({ ssr: true });
  const api = setupPrivateApi(ctx);

  try {
    await getUserInfo(stateInstance, api);

    return { props: { snapshot: stateInstance.getPullstateSnapshot() } };
  } catch (e) {
    const error = e as HTTPError;
    if (error.response?.status === 401) {
      return redirectToLoginProps();
    }

    return { props: {} };
  }
};

interface SearchPageProps {
  snapshot: PullStateInstance;
}

const Search: NextPage<SearchPageProps> = ({ snapshot }) => {
  const instance = PullstateCore.instantiate({ hydrateSnapshot: snapshot });
  const { t } = useTranslation('common');

  return (
    <AuthenticatedAppLayout instance={instance}>
      <Head>
        <title>
          {t('navigation.search')} | {t('appName')}
        </title>
        <meta name="description" content="Aouis Search" />
      </Head>

      <SearchPage />
    </AuthenticatedAppLayout>
  );
};

export default Search;
