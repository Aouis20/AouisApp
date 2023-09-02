import LanguageSelector from '@/common/LanguageSelector';
import { Group } from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import LeftPanel from './LeftPanel';
import LoginForm from './LoginForm';

const LoginPage = () => {
  const router = useRouter();
  const { t } = useTranslation('account');
  return (
    // Component from shadcn/ui edited by Aouis
    <div className="container min-h-screen relative flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      {/* Left Panel */}
      <LeftPanel />

      {/* Right Panel */}
      <div className="lg:p-8">
        <Group position="center" my={'xl'}>
          <LanguageSelector />
        </Group>
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <LoginForm />
          {/* Terms and privacy */}
          <p className="px-8 text-center text-sm text-muted-foreground">
            {t('authentication.form.byClicking')}{' '}
            <Link
              href="/documents/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              {t('authentication.form.termsOfService')}
            </Link>{' '}
            {t('authentication.form.andOur')}{' '}
            <Link
              href="/documents/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              {t('authentication.form.privacyPolicy')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;