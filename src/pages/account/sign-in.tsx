import { UnAuthenticatedAppLayout } from '@/common/UnAuthenticatedAppLayout';
import { AccountCard } from '@/features/accounts/components/AccountCard';
import { SignInForm } from '@/features/accounts/components/SignInForm';
import { Box, CardSection, createStyles } from '@mantine/core';
import Head from 'next/head';
import Image from 'next/image';
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

const SignUp = () => {
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

      <Box className={classes.container}>
        <AccountCard sx={{ width: '30vw', overflow: 'visible' }}>
          <CardSection className={classes.logoSection}>
            <Box className={classes.logoContainer}>
              <Image
                alt={'logo'}
                src={'/logo.png'}
                width={200}
                height={140}
                style={{ marginTop: '20px' }}
              />
            </Box>
          </CardSection>

          <SignInForm />
        </AccountCard>
      </Box>
    </UnAuthenticatedAppLayout>
  );
};

export default SignUp;
