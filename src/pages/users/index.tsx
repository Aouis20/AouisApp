import { AuthenticatedAppLayout } from '@/common/AuthenticatedAppLayout';
import { getUserList } from '@/features/accounts/api';
import AccountList from '@/features/accounts/components/AccountPage';
import { getUserInfo } from '@/features/accounts/helper';
import { redirectToLoginProps } from '@/features/authentication/redirect.helper';
import { setupPrivateApi } from '@/pages/api';
import { PullStateInstance, PullstateCore } from '@/pullstate.core';
import { Box } from '@mantine/core';
import { HTTPError } from 'ky-universal';
import { GetServerSidePropsContext, NextPage } from 'next';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const stateInstance = PullstateCore.instantiate({ ssr: true });
  const api = setupPrivateApi(ctx);

  try {
    await getUserInfo(stateInstance, api);
    const userList = await getUserList(api);
    stateInstance.stores.AccountStore.update((s) => {
      s.userList = userList;
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
  const { t } = useTranslation('common');
  const instance = PullstateCore.instantiate({ hydrateSnapshot: snapshot });

  return (
    <AuthenticatedAppLayout instance={instance}>
      <Head>
        <title>
          {t('appName')} | {t('content:header.navigation.users')}
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
        <AccountList />
      </Box>
    </AuthenticatedAppLayout>
  );
};

export default UsersPage;
