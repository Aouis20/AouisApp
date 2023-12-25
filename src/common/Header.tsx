import { CategoryStore } from '@/features/categories/store';
import {
  Anchor,
  Badge,
  Box,
  Burger,
  Button,
  Collapse,
  Divider,
  Drawer,
  Flex,
  Group,
  HoverCard,
  Image,
  Menu,
  Text,
} from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import {
  IconArrowsExchange,
  IconBell,
  IconChevronDown,
  IconHeart,
  IconLogout,
  IconMessageCircle2,
  IconPhoto,
  IconSearch,
  IconSettings,
  IconSquarePlus,
  IconUser,
} from '@tabler/icons-react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AccountStore } from '../features/accounts/store';
import { removeTokens } from '../features/authentication/tokens.helper';
import { DisplayName } from './DisplayName';
import { LanguageSelector } from './LanguageSelector';

export function HeaderSection() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const { t } = useTranslation('common');
  const [logged, setLogged] = useState<boolean>(false);
  const router = useRouter();
  const user = AccountStore.useState((s) => s.user);
  const categoryList = CategoryStore.useState((s) => s.categoryList);
  const matches = useMediaQuery('(min-width: 1150px)');
  const matchesSM = useMediaQuery('(min-width: 720px)');

  useEffect(() => {
    if (user) {
      return setLogged(true);
    }
  }, []);

  const logout = () => {
    try {
      removeTokens();

      showNotification({
        title: t('account:authentication.logout.notifications.success.title'),
        message: t(
          'account:authentication.logout.notifications.success.message'
        ),
        color: 'gray',
      });
      router.replace('/account/login');
    } catch (err) {
      console.log(err);

      showNotification({
        title: t('account:authentication.logout.notifications.error.title'),
        message: t('account:authentication.logout.notifications.error.message'),
        color: 'red',
      });
    }
  };

  // TODO get categories
  const truc = [
    { id: 1, title: 'Category1', description: 'Bienvenue sur la category ici' },
    {
      id: 2,
      title: 'Category2',
      description: 'Bienvenue sur la category2 ici',
    },
    {
      id: 3,
      title: 'Category3',
      description: 'Bienvenue sur la category3 ici',
    },
  ];

  const categories = [...categoryList, ...truc].map((category) => ({
    ...category,
  }));

  const renderCategories = categories.map((category, index) => (
    <Button variant="light" key={index}>
      {category.title}
    </Button>
  ));

  return (
    <>
      <Group justify="space-between" h={60} px="md" pos={'relative'}>
        {/* Left Section - Logo */}
        <Group>
          <Image
            onClick={() => router.push('/')}
            style={{ cursor: 'pointer' }}
            alt={'logo'}
            src={'/logo.png'}
            w={150}
          />
          <Button
            style={{ display: matches ? 'block' : 'none' }}
            variant="light"
            leftSection={<IconSquarePlus size={20} />}
            onClick={() => router.push('/products/create')}
          >
            {t('content:header.navigation.addAd')}
          </Button>
        </Group>

        {/* Middle Section - Nav links */}
        <Group
          h={'100%'}
          gap={'xl'}
          align="center"
          style={{ display: matchesSM ? 'flex' : 'none' }}
        >
          <Anchor
            fw={'bold'}
            href="/"
            style={{
              textDecoration: 'none',
            }}
          >
            {t('content:header.navigation.homepage')}
          </Anchor>
          <Anchor
            href="/search"
            style={{
              textDecoration: 'none',
            }}
          >
            <Group wrap="nowrap" gap={6}>
              <Text fw={'bold'} ml={4}>
                {t('content:header.navigation.search')}
              </Text>
              <IconSearch stroke={2.5} size={18} />
            </Group>
          </Anchor>
          <Anchor
            fw={'bold'}
            href="/products"
            style={{
              textDecoration: 'none',
            }}
          >
            {t('content:header.navigation.products')}
          </Anchor>
          <HoverCard position="bottom" radius="md" shadow="md" withinPortal>
            <HoverCard.Target>
              <Anchor
                fw={'bold'}
                href="/categories"
                style={{
                  textDecoration: 'none',
                }}
              >
                <Group wrap="nowrap" gap={4}>
                  {t('content:header.navigation.categories')}
                  <IconChevronDown stroke={3} size={16} />
                </Group>
              </Anchor>
            </HoverCard.Target>

            <HoverCard.Dropdown style={{ overflow: 'hidden' }} maw={'70%'}>
              <Group justify="space-between" px="md">
                <Text fw={500}>
                  {t('content:header.navigation.categories')}
                </Text>
                <Anchor href="/categories">{t('viewAll')}</Anchor>
              </Group>

              <Divider my="sm" mx="-md" color={'gray.1'} />

              <Flex gap={'md'} wrap={'wrap'}>
                {renderCategories}
              </Flex>
            </HoverCard.Dropdown>
          </HoverCard>
        </Group>

        {/* Right Section - Add product button && Account Menu */}
        <Group wrap="nowrap" style={{ display: matches ? 'flex' : 'none' }}>
          {logged ? (
            <>
              <Box>
                <LanguageSelector />
              </Box>
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
                    onClick={() => router.push('/profile?tab=profile')}
                  >
                    {t('content:header.profileMenu.profile')}
                  </Menu.Item>
                  <Menu.Item
                    leftSection={<IconPhoto size={14} />}
                    onClick={() => router.push('/profile?tab=ads')}
                  >
                    {t('content:header.profileMenu.myAds')}
                  </Menu.Item>
                  <Menu.Item
                    leftSection={<IconArrowsExchange size={14} />}
                    onClick={() => router.push('/profile?tab=historic')}
                  >
                    {t('content:header.profileMenu.transactions')}
                  </Menu.Item>
                  <Menu.Item
                    leftSection={<IconHeart size={14} />}
                    onClick={() => router.push('/profile?tab=favoris')}
                  >
                    {t('content:header.profileMenu.favorites')}
                  </Menu.Item>
                  <Menu.Divider />
                  <Menu.Label>
                    {t('content:header.profileMenu.news')}
                  </Menu.Label>
                  <Menu.Item
                    leftSection={<IconMessageCircle2 size={14} />}
                    onClick={() => router.push('/profile?tab=message')}
                  >
                    {t('content:header.profileMenu.messages')}
                    <Badge
                      ml={'xs'}
                      color="red"
                      variant="filled"
                      p={2}
                      w={16}
                      h={16}
                    >
                      2
                    </Badge>
                  </Menu.Item>
                  <Menu.Item
                    leftSection={<IconBell size={14} />}
                    onClick={() => router.push('/profile?tab=notifications')}
                  >
                    {t('content:header.profileMenu.notifications')}
                    <Badge
                      ml={'xs'}
                      color="red"
                      variant="filled"
                      p={2}
                      w={16}
                      h={16}
                    >
                      2
                    </Badge>
                  </Menu.Item>
                  <Menu.Divider />
                  <Menu.Label>
                    {t('content:header.profileMenu.settings')}
                  </Menu.Label>
                  <Menu.Item
                    leftSection={<IconSettings size={14} />}
                    onClick={() => router.push('/profile?tab=settings')}
                  >
                    {t('content:header.profileMenu.settings')}
                  </Menu.Item>
                  <Menu.Divider />
                  <Menu.Item
                    color="red"
                    leftSection={<IconLogout size={14} />}
                    onClick={logout}
                  >
                    {t('content:header.navigation.logout')}
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </>
          ) : (
            <>
              <Button
                variant="default"
                onClick={() => router.replace('/account/login')}
              >
                {t('content:header.navigation.login')}
              </Button>
              <Button variant="filled">
                {t('content:header.navigation.createAccount')}
              </Button>
            </>
          )}
        </Group>

        <Burger
          opened={drawerOpened}
          onClick={toggleDrawer}
          style={{ display: matches ? 'none' : 'block' }}
        />
      </Group>

      {/* Mobile View */}
      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
      >
        <Group justify="space-between">
          <Image alt={'logo'} src={'/logo.png'} w={200} />
          <LanguageSelector />
        </Group>

        <Divider my="sm" />

        <Flex direction={'column'} gap={'sm'} pl={'lg'}>
          <Anchor
            href="/"
            fw={500}
            fz={'sm'}
            style={{
              alignItems: 'center',
              textDecoration: 'none',
            }}
          >
            {t('content:header.navigation.homepage')}
          </Anchor>
          <Anchor
            href="/products"
            fw={500}
            fz={'sm'}
            style={{
              alignItems: 'center',
              textDecoration: 'none',
            }}
          >
            {t('content:header.navigation.products')}
          </Anchor>
          <Anchor href="/search" fw={500} fz={'sm'}>
            {t('content:header.navigation.search')}
            <IconSearch
              style={{
                transform: 'scaleX(-1)',
                marginBottom: -3,
                marginLeft: 4,
              }}
              size={18}
            />
          </Anchor>
          <Anchor
            fw={500}
            fz={'sm'}
            style={{
              alignItems: 'center',
              textDecoration: 'none',
            }}
            mr={5}
            onClick={toggleLinks}
          >
            {t('content:header.navigation.categories')}
            <IconChevronDown
              size={16}
              style={{ marginBottom: -3, marginLeft: 4 }}
            />
          </Anchor>
          <Collapse in={linksOpened}>
            <Flex gap={'md'} wrap={'wrap'}>
              {renderCategories}
            </Flex>
          </Collapse>
        </Flex>

        <Divider my="sm" color="gray.1" />

        <Group justify="center" grow pb="xl" px="md">
          {logged ? (
            <>
              <Button>{t('content:header.profileMenu.profile')}</Button>
              <Button variant="outline" onClick={logout}>
                {t('content:header.navigation.logout')}
              </Button>
            </>
          ) : (
            <>
              <Button variant="default">
                {t('content:header.navigation.login')}
              </Button>
              <Button variant="filled">
                {t('content:header.navigation.register')}
              </Button>
            </>
          )}
        </Group>
      </Drawer>
    </>
  );
}
