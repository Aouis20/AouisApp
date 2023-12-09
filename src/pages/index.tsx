import { AuthenticatedAppLayout } from '@/common/AuthenticatedAppLayout';
import { getUserInfo } from '@/features/accounts/helper';
import { redirectToLoginProps } from '@/features/authentication/redirect.helper';
import { getCategories } from '@/features/categories/api';
import { WayCard } from '@/homepage/WayCard';
import { PullStateInstance, PullstateCore } from '@/pullstate.core';
import {
  Accordion,
  Anchor,
  Box,
  Container,
  Flex,
  Group,
  Text,
  Title,
} from '@mantine/core';
import {
  IconArrowsLeftRight,
  IconCurrencyEuro,
  IconShoppingBag,
} from '@tabler/icons-react';
import { HTTPError } from 'ky-universal';
import type { GetServerSidePropsContext, NextPage } from 'next';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';
import { setupPrivateApi } from './api';

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const stateInstance = PullstateCore.instantiate({ ssr: true });
  const api = setupPrivateApi(ctx);

  try {
    await getUserInfo(stateInstance, api);
    const categoryList = await getCategories(api);
    stateInstance.stores.CategoryStore.update((s) => {
      s.categoryList = categoryList;
    });

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

  const ways = {
    buy: {
      title: t('common:buy'),
      description: t('homepage.intro.buy.description'),
      icon: <IconShoppingBag stroke={2.3} />,
      button: t('homepage.intro.buy.button'),
      onclick: 'search',
      img: 'assets/homepage-buy.svg',
    },
    sell: {
      title: t('common:sell'),
      description: t('homepage.intro.sell.description'),
      icon: <IconCurrencyEuro stroke={2.45} />,
      button: t('homepage.intro.sell.button'),
      onclick: 'products/create',
      img: 'assets/homepage-sell.svg',
    },
    exchange: {
      title: t('common:exchange'),
      description: t('homepage.intro.exchange.description'),
      icon: <IconArrowsLeftRight stroke={2.2} />,
      button: t('homepage.intro.exchange.button'),
      onclick: 'products/create',
      img: 'assets/homepage-exchange.svg',
    },
  };

  return (
    <AuthenticatedAppLayout instance={instance}>
      <Head>
        <title>
          {t('content:header.navigation.homepage')} | {t('common:appName')}
        </title>
        <meta name="description" content="Aouis Homepage" />
      </Head>

      {/* Ways */}
      <Container size={'xl'} my={'xl'}>
        <Group noWrap spacing={'xl'}>
          <WayCard way={ways.buy} />
          <WayCard way={ways.sell} />
        </Group>
        <Container my={'xl'}>
          <WayCard way={ways.exchange} />
        </Container>
      </Container>

      <Flex direction={'column'} gap={96} px={128} mt={'xl'}>
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
              <Accordion.Panel>{t('homepage.p3.q1.response')}</Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value="payments">
              <Accordion.Control>
                {t('homepage.p3.q2.question')}
              </Accordion.Control>
              <Accordion.Panel>{t('homepage.p3.q2.response')}</Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value="lost">
              <Accordion.Control>
                {t('homepage.p3.q3.question')}
              </Accordion.Control>
              <Accordion.Panel>{t('homepage.p3.q3.response')}</Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value="security">
              <Accordion.Control>
                {t('homepage.p3.q4.question')}
              </Accordion.Control>
              <Accordion.Panel>{t('homepage.p3.q4.response')}</Accordion.Panel>
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
    </AuthenticatedAppLayout>
  );
};

export default Home;
