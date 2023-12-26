import { AuthenticatedAppLayout } from '@/common/AuthenticatedAppLayout';
import { DisplayName } from '@/common/DisplayName';
import { getUserInfo } from '@/features/accounts/helper';
import { AccountStore } from '@/features/accounts/store';
import { redirectToLoginProps } from '@/features/authentication/redirect.helper';
import { getProducts } from '@/features/products/api';
import { Favoris } from '@/features/profile/components/Tabs/Favoris';
import { setupPrivateApi } from '@/pages/api';
import { PullStateInstance, PullstateCore } from '@/pullstate.core';
import { Badge, Flex, Paper, Tabs, Text, Title } from '@mantine/core';
import {
  IconArrowsExchange,
  IconBell,
  IconHeart,
  IconMessageCircle2,
  IconPhoto,
  IconSettings,
  IconUser,
} from '@tabler/icons-react';
import { HTTPError } from 'ky-universal';
import { GetServerSidePropsContext, NextPage } from 'next';
import { useTranslations } from 'next-intl';
import Head from 'next/head';
import { useRouter } from 'next/router';

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const stateInstance = PullstateCore.instantiate({ ssr: true });
  const api = setupPrivateApi(ctx);

  try {
    const user = await getUserInfo(stateInstance, api);
    const products = await getProducts(1, { ids: user.favoris }, api);
    stateInstance.stores.ProductStore.update((s) => {
      s.productList = products;
    });

    return {
      props: {
        snapshot: stateInstance.getPullstateSnapshot(),
        messages: {
          ...(await import(`public/locales/${ctx.locale}/common.json`)).default,
          ...(await import(`public/locales/${ctx.locale}/content.json`))
            .default,
          ...(await import(`public/locales/${ctx.locale}/account.json`))
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

type MyFavorisProps = {
  snapshot: PullStateInstance;
};

const MyFavoris: NextPage<MyFavorisProps> = ({ snapshot }) => {
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

      <Flex direction={'column'} gap={'xl'} mx={'xl'}>
        <Paper shadow="sm" radius="md" p="lg" withBorder>
          <Title>
            Bonjour <DisplayName /> !
          </Title>
          <Text mt={16}>
            Bienvenue sur votre profil, retrouvez ici, toutes les informations
            vous concernant.
          </Text>
        </Paper>
        <Paper shadow="sm" radius="md" pb={'lg'} withBorder>
          <Flex direction={'row'} gap={'lg'} mb={'md'}>
            <Tabs defaultValue="favoris" w={'100%'}>
              <Tabs.List>
                <Tabs.Tab
                  value="myprofile"
                  onClick={() => router.push('/profile/')}
                  leftSection={<IconUser size="0.9rem" />}
                >
                  Profile
                </Tabs.Tab>
                <Tabs.Tab
                  value="ads"
                  onClick={() => router.push('/profile/ads')}
                  leftSection={<IconPhoto size="0.9rem" />}
                >
                  Ads
                </Tabs.Tab>
                <Tabs.Tab
                  value="historic"
                  onClick={() => router.push('/profile/historic')}
                  leftSection={<IconArrowsExchange size="0.9rem" />}
                >
                  Historic
                </Tabs.Tab>
                <Tabs.Tab
                  value="favoris"
                  onClick={() => router.push('/profile/favoris')}
                  leftSection={<IconHeart size="0.9rem" />}
                >
                  Favoris
                </Tabs.Tab>
                <Tabs.Tab
                  value="messages"
                  onClick={() => router.push('/profile/messages')}
                  leftSection={<IconMessageCircle2 size="0.9rem" />}
                  rightSection={
                    <Badge
                      w={16}
                      h={16}
                      style={{ pointerEvents: 'none' }}
                      variant="filled"
                      size="xs"
                      p={0}
                    >
                      2
                    </Badge>
                  }
                >
                  Messages
                </Tabs.Tab>
                <Tabs.Tab
                  value="notifications"
                  onClick={() => router.push('/profile/notifications')}
                  leftSection={<IconBell size="0.9rem" />}
                  rightSection={
                    <Badge
                      w={16}
                      h={16}
                      style={{ pointerEvents: 'none' }}
                      variant="filled"
                      size="xs"
                      p={0}
                    >
                      2
                    </Badge>
                  }
                >
                  Notifications
                </Tabs.Tab>
                <Tabs.Tab
                  value="settings"
                  onClick={() => router.push('/profile/settings')}
                  leftSection={<IconSettings size="0.9rem" />}
                >
                  Settings
                </Tabs.Tab>
              </Tabs.List>
            </Tabs>
          </Flex>
          <Favoris />
        </Paper>
      </Flex>
    </AuthenticatedAppLayout>
  );
};

export default MyFavoris;
