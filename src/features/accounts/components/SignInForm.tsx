import { setupPrivateApi } from '@/api';
import { signInUser } from '@/api/authentication.api';
import { setTokens } from '@/features/authentication/tokens.helper';
import { Button, Group, Text, TextInput, createStyles } from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { HTTPError } from 'ky';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { LoginPayloadType } from '../types/SignIn';

const useStyle = createStyles((theme) => ({
  form: {
    marginTop: '8px',

    '& > div': {
      marginTop: '8px',
    },
  },
  formTitle: {
    fontSize: theme.fontSizes.xl,
    fontWeight: 600,
  },
  formButton: {
    marginTop: '16px',
  },
}));

export const SignInForm = () => {
  const { t } = useTranslation();
  const { classes } = useStyle();
  const router = useRouter();

  const form = useForm<LoginPayloadType>({
    initialValues: {
      email: '',
      password: '',
    },
  });

  const submitSignInForm = async (values: LoginPayloadType) => {
    const api = setupPrivateApi();

    try {
      const token = await signInUser(values, api);

      setTokens(token);

      router.replace('/');

      showNotification({
        title: t('account:signInSuccess.notification.title'),
        message: t('account:signInSuccess.notification.message'),
        color: 'green',
      });
    } catch (e) {
      if (!(e instanceof HTTPError)) return;

      const error = e as HTTPError;
      const data = await error.response.json();

      form.setErrors({ email: t(`account:signInErrors.email-${data.detail}`) });
    }
  };

  return (
    <>
      <Text className={classes.formTitle}>{t('account:signInFormTitle')}</Text>
      <form className={classes.form} onSubmit={form.onSubmit(submitSignInForm)}>
        <TextInput
          label={t('account:signInForm.emailAddressLabel')}
          {...form.getInputProps('email')}
          required={true}
        />
        <TextInput
          type={'password'}
          label={t('account:signInForm.passwordLabel')}
          {...form.getInputProps('password')}
          required={true}
        />
        <Group position="right">
          <Button className={classes.formButton} type="submit">
            {t('account:signInForm.submitButton')}
          </Button>
        </Group>
      </form>
    </>
  );
};
