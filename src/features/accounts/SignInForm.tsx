import { useForm } from '@mantine/form';
import { useTranslation } from 'react-i18next';
import { Text, Group, TextInput, Button, createStyles } from '@mantine/core';
import { useRouter } from 'next/router';
import { setTokens } from '../authentication/tokens.helper';
import { setupPrivateApi } from '../api';
import { SignInPayloadType, signInUser } from '../api/account.api';
import { showNotification } from '@mantine/notifications';

const useStyle = createStyles((theme) => ({
  form: {
    marginTop: '8px',

    '& > div': {
      marginTop: '8px'
    }
  },
  formTitle: {
    fontSize: theme.fontSizes.xl,
    fontWeight: 600
  },
  formButton: {
    marginTop: '16px'
  }
}));

export const SignInForm = () => {
  const { t } = useTranslation();
  const { classes } = useStyle();
  const router = useRouter();

  const form = useForm<SignInPayloadType>({
    initialValues: {
      email: '',
      password: ''
    }
  });

  const submitSignInForm = async (values: SignInPayloadType) => {
    const api = setupPrivateApi();
    const result = await signInUser(values, api);
    console.log(result)

    if (result?.detail) {
      form.setErrors({ email: t(`account:signInErrors.email-${result.detail}`) });
    } else {
      setTokens(result);

      router.replace('/');

      showNotification({
        title: t('account:signInSuccess.notification.title'),
        message: t('account:signInSuccess.notification.message'),
        color: 'green'
      });
    }
  };

  return (
    <>
      <Text className={classes.formTitle}>{t('account:signInFormTitle')}</Text>
      <form className={classes.form} onSubmit={form.onSubmit(submitSignInForm)}>
        <TextInput label={t('account:signInForm.emailAddressLabel')} {...form.getInputProps('email')} required={true} />
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
