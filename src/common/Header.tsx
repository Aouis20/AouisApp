import { getCategories } from '@/features/categories/api';
import { CategoryStore } from '@/features/categories/store';
import { setupPrivateApi } from '@/pages/api';
import {
  Anchor,
  Badge,
  Box,
  Burger,
  Button,
  Center,
  Collapse,
  Divider,
  Drawer,
  Group,
  Header,
  HoverCard,
  Image,
  Menu,
  ScrollArea,
  SimpleGrid,
  Text,
  ThemeIcon,
  UnstyledButton,
  createStyles,
  rem,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import {
  IconArrowsExchange,
  IconBell,
  IconChevronDown,
  IconCode,
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
import DisplayName from './DisplayName';
import LanguageSelector from './LanguageSelector';

const useStyles = createStyles((theme) => ({
  logo: {
    cursor: 'pointer',
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,

    [theme.fn.smallerThan('sm')]: {
      height: rem(42),
      display: 'flex',
      alignItems: 'center',
      width: '100%',
    },

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    }),
  },

  subLink: {
    width: '100%',
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    borderRadius: theme.radius.md,

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
    }),

    '&:active': theme.activeStyles,
  },

  hiddenMobile: {
    [theme.fn.smallerThan('md')]: {
      display: 'none',
    },
  },

  hiddenMobileLg: {
    [theme.fn.smallerThan('lg')]: {
      display: 'none',
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan('md')]: {
      display: 'none',
    },
  },
}));

export function HeaderSection() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const { classes, theme } = useStyles();
  const { t } = useTranslation('common');
  const [logged, setLogged] = useState<boolean>(false);
  const router = useRouter();
  const user = AccountStore.useState((s) => s.user);
  const categoryList = CategoryStore.useState((s) => s.categoryList);

  const fetchCategories = async () => {
    const api = setupPrivateApi();
    const categories = await getCategories(api);
    CategoryStore.update((s) => {
      s.categoryList = categories;
    });
  };

  useEffect(() => {
    if (user) {
      return setLogged(true);
    }

    if (!categoryList.length) {
      fetchCategories();
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

  const categories = truc.map((category) => ({
    icon: IconCode,
    ...category,
  }));

  const renderCategories = categories.map((category, index) => (
    <UnstyledButton
      className={classes.subLink}
      key={index}
      onClick={() => router.push(`../../categories/${category.id}`)}
    >
      <Group noWrap align="flex-start">
        <ThemeIcon size={34} variant="default" radius="md">
          <category.icon size={rem(22)} color={theme.fn.primaryColor()} />
        </ThemeIcon>
        <Box>
          <Text size="sm" fw={500}>
            {category.title}
          </Text>
          <Text size="xs" color="dimmed">
            {category.description}
          </Text>
        </Box>
      </Group>
    </UnstyledButton>
  ));

  return (
    <Box>
      <Header height={60} px="md" pos={'relative'}>
        <Group position="apart" h={'100%'}>
          {/* Left Section - Logo */}
          <Group>
            <Image
              onClick={() => router.push('/')}
              className={classes.logo}
              alt={'logo'}
              src={'/logo.png'}
              width={150}
            />
            <Button
              className={classes.hiddenMobileLg}
              variant="light"
              leftIcon={<IconSquarePlus size={20} />}
              onClick={() => router.push('/products/create')}
            >
              {t('content:header.navigation.addAd')}
            </Button>
          </Group>

          {/* Middle Section - Nav links */}
          <Group h={'100%'} spacing={0} className={classes.hiddenMobile}>
            <Anchor href="/" className={classes.link}>
              {t('content:header.navigation.homepage')}
            </Anchor>
            <Anchor href="/search" className={classes.link}>
              <IconSearch size={18} />
              <Text ml={4}>{t('content:header.navigation.search')}</Text>
            </Anchor>
            <Anchor href="/products" className={classes.link}>
              {t('content:header.navigation.products')}
            </Anchor>
            <HoverCard position="bottom" radius="md" shadow="md" withinPortal>
              <HoverCard.Target>
                <Anchor href="/categories" className={classes.link}>
                  <Center inline>
                    <Box component="span" mr={5}>
                      {t('content:header.navigation.categories')}
                    </Box>
                    <IconChevronDown
                      size={16}
                      color={theme.fn.primaryColor()}
                    />
                  </Center>
                </Anchor>
              </HoverCard.Target>

              <HoverCard.Dropdown sx={{ overflow: 'hidden' }}>
                <Group position="apart" px="md">
                  <Text fw={500}>
                    {t('content:header.navigation.categories')}
                  </Text>
                  <Anchor href="/categories">{t('viewAll')}</Anchor>
                </Group>

                <Divider
                  my="sm"
                  mx="-md"
                  color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'}
                />

                <SimpleGrid cols={3} spacing={0}>
                  {renderCategories}
                </SimpleGrid>
              </HoverCard.Dropdown>
            </HoverCard>
          </Group>

          {/* Right Section - Add product button && Account Menu */}
          <Group className={classes.hiddenMobile}>
            {logged ? (
              <>
                <Box className={classes.hiddenMobileLg}>
                  <LanguageSelector />
                </Box>
                <Menu shadow="md" width={200}>
                  <Menu.Target>
                    <Button>
                      <DisplayName />
                    </Button>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Label>{t('myAccount')}</Menu.Label>
                    <Menu.Item
                      icon={<IconUser size={14} />}
                      onClick={() => router.push('/myprofile?tab=profile')}
                    >
                      {t('content:header.profileMenu.profile')}
                    </Menu.Item>
                    <Menu.Item
                      icon={<IconPhoto size={14} />}
                      onClick={() => router.push('/myprofile?tab=ads')}
                    >
                      {t('content:header.profileMenu.myAds')}
                    </Menu.Item>
                    <Menu.Item
                      icon={<IconArrowsExchange size={14} />}
                      onClick={() => router.push('/myprofile?tab=historic')}
                    >
                      {t('content:header.profileMenu.transactions')}
                    </Menu.Item>
                    <Menu.Item
                      icon={<IconHeart size={14} />}
                      onClick={() => router.push('/myprofile?tab=favoris')}
                    >
                      {t('content:header.profileMenu.favorites')}
                    </Menu.Item>
                    <Menu.Divider />
                    <Menu.Label>
                      {t('content:header.profileMenu.news')}
                    </Menu.Label>
                    <Menu.Item
                      icon={<IconMessageCircle2 size={14} />}
                      onClick={() => router.push('/myprofile?tab=message')}
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
                      icon={<IconBell size={14} />}
                      onClick={() =>
                        router.push('/myprofile?tab=notifications')
                      }
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
                      icon={<IconSettings size={14} />}
                      onClick={() => router.push('/myprofile?tab=settings')}
                    >
                      {t('content:header.profileMenu.settings')}
                    </Menu.Item>
                    <Menu.Divider />
                    <Menu.Item
                      color="red"
                      icon={<IconLogout size={14} />}
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
            className={classes.hiddenDesktop}
          />
        </Group>
      </Header>

      {/* Mobile View */}
      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        className={classes.hiddenDesktop}
        zIndex={1000000}
      >
        <Image alt={'logo'} src={'/logo.png'} width={200} />

        <ScrollArea h={`calc(100vh - ${rem(60)})`} mx="-md">
          <Divider
            my="sm"
            color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'}
          />

          <Anchor href="/" className={classes.link}>
            Accueil
          </Anchor>
          <Anchor href="/products" className={classes.link}>
            Produits
          </Anchor>
          <UnstyledButton className={classes.link} onClick={toggleLinks}>
            <Center inline>
              <Box component="span" mr={5}>
                Catégories
              </Box>
              <IconChevronDown size={16} color={theme.fn.primaryColor()} />
            </Center>
          </UnstyledButton>
          <Collapse in={linksOpened}>{renderCategories}</Collapse>

          <Divider
            my="sm"
            color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'}
          />

          <Group position="center" grow pb="xl" px="md">
            {logged ? (
              <>
                <Button variant="light">Mon profil</Button>
                <Button variant="default" onClick={logout}>
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
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
