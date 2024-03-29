import {
  Accordion,
  Anchor,
  Box,
  Flex,
  Group,
  Text,
  Title,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import {
  IconArrowsLeftRight,
  IconCurrencyEuro,
  IconShoppingBag,
} from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { WayCard } from './WayCard';

export const Homepage = () => {
  const t = useTranslations();
  const matches = useMediaQuery('(min-width: 1150px)');

  const ways = {
    buy: {
      title: t('buy'),
      description: t('homepage.intro.buy.description'),
      icon: <IconShoppingBag stroke={2.3} />,
      button: t('homepage.intro.buy.button'),
      onclick: 'search',
      img: 'assets/homepage-buy.svg',
    },
    sell: {
      title: t('sell'),
      description: t('homepage.intro.sell.description'),
      icon: <IconCurrencyEuro stroke={2.45} />,
      button: t('homepage.intro.sell.button'),
      onclick: 'products/create',
      img: 'assets/homepage-sell.svg',
    },
    exchange: {
      title: t('exchange'),
      description: t('homepage.intro.exchange.description'),
      icon: <IconArrowsLeftRight stroke={2.2} />,
      button: t('homepage.intro.exchange.button'),
      onclick: 'exchange',
      img: 'assets/homepage-exchange.svg',
    },
  };

  return (
    <Box>
      {/* Ways */}
      <Box my={'xl'}>
        <Group wrap={matches ? 'nowrap' : 'wrap'} gap={'xl'}>
          <WayCard way={ways.buy} />
          <WayCard way={ways.sell} />
        </Group>
        <Group mx={'auto'} mt={'xl'} w={matches ? '60%' : 'auto'}>
          <WayCard way={ways.exchange} />
        </Group>
      </Box>

      <Flex direction={'column'} gap={128} px={matches ? 128 : 'xl'} mt={90}>
        {/* What is Aouis */}
        <Flex direction={'column'} gap={'lg'}>
          <Title>{t('homepage.p1.title')}</Title>
          <Text>{t('homepage.p1.text')}</Text>
        </Flex>

        {/* How does it work */}
        <Flex direction={'column'} gap={'lg'}>
          <Title>{t('homepage.p2.title')}</Title>
          <Text>{t('homepage.p2.text')}</Text>
        </Flex>
      </Flex>

      {/* FAQ */}
      <Box
        bg={'primary.3'}
        w={'100%'}
        px={matches ? 128 : 'xl'}
        py={48}
        my={96}
      >
        <Title mb={'lg'} c={'white'}>
          {t('homepage.p3.title')}
        </Title>
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
      <Flex direction={'column'} gap={'lg'} px={matches ? 128 : 'xl'}>
        <Title>{t('contact.title')}</Title>
        <Text>
          {t('contact.text')}{' '}
          <Anchor href={`mailto:${t('contact.email')}`}>
            {t('contact.email')}
          </Anchor>
        </Text>
        <Text>{t('contact.text2')}</Text>
      </Flex>
    </Box>
  );
};
