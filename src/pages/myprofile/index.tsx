import { setupPrivateApi } from '@/api';
import { AuthenticatedAppLayout } from '@/common/AuthenticatedAppLayout';
import { getUserInfo } from '@/features/accounts/account.helper';
import { redirectToLoginProps } from '@/features/authentication/redirect.helper';
import MyProfilePage from '@/features/myprofile/components/MyProfilePage';
import { PullStateInstance, PullstateCore } from '@/pullstate.core';
import { HTTPError } from 'ky-universal';
import { GetServerSidePropsContext, NextPage } from 'next';
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
    if (error?.response?.status === 401) {
      return redirectToLoginProps();
    }

    return { props: {} };
  }
};

type MyProfileProps = {
  snapshot: PullStateInstance;
};

const MyProfile: NextPage<MyProfileProps> = ({ snapshot }) => {
  const { t } = useTranslation('common');
  const instance = PullstateCore.instantiate({ hydrateSnapshot: snapshot });

  return (
    <AuthenticatedAppLayout instance={instance}>
      <Head>
        <title>
          {t('appName')} | {t('navigation.myAccount')}
        </title>
        <meta name="description" content="test" />
      </Head>

      <MyProfilePage />
    </AuthenticatedAppLayout>
  );
};

export default MyProfile;
