import { createUser } from '@/features/accounts/api';
import { RegisterPayloadType } from '@/features/accounts/types/RegisterPayloadType';
import { setupPrivateApi } from '@/pages/api';
import {
  Anchor,
  Button,
  Checkbox,
  Divider,
  Flex,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import router from 'next/router';
import { useState } from 'react';
import { setTokens } from '../tokens.helper';
import { SocialLinks } from './SocialLinks';

export const RegisterForm = () => {
  const t = useTranslations();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [terms, setTerms] = useState<boolean>(false);
  const passwordReggex = new RegExp(
    '^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()-_=+{};:,<.>]).{8,}$'
  );

  const form = useForm<RegisterPayloadType>({
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
      const token = await createUser(form.values, api);

      setTokens(token);

      router.replace('/account/login');

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
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Flex direction={'column'} gap={'lg'}>
      {/* Form Header */}
      <Title order={2} ta={'center'}>
        {t('authentication.register.pageTitle')}
      </Title>
      <Text ta={'center'}>{t('authentication.register.text')}</Text>

      {/* Form  */}
      <form onSubmit={form.onSubmit(submitRegisterForm)}>
        <Stack>
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
          <PasswordInput
            id="password"
            type="password"
            placeholder={t('authentication.form.password') as string}
            autoComplete="password"
            disabled={isLoading}
            required
            {...form.getInputProps('password')}
          />

          {/* Password confirmation */}
          <PasswordInput
            id="confirmation"
            type="password"
            placeholder={
              t('authentication.form.passwordConfirmation') as string
            }
            autoComplete="confirmation"
            disabled={isLoading}
            required
            {...form.getInputProps('confirmation')}
          />

          {/* Terms & Conditions */}
          <Checkbox
            label={
              <Text c={'dimmed'} fz={'sm'}>
                {t('authentication.form.byClicking')}{' '}
                <Link
                  href="/terms"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  {t('authentication.form.termsOfService')}
                </Link>{' '}
                {t('authentication.form.andOur')}{' '}
                <Link
                  href="/privacy"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  {t('authentication.form.privacyPolicy')}
                </Link>
                .
              </Text>
            }
            checked={terms}
            disabled={isLoading}
            onChange={(event) => setTerms(event.currentTarget.checked)}
          />
          <Button type="submit" mt={'md'} disabled={isLoading || !terms}>
            {t('authentication.register.form.submit')}
          </Button>
        </Stack>
      </form>

      <Anchor
        component="button"
        type="button"
        c="dimmed"
        onClick={() => router.push('/account/login')}
        size="sm"
        disabled={isLoading}
      >
        {t('authentication.register.form.existingAccount')}
      </Anchor>

      {/* Divider */}
      <Divider
        label={t('authentication.form.orContinueWith')}
        labelPosition="center"
        my="lg"
      />

      {/* Socials links */}
      <SocialLinks />
    </Flex>
  );
};
