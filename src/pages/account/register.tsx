import { UnAuthenticatedAppLayout } from '@/common/UnAuthenticatedAppLayout';
import RegisterPage from '@/features/authentication/components/RegisterPage';
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

const Register = () => {
  const { t } = useTranslation();
  const { classes } = useStyles();

  // TODO améliorer avec shadcn/ui authentication : https://ui.shadcn.com/examples/authentication

  return (
    <UnAuthenticatedAppLayout>
      <Head>
        <title>{`${t('appName')} - ${t('navigation.signIn')}`}</title>
        <link rel="shortcut icon" href="/logo-mark.png" />
        <meta name="description" content="Aouis - SignUp" />
      </Head>

      <RegisterPage />
    </UnAuthenticatedAppLayout>
  );
};

export default Register;
