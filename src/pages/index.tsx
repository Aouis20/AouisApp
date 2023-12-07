import { AuthenticatedAppLayout } from '@/common/AuthenticatedAppLayout';
import { getUserInfo } from '@/features/accounts/helper';
import { redirectToLoginProps } from '@/features/authentication/redirect.helper';
import { getCategories } from '@/features/categories/api';
import { PullStateInstance, PullstateCore } from '@/pullstate.core';
import {
  Accordion,
  Anchor,
  AspectRatio,
  Box,
  Button,
  Flex,
  Group,
  Image,
  Paper,
  Text,
  Title,
  createStyles,
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

const useStyle = createStyles((theme) => ({
  paper: {
    transition: 'all .4s ease-in-out',
    cursor: 'pointer',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
}));

const Home: NextPage<HomePageProps> = ({ snapshot }) => {
  const instance = PullstateCore.instantiate({ hydrateSnapshot: snapshot });
  const { t } = useTranslation('content');
  const { classes } = useStyle();

  const ways = [
    {
      title: t('common:buy'),
      description: t('homepage.intro.buy.description'),
      icon: IconShoppingBag,
      button: t('homepage.intro.buy.button'),
      img: 'assets/homepage-buy.svg',
    },
    {
      title: t('common:sell'),
      description: t('homepage.intro.sell.description'),
      icon: IconCurrencyEuro,
      button: t('homepage.intro.sell.button'),
      img: 'assets/homepage-sell.svg',
    },
    {
      title: t('common:exchange'),
      description: t('homepage.intro.exchange.description'),
      icon: IconArrowsLeftRight,
      button: t('homepage.intro.exchange.button'),
      img: 'assets/homepage-exchange.svg',
    },
  ];

  const features = ways.map((way) => (
    <Paper
      key={way.title}
      shadow="md"
      radius="md"
      p="xl"
      w={'33%'}
      className={classes.paper}
    >
      <Flex gap={'md'} direction={'column'} h={'100%'}>
        <Title>{way.title}</Title>

        <AspectRatio
          ratio={4 / 3}
          w={300}
          h={300}
          style={{ alignSelf: 'center' }}
        >
          <Image src={way.img} />
        </AspectRatio>

        <Button
          fz={'xl'}
          p={10}
          px={14}
          w={'auto'}
          h={'auto'}
          rightIcon={<way.icon stroke={2} />}
          style={{ alignSelf: 'end' }}
        >
          {way.title}
        </Button>
        <Text fz="sm" c="dimmed" mt="sm">
          {way.description}
        </Text>
      </Flex>
    </Paper>
  ));

  return (
    <AuthenticatedAppLayout instance={instance}>
      <Head>
        <title>
          {t('content:header.navigation.homepage')} | {t('common:appName')}
        </title>
        <meta name="description" content="Aouis Homepage" />
      </Head>

      <Flex
        gap={'xl'}
        w={'100%'}
        px={64}
        my={50}
        justify="center"
        wrap={'nowrap'}
      >
        {features}
      </Flex>

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
