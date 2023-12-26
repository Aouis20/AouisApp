import { UnAuthenticatedAppLayout } from '@/common/UnAuthenticatedAppLayout';
import { LoginPage } from '@/features/authentication/components/LoginPage';
import { useTranslations } from 'next-intl';
import Head from 'next/head';

const Login = () => {
  const t = useTranslations();

  return (
    <UnAuthenticatedAppLayout>
      <Head>
        <title>{`${t('appName')} - ${t('header.navigation.login')}`}</title>
        <link rel="shortcut icon" href="/logo-mark.png" />
        <meta name="Aouis - Login" content="Aouis - Login" />
      </Head>

      <LoginPage />
    </UnAuthenticatedAppLayout>
  );
};

export default Login;

export async function getStaticProps(context: { locale: string }) {
  return {
    props: {
      messages: {
        ...(await import(`public/locales/${context.locale}/common.json`))
          .default,
        ...(await import(`public/locales/${context.locale}/account.json`))
          .default,
        ...(await import(`public/locales/${context.locale}/content.json`))
          .default,
      },
    },
  };
}
