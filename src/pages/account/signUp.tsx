import Head from 'next/head';
import { useTranslation } from 'react-i18next';
import { Box, CardSection, createStyles } from '@mantine/core';
import Image from 'next/image';
import { AccountCard } from '@/src/features/accounts/AccountCard';
import { UnAuthenticatedAppLayout } from '@/src/common/UnAuthenticatedAppLayout';
import { SignUpForm } from '@/src/features/accounts/SignUpForm';

const useStyles = createStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: theme.colors.gray[0],
    height: '100vh'
  },
  logoSection: {
    padding: theme.spacing.sm,
    display: 'flex',
    justifyContent: 'center'
  },
  logoContainer: {
    height: '200px'
  }
}));

const SignUp = () => {
  const { t } = useTranslation();
  const { classes } = useStyles();

  return (
    <UnAuthenticatedAppLayout>
      <Head>
        <title>{`${t('appName')} - ${t('navigation.signIn')}`}</title>
        <meta name="description" content="Aouis - SignUp" />
      </Head>

      <Box className={classes.container}>
        <AccountCard sx={{ width: '30vw', overflow: 'visible' }}>
          <CardSection className={classes.logoSection}>
            <Box className={classes.logoContainer}>
              <Image alt={'logo'} src={'/logo.png'} height={200} width={200} />
            </Box>
          </CardSection>

          <SignUpForm />
        </AccountCard>
      </Box>
    </UnAuthenticatedAppLayout>
  );
};

export default SignUp;
