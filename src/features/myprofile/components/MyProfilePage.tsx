import DisplayName from '@/common/DisplayName';
import { AccountStore } from '@/features/accounts/AccountStore';
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
import Me from './Tabs/Me';

const MyProfilePage = () => {
  const user = AccountStore.useState((s) => s.user);

  if (!user) {
    return (
      <Text>
        Utilisateur introuvable, veuillez vous authentifier ou crée un compte
      </Text>
    );
  }

  return (
    <Flex direction={'column'} gap={'xl'}>
      <Paper shadow="sm" radius="md" p="lg" withBorder>
        <Title>
          Bonjour <DisplayName user={user} /> !
        </Title>
        <Text mt={16}>
          Welcome to your profile. Here you will find all the information about
          you.
        </Text>
      </Paper>

      <Tabs variant="outline" defaultValue="profile">
        {/* TABS */}
        <Tabs.List
          sx={{
            overflow: 'auto hidden',
            width: '100%',
            display: 'flex',
            flexWrap: 'nowrap',
          }}
        >
          <Tabs.Tab value="profile" icon={<IconUser size="0.8rem" />}>
            Profile
          </Tabs.Tab>
          <Tabs.Tab value="ads" icon={<IconPhoto size="0.8rem" />}>
            Ads
          </Tabs.Tab>

          <Tabs.Tab
            value="historic"
            icon={<IconArrowsExchange size="0.8rem" />}
          >
            Historic
          </Tabs.Tab>

          <Tabs.Tab value="favoris" icon={<IconHeart size="0.8rem" />}>
            Favoris
          </Tabs.Tab>

          <Tabs.Tab
            value="message"
            icon={<IconMessageCircle2 size="0.8rem" />}
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
            value="notification"
            icon={<IconBell size="0.8rem" />}
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
            Notification
          </Tabs.Tab>

          <Tabs.Tab value="parameters" icon={<IconSettings size="0.8rem" />}>
            Parameters
          </Tabs.Tab>
        </Tabs.List>

        {/* PANELS */}
        <Tabs.Panel value="profile" pt="xs">
          <Me user={user} />
        </Tabs.Panel>

        <Tabs.Panel value="ads" pt="xs">
          My ads
        </Tabs.Panel>

        <Tabs.Panel value="message" pt="xs">
          Messages
        </Tabs.Panel>

        <Tabs.Panel value="historic" pt="xs">
          Historic
        </Tabs.Panel>

        <Tabs.Panel value="notification" pt="xs">
          Notification
        </Tabs.Panel>

        <Tabs.Panel value="favoris" pt="xs">
          Favoris
        </Tabs.Panel>

        <Tabs.Panel value="parameters" pt="xs">
          Parameters
        </Tabs.Panel>
      </Tabs>
    </Flex>
  );
};

export default MyProfilePage;
