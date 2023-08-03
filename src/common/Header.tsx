import { CategoryStore } from '@/features/categories/CategoryStore';
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
  IconSearch,
  IconSettings,
  IconUser,
} from '@tabler/icons-react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AccountStore } from '../features/accounts/AccountStore';
import { removeTokens } from '../features/authentication/tokens.helper';

const useStyles = createStyles((theme) => ({
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

  dropdownFooter: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[7]
        : theme.colors.gray[0],
    margin: `calc(${theme.spacing.md} * -1)`,
    marginTop: theme.spacing.sm,
    padding: `${theme.spacing.md} calc(${theme.spacing.md} * 2)`,
    paddingBottom: theme.spacing.xl,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
  },

  hiddenMobile: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan('sm')]: {
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

  const categories = categoryList.map((category) => ({
    icon: IconCode,
    description: 'Bienvenue sur la category ici',
    ...category,
  }));

  useEffect(() => {
    if (user) {
      return setLogged(true);
    }
  }, []);

  const signOut = () => {
    removeTokens();

    showNotification({
      title: t('account:signOutSuccess.notification.title'),
      message: t('account:signOutSuccess.notification.message'),
      color: 'gray',
    });

    router.replace('/account/sign-in');
  };

  const renderCategories = categories.map((category, index) => (
    <UnstyledButton className={classes.subLink} key={index}>
      <Group noWrap align="flex-start">
        <ThemeIcon size={34} variant="default" radius="md">
          <category.icon size={rem(22)} color={theme.fn.primaryColor()} />
        </ThemeIcon>
        <div>
          <Text size="sm" fw={500}>
            {category.title}
          </Text>
          <Text size="xs" color="dimmed">
            {category.description}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  ));

  return (
    <Box>
      <Header height={60} px="md">
        <Group position="apart" sx={{ height: '100%' }}>
          <Image alt={'logo'} src={'/logo.png'} width={150} />

          <Group
            sx={{ height: '100%' }}
            spacing={0}
            className={classes.hiddenMobile}
          >
            <Anchor href="/" className={classes.link}>
              {t('appName')}
            </Anchor>
            <Anchor href="/search" className={classes.link}>
              <IconSearch size={18} />
              <Text ml={4}>{t('navigation.search')}</Text>
            </Anchor>
            <Anchor href="/products" className={classes.link}>
              Produits
            </Anchor>
            <HoverCard position="bottom" radius="md" shadow="md" withinPortal>
              <HoverCard.Target>
                <Anchor href="/categories" className={classes.link}>
                  <Center inline>
                    <Box component="span" mr={5}>
                      Catégories
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
                  <Text fw={500}>Catégories</Text>
                  <Anchor href="/categories" fz="xs">
                    View all
                  </Anchor>
                </Group>

                <Divider
                  my="sm"
                  mx="-md"
                  color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'}
                />

                <SimpleGrid cols={3} spacing={0}>
                  {renderCategories}
                </SimpleGrid>

                <div className={classes.dropdownFooter}>
                  <Group position="apart">
                    <div>
                      <Text fw={500} fz="sm">
                        Get started
                      </Text>
                      <Text size="xs" color="dimmed">
                        Their food sources have decreased, and their numbers
                      </Text>
                    </div>
                    <Button variant="default">Get started</Button>
                  </Group>
                </div>
              </HoverCard.Dropdown>
            </HoverCard>
          </Group>

          <Group className={classes.hiddenMobile}>
            {logged ? (
              <Menu shadow="md" width={200}>
                <Menu.Target>
                  <Button>{user?.email}</Button>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Label>My profile</Menu.Label>
                  <Menu.Item icon={<IconUser size={14} />}>Profile</Menu.Item>
                  <Menu.Item icon={<IconArrowsExchange size={14} />}>
                    Historic
                  </Menu.Item>
                  <Menu.Item icon={<IconBell size={14} />}>
                    Notifications
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
                  <Menu.Item icon={<IconHeart size={14} />}>Favoris</Menu.Item>
                  <Menu.Divider />
                  <Menu.Label>Settings</Menu.Label>
                  <Menu.Item icon={<IconSettings size={14} />}>
                    Settings
                  </Menu.Item>
                  <Menu.Divider />
                  <Menu.Item
                    color="red"
                    icon={<IconLogout size={14} />}
                    onClick={signOut}
                  >
                    {t('navigation.signOut')}
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            ) : (
              <>
                <Button variant="default">{t('navigation.signIn')}</Button>
                <Button variant="filled">
                  {t('navigation.createAccount')}
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
                <Button variant="default" onClick={signOut}>
                  {t('navigation.signOut')}
                </Button>
              </>
            ) : (
              <>
                <Button variant="default">{t('navigation.signIn')}</Button>
                <Button variant="filled">
                  {t('navigation.createAccount')}
                </Button>
              </>
            )}
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
