import LanguageSelector from '@/common/LanguageSelector';
import { Group } from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import LeftPanel from './LeftPanel';
import RegisterForm from './RegisterForm';

const RegisterPage = () => {
  const router = useRouter();
  return (
    <div className="container min-h-screen relative flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      {/* Left Panel */}
      <LeftPanel />

      {/* Right Panel */}
      <div className="lg:p-8">
        <Group position="center" my={'xl'}>
          <LanguageSelector />
        </Group>
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <RegisterForm />
          {/* Terms and privacy */}
          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{' '}
            <Link
              href="/documents/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link
              href="/documents/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
