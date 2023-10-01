import DisplayName from '@/common/DisplayName';
import { AccountStore } from '@/features/accounts/store';
import { Badge, Flex, Paper, Tabs, Text, Title } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import {
  IconArrowsExchange,
  IconBell,
  IconHeart,
  IconMessageCircle2,
  IconPhoto,
  IconSettings,
  IconUser,
} from '@tabler/icons-react';
import Ads from './Tabs/Ads';
import Favoris from './Tabs/Favoris';
import Historic from './Tabs/Historic';
import Me from './Tabs/Me';
import Messages from './Tabs/Messages';
import Notifications from './Tabs/Notifications';
import Settings from './Tabs/Settings';

type MyProfilePageProps = {
  tab: string | null;
};

const MyProfilePage = ({ tab }: MyProfilePageProps) => {
  const user = AccountStore.useState((s) => s.user);
  const matches = useMediaQuery('(min-width: 750px)');

  if (!user) {
    return (
      <Text>
        Utilisateur introuvable, veuillez vous authentifier ou crée un compte.
      </Text>
    );
  }

  return (
    <Flex direction={'column'} gap={'xl'}>
      <Paper shadow="sm" radius="md" p="lg" withBorder>
        <Title>
          Bonjour <DisplayName /> !
        </Title>
        <Text mt={16}>
          Welcome to your profile. Here you will find all the information about
          you.
        </Text>
      </Paper>

      <Tabs
        variant={matches ? 'outline' : 'pills'}
        orientation={matches ? 'vertical' : 'horizontal'}
        defaultValue={tab || 'profile'}
      >
        {/* TABS */}
        <Tabs.List>
          <Tabs.Tab fz={'md'} value="profile" icon={<IconUser size="1.1rem" />}>
            Profile
          </Tabs.Tab>
          <Tabs.Tab fz={'md'} value="ads" icon={<IconPhoto size="1.1rem" />}>
            Ads
          </Tabs.Tab>

          <Tabs.Tab
            fz={'md'}
            value="historic"
            icon={<IconArrowsExchange size="1.1rem" />}
          >
            Historic
          </Tabs.Tab>

          <Tabs.Tab
            fz={'md'}
            value="favoris"
            icon={<IconHeart size="1.1rem" />}
          >
            Favoris
          </Tabs.Tab>

          <Tabs.Tab
            fz={'md'}
            value="message"
            icon={<IconMessageCircle2 size="1.1rem" />}
            rightSection={
              <Badge
                w={16}
                h={16}
                sx={{ pointerEvents: 'none' }}
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
            fz={'md'}
            value="notifications"
            icon={<IconBell size="1.1rem" />}
            rightSection={
              <Badge
                w={16}
                h={16}
                sx={{ pointerEvents: 'none' }}
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
            fz={'md'}
            value="settings"
            icon={<IconSettings size="1.1rem" />}
          >
            Settings
          </Tabs.Tab>
        </Tabs.List>

        {/* TABS CONTENT */}
        {/* Me */}
        <Tabs.Panel value="profile" pt="xs">
          <Me />
        </Tabs.Panel>

        {/* Ads */}
        <Tabs.Panel value="ads" pt="xs">
          <Ads />
        </Tabs.Panel>

        {/* Historic */}
        <Tabs.Panel value="historic" pt="xs">
          <Historic />
        </Tabs.Panel>

        {/* Favoris */}
        <Tabs.Panel value="favoris" pt="xs">
          <Favoris />
        </Tabs.Panel>

        {/* Messages */}
        <Tabs.Panel value="message" pt="xs">
          <Messages />
        </Tabs.Panel>

        {/* Notifications */}
        <Tabs.Panel value="notifications" pt="xs">
          <Notifications />
        </Tabs.Panel>

        {/* Settings */}
        <Tabs.Panel value="settings" pt="xs">
          <Settings />
        </Tabs.Panel>
      </Tabs>
    </Flex>
  );
};

export default MyProfilePage;
