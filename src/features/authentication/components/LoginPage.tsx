import { Image } from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import LoginForm from './LoginForm';

const LoginPage = () => {
  const router = useRouter();
  return (
    // Component from shadcn/ui edited by Aouis
    <div className="container min-h-screen relative flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      {/* Left Panel */}
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-indigo-600" />
        <Image
          sx={{ cursor: 'pointer' }}
          alt={'logo'}
          src={'/logo.png'}
          width={150}
          onClick={() => router.reload()}
        />
        <Image src={'/assets/aouis-pros.svg'} />
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;En échangeant, nous comblons les lacunes de nos possessions
              et élargissons nos horizons.&rdquo;
            </p>
            <footer className="text-sm">Juliet Schor</footer>
          </blockquote>
        </div>
      </div>

      {/* Right Panel */}
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <LoginForm />
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

export default LoginPage;

// Citations
// "En échangeant, nous comblons les lacunes de nos possessions et élargissons nos horizons." - Juliet Schor
// "Dans l'échange, chaque partie trouve de la valeur dans ce qu'elle reçoit et dans ce qu'elle donne." - Michael Phillips
// "L'échange mutuel conduit à l'enrichissement mutuel." - Lailah Gifty Akita
