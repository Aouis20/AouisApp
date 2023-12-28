import { AuthenticatedAppLayout } from '@/common/AuthenticatedAppLayout';
import { getAccountById } from '@/features/accounts/api';
import { AccountDetails } from '@/features/accounts/components/AccountDetails';
import { getUserInfo } from '@/features/accounts/helper';
import { redirectToLoginProps } from '@/features/authentication/redirect.helper';
import { getTokens } from '@/features/authentication/tokens.helper';
import { setupPrivateApi } from '@/pages/api';
import { PullStateInstance, PullstateCore } from '@/pullstate.core';
import { Box } from '@mantine/core';
import { HTTPError } from 'ky-universal';
import { GetServerSidePropsContext, NextPage } from 'next';
import { useTranslations } from 'next-intl';
import Head from 'next/head';

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const stateInstance = PullstateCore.instantiate({ ssr: true });
  const api = setupPrivateApi(ctx);
  const id = Number(ctx.params?.id);

  try {
    const authTokens = getTokens(ctx);
    if (authTokens?.access) {
      await getUserInfo(stateInstance, api);
    }
    const account = await getAccountById(id, api);
    stateInstance.stores.AccountStore.update((s) => {
      s.account = account;
    });

    return { props: { snapshot: stateInstance.getPullstateSnapshot() } };
  } catch (e) {
    const error = e as HTTPError;
    if (error?.response?.status === 401) {
      return redirectToLoginProps();
    }

    return { props: {} };
  }
};

type UsersPageProps = {
  snapshot: PullStateInstance;
};

const UsersPage: NextPage<UsersPageProps> = ({ snapshot }) => {
  const t = useTranslations();
  const instance = PullstateCore.instantiate({ hydrateSnapshot: snapshot });

  return (
    <AuthenticatedAppLayout instance={instance}>
      <Head>
        <title>
          {t('appName')} | {t('header.navigation.users')}
        </title>
        <meta name="description" content="test" />
      </Head>

      <Box
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: 'calc(100vh - 64px)',
          paddingTop: '32px',
        }}
      >
        <AccountDetails />
      </Box>
    </AuthenticatedAppLayout>
  );
};

export default UsersPage;
