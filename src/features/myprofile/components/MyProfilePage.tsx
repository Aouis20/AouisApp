import { DisplayName } from '@/common/DisplayName';
import { AccountStore } from '@/features/accounts/store';
import { Badge, Flex, Paper, Tabs, Text, Title } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import {
  IconArrowsExchange,
  IconBell,
  IconHeart,
  IconMessageCircle2,
  IconPhoto,
  IconSettings,
  IconUser,
} from '@tabler/icons-react';
import { Settings } from 'lucide-react';
import { Ads } from './Tabs/Ads';
import { Favoris } from './Tabs/Favoris';
import { Historic } from './Tabs/Historic';
import { Me } from './Tabs/Me';
import { Messages } from './Tabs/Messages';

type MyProfilePageProps = {
  tab: string | null;
};

export const MyProfilePage = ({ tab }: MyProfilePageProps) => {
  const user = AccountStore.useState((s) => s.user);

  if (!user) {
    return (
      <Text>
        Utilisateur introuvable, veuillez vous authentifier ou créer un compte.
      </Text>
    );
  }

  return (
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

      <Paper shadow="sm" radius="md" p={0} withBorder>
        <Tabs variant="outline" defaultValue={tab || 'profile'}>
          {/* TABS */}
          <Tabs.List
            style={{
              overflow: 'auto hidden',
              width: '100%',
              display: 'flex',
              flexWrap: 'nowrap',
            }}
          >
            <Tabs.Tab value="profile" leftSection={<IconUser size="0.8rem" />}>
              Profile
            </Tabs.Tab>
            <Tabs.Tab value="ads" leftSection={<IconPhoto size="0.8rem" />}>
              Ads
            </Tabs.Tab>

            <Tabs.Tab
              value="historic"
              leftSection={<IconArrowsExchange size="0.8rem" />}
            >
              Historic
            </Tabs.Tab>

            <Tabs.Tab value="favoris" leftSection={<IconHeart size="0.8rem" />}>
              Favoris
            </Tabs.Tab>

            <Tabs.Tab
              value="message"
              leftSection={<IconMessageCircle2 size="0.8rem" />}
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
              leftSection={<IconBell size="0.8rem" />}
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
              leftSection={<IconSettings size="0.8rem" />}
            >
              Settings
            </Tabs.Tab>
          </Tabs.List>

          {/* TABS CONTENT */}
          {/* Me */}
          <Tabs.Panel value="profile" p="xl">
            <Me />
          </Tabs.Panel>

          {/* Ads */}
          <Tabs.Panel value="ads" p="xl">
            <Ads />
          </Tabs.Panel>

          {/* Historic */}
          <Tabs.Panel value="historic" p="xl">
            <Historic />
          </Tabs.Panel>

          {/* Favoris */}
          <Tabs.Panel value="favoris" p="xl">
            <Favoris />
          </Tabs.Panel>

          {/* Messages */}
          <Tabs.Panel value="message" p="xl">
            <Messages />
          </Tabs.Panel>

          {/* Notifications */}
          <Tabs.Panel value="notifications" p="xl">
            <Notifications />
          </Tabs.Panel>

          {/* Settings */}
          <Tabs.Panel value="settings" p="xl">
            <Settings />
          </Tabs.Panel>
        </Tabs>
      </Paper>
    </Flex>
  );
};
