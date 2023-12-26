import { UnAuthenticatedAppLayout } from '@/common/UnAuthenticatedAppLayout';
import RegisterPage from '@/features/authentication/components/RegisterPage';
import { useTranslations } from 'next-intl';
import Head from 'next/head';

const Register = () => {
  const t = useTranslations();

  // TODO améliorer avec shadcn/ui authentication : https://ui.shadcn.com/examples/authentication

  return (
    <UnAuthenticatedAppLayout>
      <Head>
        <title>{`${t('appName')} - ${t('header.navigation.register')}`}</title>
        <link rel="shortcut icon" href="/logo-mark.png" />
        <meta name="description" content="Aouis - Register" />
      </Head>

      <RegisterPage />
    </UnAuthenticatedAppLayout>
  );
};

export default Register;

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
