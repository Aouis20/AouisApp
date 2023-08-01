import { Button, Container, Flex, Paper, Space, Text } from '@mantine/core';
import { HTTPError } from 'ky-universal';
import type { GetServerSidePropsContext, NextPage } from 'next';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';
import { setupPrivateApi } from '../api';
import { AuthenticatedAppLayout } from '../common/AuthenticatedAppLayout';
import { getUserInfo } from '../features/accounts/account.helper';
import { redirectToLoginProps } from '../features/authentication/redirect.helper';
import { PullStateInstance, PullstateCore } from '../pullstate.core';

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

interface HomePageProps {
  snapshot: PullStateInstance;
}

const Home: NextPage<HomePageProps> = ({ snapshot }) => {
  const instance = PullstateCore.instantiate({ hydrateSnapshot: snapshot });
  const { t } = useTranslation('common');

  return (
    <AuthenticatedAppLayout instance={instance}>
      <Head>
        <title>
          {t('navigation.homepage')} | {t('appName')}
        </title>
        <meta name="description" content="Aouis Homepage" />
      </Head>

      <Container size={'md'}>
        <Container pb={40}>
          <Flex justify={'center'} gap={'xl'}>
            <Button fz={'xl'} w={140} h={44}>
              Acheter
            </Button>
            <Space w="xl" />
            <Button fz={'xl'} w={140} h={44}>
              Vendre
            </Button>
            <Space w="xl" />
            <Button fz={'xl'} w={140} h={44}>
              Echanger
            </Button>
          </Flex>
        </Container>
        <Paper shadow="sm" p="md">
          <Text>Paper is the most basic ui component</Text>
          <Text>
            Use it to create cards, dropdowns, modals and other components that
            require background with shadow
          </Text>
        </Paper>
      </Container>
    </AuthenticatedAppLayout>
  );
};

export default Home;
