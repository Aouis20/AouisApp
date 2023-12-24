import { UnAuthenticatedAppLayout } from '@/common/UnAuthenticatedAppLayout';
import RegisterPage from '@/features/authentication/components/RegisterPage';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';

const Register = () => {
  const { t } = useTranslation();

  // TODO améliorer avec shadcn/ui authentication : https://ui.shadcn.com/examples/authentication

  return (
    <UnAuthenticatedAppLayout>
      <Head>
        <title>{`${t('appName')} - ${t(
          'content:header.navigation.register'
        )}`}</title>
        <link rel="shortcut icon" href="/logo-mark.png" />
        <meta name="description" content="Aouis - Register" />
      </Head>

      <RegisterPage />
    </UnAuthenticatedAppLayout>
  );
};

export default Register;
