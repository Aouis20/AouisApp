import { LoginPayloadType } from '@/features/accounts/types/LoginPayloadType';
import { loginUser } from '@/features/authentication/api';
import { setupPrivateApi } from '@/pages/api';
import {
  Anchor,
  Button,
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
import router from 'next/router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { setTokens } from '../tokens.helper';
import { SocialLinks } from './SocialLinks';

export const LoginForm = () => {
  const { t } = useTranslation('account');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<LoginPayloadType>({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (value) => value && !/^\S+@\S+$/.test(value) && 'Invalid email',
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
        title: t('authentication.login.notifications.success.title'),
        message: t('authentication.login.notifications.success.message'),
        color: 'green',
      });
    } catch (e) {
      showNotification({
        title: t('authentication.login.notifications.error.title'),
        message: t('authentication.login.notifications.error.message'),
        color: 'red',
      });
    }
    setIsLoading(false);
  };
  return (
    <Flex direction={'column'} gap={'lg'} maw={'54%'}>
      {/* Form Header */}
      <Title order={2} ta={'center'}>
        {t('authentication.login.pageTitle')}
      </Title>
      <Text ta={'center'}>{t('authentication.login.text')}</Text>

      {/* Form  */}
      <form onSubmit={form.onSubmit(SubmitLoginForm)}>
        <Stack>
          {/* Email */}
          <TextInput
            id="email"
            placeholder={t('authentication.form.email') as string}
            type="email"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
            required
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
          <Button type="submit" mt={'md'} disabled={isLoading}>
            {t('authentication.login.form.submit')}
          </Button>
        </Stack>
      </form>

      <Anchor
        component="button"
        type="button"
        c="dimmed"
        onClick={() => router.push('/account/register')}
        size="sm"
        disabled={isLoading}
      >
        {t('authentication.login.form.missingAccount')}
      </Anchor>

      {/* Divider */}
      <Divider label="OU SINON CONTINUER AVEC" labelPosition="center" my="lg" />

      {/* Socials links */}
      <SocialLinks />
    </Flex>
  );
};
