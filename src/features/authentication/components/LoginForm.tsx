import { LoginPayloadType } from '@/features/accounts/types/SignIn';
import { loginUser } from '@/features/authentication/api';
import { cn } from '@/lib/utils';
import { setupPrivateApi } from '@/pages/api';
import { Icons } from '@/shadui/icons';
import { ShadButton } from '@/shadui/ui/button';
import { Anchor, Button, Group, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { t } from 'i18next';
import router from 'next/router';
import { useState } from 'react';
import { setTokens } from '../tokens.helper';

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const passwordReggex = new RegExp(
    '^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}[]:;<>,.?~-]).{8,}$'
  );

  const form = useForm<LoginPayloadType>({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (value) => value && !/^\S+@\S+$/.test(value) && 'Invalid email',
      password: (value) =>
        value &&
        !passwordReggex.test(value) &&
        'Votre mot passe doit faire 8 caractères minimum, contenir au minimum une majuscule, un nombre et un caractère spécial.',
    },
  });

  const SubmitLoginForm = async () => {
    setIsLoading(true);
    const api = setupPrivateApi();
    try {
      const token = await loginUser(form.values, api);

      setTokens(token);

      router.replace('/');

      showNotification({
        title: t('account:signInSuccess.notification.title'),
        message: t('account:signInSuccess.notification.message'),
        color: 'green',
      });
    } catch (e) {
      console.log(e);
      showNotification({
        title: 'Error occured',
        message: 'An error occurred while signing in.',
        color: 'red',
      });
    }
  };
  return (
    <>
      {/* Form Header */}
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Log in to your account
        </h1>
        <p className="text-sm text-muted-foreground">
          Please fill in the fields to log in.
        </p>
      </div>

      {/* Form  */}
      <div className={cn('grid gap-6')}>
        <form>
          <div className="grid gap-4">
            <div className="grid gap-3">
              {/* Email */}
              <TextInput
                id="email"
                placeholder="Email"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                required={true}
                disabled={isLoading}
                {...form.getInputProps('email')}
              />

              {/* Password */}
              <TextInput
                id="password"
                type="password"
                placeholder="Password"
                disabled={isLoading}
                required={true}
                {...form.getInputProps('password')}
              />
            </div>
            <Button
              color={'indigo'}
              onClick={SubmitLoginForm}
              disabled={isLoading}
            >
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Log in with Email
            </Button>
          </div>
        </form>

        <p className="text-md text-muted-foreground text-center">
          Don't have an account yet? <Anchor href="register">Register</Anchor>
        </p>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        {/* Socials links */}
        <Group grow>
          <ShadButton
            variant="outline"
            color="dark"
            type="button"
            disabled={isLoading}
          >
            {isLoading ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Icons.google className="mr-2 h-4 w-4" />
            )}{' '}
            Google
          </ShadButton>
          <ShadButton variant="outline" type="button" disabled={isLoading}>
            {isLoading ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Icons.apple className="mr-2 h-4 w-4" />
            )}{' '}
            Apple
          </ShadButton>
          <ShadButton variant="outline" type="button" disabled={isLoading}>
            {isLoading ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Icons.gitHub className="mr-2 h-4 w-4" />
            )}{' '}
            Github
          </ShadButton>
        </Group>
      </div>
    </>
  );
};

export default LoginForm;
