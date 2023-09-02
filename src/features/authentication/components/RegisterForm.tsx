import { signUpUser } from '@/features/accounts/api';
import { SignInPayloadType } from '@/features/accounts/types/SignIn';
import { cn } from '@/lib/utils';
import { setupPrivateApi } from '@/pages/api';
import { Icons } from '@/shadui/icons';
import { ShadButton } from '@/shadui/ui/button';
import { Anchor, Button, Group, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import router from 'next/router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { setTokens } from '../tokens.helper';

const RegisterForm = () => {
  const { t } = useTranslation('account');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const passwordReggex = new RegExp(
    '^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}[]:;<>,.?~-]).{8,}$'
  );

  const form = useForm<SignInPayloadType>({
    initialValues: {
      email: '',
      password: '',
      confirmation: '',
    },

    validate: {
      email: (value) => value && !/^\S+@\S+$/.test(value) && 'Invalid email',
      password: (value) =>
        value &&
        !passwordReggex.test(value) &&
        'Votre mot passe doit faire 8 caractères minimum, contenir au minimum une majuscule, un nombre et un caractère spécial.',
      confirmation: (value) =>
        value &&
        !passwordReggex.test(value) &&
        'Le mot passe doit être identique et faire 8 caractères minimum, contenir au minimum une majuscule, un nombre et un caractère spécial.',
    },
  });

  const submitRegisterForm = async () => {
    if (form.values.password !== form.values.confirmation) {
      form.setFieldError('confirmation', 'Both passwords do not match');
      return;
    }

    setIsLoading(true);
    const api = setupPrivateApi();
    try {
      const token = await signUpUser(form.values, api);

      setTokens(token);

      router.replace('/');

      showNotification({
        title: t('authentication.register.notifications.success.title'),
        message: t('authentication.register.notifications.success.message'),
        color: 'green',
      });
    } catch (e) {
      console.log(e);
      showNotification({
        title: t('authentication.register.notifications.error.title'),
        message: t('authentication.register.notifications.error.message'),
        color: 'red',
      });
    }
  };
  return (
    <>
      {/* Form Header */}
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          {t('authentication.register.pageTitle')}
        </h1>
        <p className="text-sm text-muted-foreground">
          {t('authentication.register.text')}
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
                placeholder={t('authentication.form.email') as string}
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
                placeholder={t('authentication.form.password') as string}
                disabled={isLoading}
                required={true}
                {...form.getInputProps('password')}
              />

              {/* Password confirmation */}
              <TextInput
                id="confirmation"
                type="password"
                placeholder={
                  t('authentication.form.passwordConfirmation') as string
                }
                required={true}
                disabled={isLoading}
                {...form.getInputProps('confirmation')}
              />
            </div>
            <Button
              color={'indigo'}
              onClick={submitRegisterForm}
              disabled={isLoading}
            >
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              {t('authentication.register.form.submit')}
            </Button>
          </div>
        </form>

        <p className="text-md text-muted-foreground text-center">
          {!isLoading && (
            <>
              {t('authentication.register.form.existingAccount')}{' '}
              <Anchor href="/account/login">
                {t('authentication.register.form.login')}
              </Anchor>
            </>
          )}
        </p>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              {t('authentication.form.orContinueWith')}
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

export default RegisterForm;
