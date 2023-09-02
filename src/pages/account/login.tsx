import { UnAuthenticatedAppLayout } from '@/common/UnAuthenticatedAppLayout';
import LoginPage from '@/features/authentication/components/LoginPage';
import { createStyles } from '@mantine/core';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';

const useStyles = createStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: theme.colors.gray[0],
    height: '100vh',
  },
  logoSection: {
    padding: theme.spacing.sm,
    display: 'flex',
    justifyContent: 'center',
  },
  logoContainer: {
    height: '200px',
  },
}));

const Login = () => {
  const { t } = useTranslation();
  const { classes } = useStyles();

  // TODO améliorer avec shadcn/ui authentication : https://ui.shadcn.com/examples/authentication

  return (
    <UnAuthenticatedAppLayout>
      <Head>
        <title>{`${t('appName')} - ${t('navigation.register')}`}</title>
        <link rel="shortcut icon" href="/logo-mark.png" />
        <meta name="description" content="Aouis - Login" />
      </Head>

      <LoginPage />
    </UnAuthenticatedAppLayout>
  );
};

export default Login;
