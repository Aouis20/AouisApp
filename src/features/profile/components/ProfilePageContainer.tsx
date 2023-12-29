import { DisplayName } from '@/common/DisplayName';
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
import { useTranslations } from 'next-intl';
import router from 'next/router';

type ProfilePageContainerProps = {
  children?: React.ReactNode;
};

export const ProfilePageContainer = ({
  children,
}: ProfilePageContainerProps) => {
  const t = useTranslations();

  return (
    <Flex direction={'column'} gap={'xl'} mx={'xl'}>
      <Paper shadow="sm" radius="md" p="lg" withBorder>
        <Title>
          {t('welcome')} <DisplayName /> !
        </Title>
        <Text mt={16}>{t('profile.description')}</Text>
      </Paper>
      <Paper shadow="sm" radius="md" pb={'lg'} withBorder>
        <Flex direction={'row'} gap={'lg'} mb={'md'}>
          <Tabs w={'100%'}>
            <Tabs.List>
              <Tabs.Tab
                value="myprofile"
                onClick={() => router.push('/profile/')}
                leftSection={<IconUser size="0.9rem" />}
              >
                {t('header.profileMenu.profile')}
              </Tabs.Tab>
              <Tabs.Tab
                value="ads"
                onClick={() => router.push('/profile/ads')}
                leftSection={<IconPhoto size="0.9rem" />}
              >
                {t('header.profileMenu.myAds')}
              </Tabs.Tab>
              <Tabs.Tab
                value="historic"
                onClick={() => router.push('/profile/historic')}
                leftSection={<IconArrowsExchange size="0.9rem" />}
              >
                {t('header.profileMenu.historic')}
              </Tabs.Tab>
              <Tabs.Tab
                value="favoris"
                onClick={() => router.push('/profile/favoris')}
                leftSection={<IconHeart size="0.9rem" />}
              >
                {t('header.profileMenu.favorites')}
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
                {t('header.profileMenu.messages')}
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
                {t('header.profileMenu.notifications')}
              </Tabs.Tab>
              <Tabs.Tab
                value="settings"
                onClick={() => router.push('/profile/settings')}
                leftSection={<IconSettings size="0.9rem" />}
              >
                {t('header.profileMenu.settings')}
              </Tabs.Tab>
            </Tabs.List>
          </Tabs>
        </Flex>
        <>{children}</>
      </Paper>
    </Flex>
  );
};
