import { AuthenticatedAppLayout } from '@/common/AuthenticatedAppLayout';
import { getUserInfo } from '@/features/accounts/helper';
import { AccountStore } from '@/features/accounts/store';
import { redirectToLoginProps } from '@/features/authentication/redirect.helper';
import { ProfilePageContainer } from '@/features/profile/components/ProfilePageContainer';
import { MessagesTab } from '@/features/profile/components/Tabs/Messages';
import { setupPrivateApi } from '@/pages/api';
import { PullStateInstance, PullstateCore } from '@/pullstate.core';
import { Text } from '@mantine/core';
import { HTTPError } from 'ky-universal';
import { GetServerSidePropsContext, NextPage } from 'next';
import { useTranslations } from 'next-intl';
import Head from 'next/head';
import { useRouter } from 'next/router';

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const stateInstance = PullstateCore.instantiate({ ssr: true });
  const api = setupPrivateApi(ctx);

  try {
    await getUserInfo(stateInstance, api);

    return {
      props: {
        snapshot: stateInstance.getPullstateSnapshot(),
        messages: {
          ...(await import(`public/locales/${ctx.locale}/common.json`)).default,
          ...(await import(`public/locales/${ctx.locale}/profile.json`)).default,
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

    return { props: {} };
  }
};

type MyMessagesProps = {
  snapshot: PullStateInstance;
};

const MyMessages: NextPage<MyMessagesProps> = ({ snapshot }) => {
  const t = useTranslations();
  const instance = PullstateCore.instantiate({ hydrateSnapshot: snapshot });
  const user = AccountStore.useState((s) => s.user);
  const router = useRouter();

  if (!user) {
    return <Text>Veuillez vous authentifier</Text>;
  }

  return (
    <AuthenticatedAppLayout instance={instance}>
      <Head>
        <title>
          {t('appName')} | {t('myAccount')}
        </title>
        <meta name="description" content="Aouis Profile" />
      </Head>
      <ProfilePageContainer>
        <MessagesTab />
      </ProfilePageContainer>
    </AuthenticatedAppLayout>
  );
};

export default MyMessages;
