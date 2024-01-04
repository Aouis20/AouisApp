import { updateUser } from '@/features/accounts/api';
import { AccountStore } from '@/features/accounts/store';
import { SalutationType, User } from '@/features/accounts/types/User';
import { setupPrivateApi } from '@/pages/api';
import {
  Button,
  Container,
  Flex,
  Group,
  InputBase,
  Select,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { IMaskInput } from 'react-imask';

export const MeTab = () => {
  const user = AccountStore.useState((s) => s.user);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const t = useTranslations();
  const Salutation = {
    [SalutationType.MR]: t('me.salutation.MR'),
    [SalutationType.MRS]: t('me.salutation.MRS'),
  };

  if (!user) {
    return <Text>Veuillez vous authentifier</Text>;
  }
  const userForm = useForm<Partial<User>>({
    initialValues: {
      salutation: user.salutation || '',
      first_name: user.first_name || '',
      last_name: user.last_name || '',
      username: user.username || '',
      email: user.email,
      phone_number: user.phone_number || '',
      address_line1: user.address_line1 || '',
      address_line2: user.address_line2 || '',
      city: user.city || '',
      state: user.state || '',
      postal_code: user.postal_code || '',
    },

    // validation only on existing values
    validate: {
      first_name: (value) =>
        value && !/^[a-zA-Z]+$/.test(value) && 'Invalid first name',
      last_name: (value) =>
        value && !/^[a-zA-Z]+$/.test(value) && 'Invalid last name',
      username: (value) =>
        value && !/^[a-zA-Z]+$/.test(value) && 'Invalid username',
      email: (value) => value && !/^\S+@\S+$/.test(value) && 'Invalid email',
    },
  });

  const handleCancel = () => {
    userForm.reset();
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const api = setupPrivateApi();
      const updatedUser = userForm.values;

      // Keep only updated values
      // updatedUser.values - user.values
      Object.entries(updatedUser).forEach(([key, value]) => {
        if (user.hasOwnProperty(key) && value === (user as any)[key]) {
          delete (updatedUser as any)[key];
        }
      });

      const newUser = await updateUser(user.id, updatedUser, api);
      AccountStore.update((s) => {
        s.user = newUser;
      });
      userForm.setValues(newUser);
      userForm.resetDirty();

      showNotification({
        title: t('me.notifications.success.title'),
        message: t('me.notifications.success.message'),
        color: 'green',
      });
    } catch (err) {
      showNotification({
        title: t('me.notifications.error.title'),
        message: t('me.notifications.error.message'),
        color: 'red',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container size={'2xl'}>
      <Title order={2}>{t('me.title')}</Title>
      <Text>{t('me.description')}</Text>

      {/* User Form */}
      <form>
        <Group align="start" mt={'md'}>
          {/* Civil */}
          <Flex direction={'column'} gap={'xl'} mb={32}>
            <Select
              label={t('me.form.civility')}
              placeholder="M."
              data={Object.entries(Salutation).map(([value, label]) => ({
                value: value,
                label: label,
              }))}
              {...userForm.getInputProps('salutation')}
            />
            <TextInput
              label={t('me.form.nickname')}
              placeholder={t('me.form.nickname')}
              {...userForm.getInputProps('username')}
            />
            <TextInput
              label={t('me.form.firstName')}
              placeholder={t('me.form.firstName')}
              {...userForm.getInputProps('first_name')}
            />
            <TextInput
              label={t('me.form.lastName')}
              placeholder={t('me.form.lastName')}
              {...userForm.getInputProps('last_name')}
            />
          </Flex>

          {/* Contact  */}
          <Flex direction={'column'} gap={'xl'} mb={32}>
            <TextInput
              label="Email"
              placeholder="Email"
              {...userForm.getInputProps('email')}
            />
            <InputBase
              label={t('me.form.phone')}
              placeholder={t('me.form.phone')}
              component={IMaskInput}
              mask="+33 0 00 00 00 00"
              {...userForm.getInputProps('phone_number')}
            />
          </Flex>

          {/* Address */}
          <Flex direction={'column'} gap={'xl'}>
            <TextInput
              label={t('me.form.address1')}
              placeholder={t('me.form.address1')}
              {...userForm.getInputProps('address_line1')}
            />
            <TextInput
              label={t('me.form.address2')}
              placeholder={t('me.form.address2')}
              {...userForm.getInputProps('address_line2')}
            />
            <TextInput
              label={t('me.form.city')}
              placeholder={t('me.form.city')}
              {...userForm.getInputProps('city')}
            />
            <TextInput
              label={t('me.form.state')}
              placeholder={t('me.form.state')}
              {...userForm.getInputProps('state')}
            />
            <TextInput
              label={t('me.form.zipCode')}
              placeholder={t('me.form.zipCode')}
              {...userForm.getInputProps('postal_code')}
            />
          </Flex>

          {/* Buttons */}
          {/* isDirty: compare form values and initial form values */}
          {userForm.isDirty() && (
            <Group
              gap={'xl'}
              mt={'xl'}
              w={300}
              style={{ justifyContent: 'end' }}
            >
              <Button
                disabled={isLoading}
                variant="outline"
                onClick={handleCancel}
                size="md"
              >
                {t('cancel')}
              </Button>
              <Button disabled={isLoading} onClick={handleSubmit} size="md">
                {t('save')}
              </Button>
            </Group>
          )}
        </Group>
      </form>
    </Container>
  );
};
