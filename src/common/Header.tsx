import { getCategories } from '@/features/categories/api';
import { CategoryStore } from '@/features/categories/store';
import { Category } from '@/features/categories/types/Category';
import { setupPrivateApi } from '@/pages/api';
import {
  Anchor,
  Burger,
  Button,
  Collapse,
  Divider,
  Drawer,
  Flex,
  Group,
  HoverCard,
  Image,
  Text,
} from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import {
  IconChevronDown,
  IconSearch,
  IconSquarePlus,
} from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { AccountStore } from '../features/accounts/store';
import { removeTokens } from '../features/authentication/tokens.helper';
import { AccountMenu } from './AccountMenu';
import { LanguageSelector } from './LanguageSelector';

export function HeaderSection() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const t = useTranslations();
  const [logged, setLogged] = useState<boolean>(false);
  const router = useRouter();
  const user = AccountStore.useState((s) => s.user);
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const matches = useMediaQuery('(min-width: 1150px)');
  const matchesSM = useMediaQuery('(min-width: 720px)');

  const fetchCategories = async () => {
    const api = setupPrivateApi();
    const categoryList = await getCategories(api);
    CategoryStore.update((s) => {
      s.categoryList = categoryList;
    });
    setCategoryList(categoryList);
  };

  useEffect(() => {
    if (user) {
      return setLogged(true);
    }
    fetchCategories();
  }, []);

  const logout = () => {
    try {
      removeTokens();

      showNotification({
        title: t('authentication.logout.notifications.success.title'),
        message: t('authentication.logout.notifications.success.message'),
        color: 'gray',
      });
      router.replace('/account/login');
    } catch (err) {
      console.log(err);

      showNotification({
        title: t('authentication.logout.notifications.error.title'),
        message: t('authentication.logout.notifications.error.message'),
        color: 'red',
      });
    }
  };

  const categories = categoryList.map((category) => ({
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
            {t('header.navigation.addAd')}
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
            {t('header.navigation.homepage')}
          </Anchor>
          <Anchor
            href="/search"
            style={{
              textDecoration: 'none',
            }}
          >
            <Group wrap="nowrap" gap={6}>
              <Text fw={'bold'} ml={4}>
                {t('header.navigation.search')}
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
            {t('header.navigation.products')}
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
                  {t('header.navigation.categories')}
                  <IconChevronDown stroke={3} size={16} />
                </Group>
              </Anchor>
            </HoverCard.Target>

            <HoverCard.Dropdown style={{ overflow: 'hidden' }} maw={'60%'}>
              <Group justify="space-between" px="md">
                <Text fw={500}>{t('header.navigation.categories')}</Text>
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
          <LanguageSelector />
          {logged ? (
            <AccountMenu logout={logout} />
          ) : (
            <>
              <Button
                variant="default"
                onClick={() => router.replace('/account/login')}
              >
                {t('header.navigation.login')}
              </Button>
              <Button variant="filled">
                {t('header.navigation.createAccount')}
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
            {t('header.navigation.homepage')}
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
            {t('header.navigation.products')}
          </Anchor>
          <Anchor href="/search" fw={500} fz={'sm'}>
            {t('header.navigation.search')}
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
            {t('header.navigation.categories')}
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
              <Button>{t('header.profileMenu.profile')}</Button>
              <Button variant="outline" onClick={logout}>
                {t('header.navigation.logout')}
              </Button>
            </>
          ) : (
            <>
              <Button variant="default">{t('header.navigation.login')}</Button>
              <Button variant="filled">
                {t('header.navigation.register')}
              </Button>
            </>
          )}
        </Group>
      </Drawer>
    </>
  );
}
