import { useForm } from '@mantine/form';
import { useTranslation } from 'react-i18next';
import { Text, Group, TextInput, Button, createStyles } from '@mantine/core';
import { useRouter } from 'next/router';
import { setTokens } from '../authentication/tokens.helper';
import { setupPrivateApi } from '../../api';
import { SignUpPayloadType, signUpUser } from '../../api/account.api';
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

export const SignUpForm = () => {
  const { t } = useTranslation();
  const { classes } = useStyle();
  const router = useRouter();

  const form = useForm<SignUpPayloadType>({
    initialValues: {
      email: '',
      password: '',
      confirmation: ''
    }
  });

  const submitSignUpForm = async (values: SignUpPayloadType) => {
    const api = setupPrivateApi();
    const result = await signUpUser(values, api);

    if (result?.detail) {
      form.setErrors({ email: t(`account:signUpErrors.email-${result.detail}`) });
    } else {
      setTokens(result);

      router.replace('/');

      showNotification({
        title: t('account:signUpSuccess.notification.title'),
        message: t('account:signUpSuccess.notification.message'),
        color: 'green'
      });
    }
  };

  return (
    <>
      <Text className={classes.formTitle}>{t('account:signUpFormTitle')}</Text>
      <form className={classes.form} onSubmit={form.onSubmit(submitSignUpForm)}>
        <TextInput label={t('account:signUpForm.emailAddressLabel')} {...form.getInputProps('email')} required={true} />
        <TextInput
          type={'password'}
          label={t('account:signUpForm.passwordLabel')}
          {...form.getInputProps('password')}
          required={true}
        />
        <TextInput
          type={'confirmation'}
          label={t('account:signUpForm.confirmationLabel')}
          {...form.getInputProps('confirmation')}
          required={true}
        />
        <Group position="right">
          <Button className={classes.formButton} type="submit">
            {t('account:signUpForm.submitButton')}
          </Button>
        </Group>
      </form>
    </>
  );
};
