import { setupPrivateApi } from '@/api';
import { updateUser } from '@/api/account.api';
import { AccountStore } from '@/features/accounts/AccountStore';
import { SalutationType, User } from '@/features/accounts/types/User';
import {
  AspectRatio,
  Box,
  Button,
  Container,
  Flex,
  Group,
  Image,
  InputBase,
  Paper,
  Select,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IMaskInput } from 'react-imask';

const Salutation = {
  [SalutationType.MR]: 'M.',
  [SalutationType.MRS]: 'Mme.',
};

const Me = () => {
  const user = AccountStore.useState((s) => s.user);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  if (!user) {
    return <Text>Veuillez vous authentifier</Text>;
  }
  const { t } = useTranslation('');
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
    console.log('submitted');
    // TODO update account
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
        title: 'Account Updated',
        message: 'Account has been successfully updated',
        color: 'green',
      });
    } catch (err) {
      showNotification({
        title: 'Error updating account',
        message: 'An error has occurred while updating your account',
        color: 'red',
      });
    }
  };

  return (
    <Container size={'2xl'}>
      <Paper shadow="sm" radius="md" p="lg" withBorder mb={'lg'}>
        <Title order={2}>Mon compte</Title>
        <Text>Retrouvez ici, vos informations confidentielles.</Text>
      </Paper>

      {/* User Form */}
      <form>
        <Group align="start" mt={'md'}>
          <Box w={300} sx={{ alignSelf: 'start' }} mt={'sm'} mr={30} mb={32}>
            <AspectRatio ratio={4 / 3} maw={300}>
              <Image
                sx={{ borderRadius: 8 }}
                src="https://images.unsplash.com/photo-1527118732049-c88155f2107c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80"
                alt="Panda"
              />
            </AspectRatio>
          </Box>

          <Group align="start">
            {/* Civil */}
            <Flex direction={'column'} gap={'xl'} mb={32}>
              <Select
                label="Civilité"
                placeholder="M."
                data={Object.entries(Salutation).map(([value, label]) => ({
                  value: value,
                  label: label,
                }))}
                {...userForm.getInputProps('salutation')}
              />
              <TextInput
                label="Username"
                placeholder="Username"
                {...userForm.getInputProps('username')}
              />
              <TextInput
                label="First name"
                placeholder="First name"
                {...userForm.getInputProps('first_name')}
              />
              <TextInput
                label="Last name"
                placeholder="Last name"
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
                label="Phone"
                placeholder="Phone number"
                component={IMaskInput}
                mask="+33 0 00 00 00 00"
                {...userForm.getInputProps('phone_number')}
              />
            </Flex>

            {/* Address */}
            <Flex direction={'column'} gap={'xl'}>
              <TextInput
                label="Address"
                placeholder="Your address line 1"
                {...userForm.getInputProps('address_line1')}
              />
              <TextInput
                label="Address 2"
                placeholder="Your address line 2"
                {...userForm.getInputProps('address_line2')}
              />
              <TextInput
                label="City"
                placeholder="City"
                {...userForm.getInputProps('city')}
              />
              <TextInput
                label="State"
                placeholder="State"
                {...userForm.getInputProps('state')}
              />
              <TextInput
                label="Postal Code"
                placeholder="Postal Code"
                {...userForm.getInputProps('postal_code')}
              />
            </Flex>

            {/* Buttons */}
            {/* isDirty: compare form values and initial form values */}
            {userForm.isDirty() && (
              <Group
                spacing={'xl'}
                mt={'xl'}
                w={300}
                sx={{ justifyContent: 'end' }}
              >
                <Button
                  disabled={isLoading}
                  variant="outline"
                  onClick={handleCancel}
                  size="md"
                >
                  Cancel
                </Button>
                <Button disabled={isLoading} onClick={handleSubmit} size="md">
                  Save
                </Button>
              </Group>
            )}
          </Group>
        </Group>
      </form>
    </Container>
  );
};

export default Me;
