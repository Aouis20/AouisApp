import { Badge, Button, Menu } from '@mantine/core';
import {
  IconArrowsExchange,
  IconBell,
  IconHeart,
  IconLogout,
  IconMessageCircle2,
  IconPhoto,
  IconSettings,
  IconUser,
} from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import router from 'next/router';
import { DisplayName } from './DisplayName';

interface AccountMenuProps {
  logout: () => void;
}

export const AccountMenu = ({ logout }: AccountMenuProps) => {
  const t = useTranslations();

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Button fw={'bold'}>
          <DisplayName />
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>{t('myAccount')}</Menu.Label>
        <Menu.Item
          leftSection={<IconUser size={14} />}
          onClick={() => router.push('/profile/')}
        >
          {t('header.profileMenu.profile')}
        </Menu.Item>
        <Menu.Item
          leftSection={<IconPhoto size={14} />}
          onClick={() => router.push('/profile/ads')}
        >
          {t('header.profileMenu.myAds')}
        </Menu.Item>
        <Menu.Item
          leftSection={<IconArrowsExchange size={14} />}
          onClick={() => router.push('/profile/historic')}
        >
          {t('header.profileMenu.transactions')}
        </Menu.Item>
        <Menu.Item
          leftSection={<IconHeart size={14} />}
          onClick={() => router.push('/profile/favoris')}
        >
          {t('header.profileMenu.favorites')}
        </Menu.Item>
        <Menu.Divider />
        <Menu.Label>{t('header.profileMenu.news')}</Menu.Label>
        <Menu.Item
          leftSection={<IconMessageCircle2 size={14} />}
          onClick={() => router.push('/profile/messages')}
        >
          {t('header.profileMenu.messages')}
          <Badge ml={'xs'} color="red" variant="filled" p={2} w={16} h={16}>
            2
          </Badge>
        </Menu.Item>
        <Menu.Item
          leftSection={<IconBell size={14} />}
          onClick={() => router.push('/profile/notifications')}
        >
          {t('header.profileMenu.notifications')}
          <Badge ml={'xs'} color="red" variant="filled" p={2} w={16} h={16}>
            2
          </Badge>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Label>{t('header.profileMenu.settings')}</Menu.Label>
        <Menu.Item
          leftSection={<IconSettings size={14} />}
          onClick={() => router.push('/profile/settings')}
        >
          {t('header.profileMenu.settings')}
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item
          color="red"
          leftSection={<IconLogout size={14} />}
          onClick={logout}
        >
          {t('header.navigation.logout')}
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
