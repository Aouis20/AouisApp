import {
  Accordion,
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
        <Paper shadow="sm" p="xl">
          <Title align="center" order={2}>
            Je souhaite...
          </Title>
          <Group position="center" spacing={'xl'} mt={'md'}>
            <Button fz={'xl'} w={140} h={44}>
              Acheter
            </Button>
            <Button fz={'xl'} w={140} h={44}>
              Vendre
            </Button>
            <Button fz={'xl'} w={140} h={44}>
              Echanger
            </Button>
          </Group>
        </Paper>
        <Flex direction={'column'} gap={'lg'} mt={'xl'}>
          <Title>Qu'est-ce que Aouis ?</Title>
          <Text>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam
            voluptatem adipisci amet similique, eius eos animi, ab, minus
            tempora tempore quos. Doloribus quaerat voluptas architecto unde eum
            eaque vitae aspernatur!
          </Text>

          <Title>Comment ça marche ?</Title>
          <Text>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam
            voluptatem adipisci amet similique, eius eos animi, ab, minus
            tempora tempore quos. Doloribus quaerat voluptas architecto unde eum
            eaque vitae aspernatur!
          </Text>

          <Title>FAQ</Title>
          <Accordion variant="separated" radius="md" chevronPosition="left">
            <Accordion.Item value="transactions">
              <Accordion.Control>
                Comment acheter ou vendre un produit ?
              </Accordion.Control>
              <Accordion.Panel>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
                sunt perspiciatis rerum sequi aliquam, doloremque impedit
                corrupti magnam voluptatum fuga dolorem facilis consequatur at
                blanditiis est iste porro quasi veniam.
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value="payments">
              <Accordion.Control>
                Quelles moyens de paiement ?
              </Accordion.Control>
              <Accordion.Panel>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
                sunt perspiciatis rerum sequi aliquam, doloremque impedit
                corrupti magnam voluptatum fuga dolorem facilis consequatur at
                blanditiis est iste porro quasi veniam.
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value="lost">
              <Accordion.Control>
                Le colis est perdu comment faire ?
              </Accordion.Control>
              <Accordion.Panel>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
                sunt perspiciatis rerum sequi aliquam, doloremque impedit
                corrupti magnam voluptatum fuga dolorem facilis consequatur at
                blanditiis est iste porro quasi veniam.
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value="security">
              <Accordion.Control>Est-ce sécurisé ?</Accordion.Control>
              <Accordion.Panel>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo
                labore eos dolor beatae iste. Perspiciatis saepe omnis fugit
                repellendus sunt. Aperiam aliquid deserunt asperiores dolorem
                inventore ullam iste mollitia! Rem.
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>

          <Title>Nous contacter</Title>
          <Text>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam
            voluptatem adipisci amet similique, eius eos animi, ab, minus
            tempora tempore quos. Doloribus quaerat voluptas architecto unde eum
            eaque vitae aspernatur!
          </Text>
        </Flex>
      </Container>
    </AuthenticatedAppLayout>
  );
};

export default Home;
