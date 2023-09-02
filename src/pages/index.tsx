import {
  Accordion,
  Anchor,
  Box,
  Button,
  Container,
  Flex,
  Group,
  Paper,
  Text,
  Title,
} from '@mantine/core';
import { HTTPError } from 'ky-universal';
import type { GetServerSidePropsContext, NextPage } from 'next';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';
import { AuthenticatedAppLayout } from '../common/AuthenticatedAppLayout';
import { getUserInfo } from '../features/accounts/helper';
import { redirectToLoginProps } from '../features/authentication/redirect.helper';
import { PullStateInstance, PullstateCore } from '../pullstate.core';
import { setupPrivateApi } from './api';

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
  const { t } = useTranslation('content');

  return (
    <AuthenticatedAppLayout instance={instance}>
      <Head>
        <title>
          {t('common:navigation.homepage')} | {t('common:appName')}
        </title>
        <meta name="description" content="Aouis Homepage" />
      </Head>

      <Container size={'md'}>
        <Paper shadow="sm" p="xl">
          <Title align="center" order={2}>
            {t('homepage.introduction')}
          </Title>
          <Group position="center" spacing={'xl'} mt={'md'}>
            <Button fz={'xl'} w={140} h={44}>
              {t('common:buy')}
            </Button>
            <Button fz={'xl'} w={140} h={44}>
              {t('common:sell')}
            </Button>
            <Button fz={'xl'} w={140} h={44}>
              {t('common:exchange')}
            </Button>
          </Group>
        </Paper>
        <Flex direction={'column'} gap={'xl'} mt={'xl'}>
          {/* What is Aouis */}
          <Group spacing={'md'}>
            <Title>{t('homepage.p1.title')}</Title>
            <Text>{t('homepage.p1.text')}</Text>
          </Group>

          {/* How does it work */}
          <Group spacing={'md'}>
            <Title>{t('homepage.p2.title')}</Title>
            <Text>{t('homepage.p2.text')}</Text>
          </Group>

          {/* FAQ */}
          <Box>
            <Title mb={'md'}>{t('homepage.p3.title')}</Title>
            <Accordion variant="separated" radius="md" chevronPosition="left">
              <Accordion.Item value="transactions">
                <Accordion.Control>
                  {t('homepage.p3.q1.question')}
                </Accordion.Control>
                <Accordion.Panel>
                  {t('homepage.p3.q1.response')}
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item value="payments">
                <Accordion.Control>
                  {t('homepage.p3.q2.question')}
                </Accordion.Control>
                <Accordion.Panel>
                  {t('homepage.p3.q2.response')}
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item value="lost">
                <Accordion.Control>
                  {t('homepage.p3.q3.question')}
                </Accordion.Control>
                <Accordion.Panel>
                  {t('homepage.p3.q3.response')}
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item value="security">
                <Accordion.Control>
                  {t('homepage.p3.q4.question')}
                </Accordion.Control>
                <Accordion.Panel>
                  {t('homepage.p3.q4.response')}
                </Accordion.Panel>
              </Accordion.Item>
            </Accordion>
          </Box>

          {/* Contact */}
          <Box>
            <Title mb={'md'}>{t('contact.title')}</Title>
            <Text>
              {t('contact.text')}{' '}
              <Anchor span href={`mailto:${t('contact.email')}`}>
                {t('contact.email')}
              </Anchor>
            </Text>
            <Text>{t('contact.text2')}</Text>
          </Box>
        </Flex>
      </Container>
    </AuthenticatedAppLayout>
  );
};

export default Home;
