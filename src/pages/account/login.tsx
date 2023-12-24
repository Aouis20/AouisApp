import { UnAuthenticatedAppLayout } from '@/common/UnAuthenticatedAppLayout';
import LoginPage from '@/features/authentication/components/LoginPage';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';

const Login = () => {
  const { t } = useTranslation('common');

  return (
    <UnAuthenticatedAppLayout>
      <Head>
        <title>{`${t('appName')} - ${t(
          'content:header.navigation.login'
        )}`}</title>
        <link rel="shortcut icon" href="/logo-mark.png" />
        <meta name="description" content="Aouis - Login" />
      </Head>

      <LoginPage />
    </UnAuthenticatedAppLayout>
  );
};

export default Login;
