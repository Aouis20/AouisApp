import { updateUser } from '@/features/accounts/api';
import { AccountStore } from '@/features/accounts/store';
import { setupPrivateApi } from '@/pages/api';
import { Button, Menu } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IconWorld } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import ReactCountryFlag from 'react-country-flag';

export const LanguageSelector = () => {
  const t = useTranslations();
  const router = useRouter();
  const user = AccountStore.useState((s) => s.user);
  const languageDict: Record<string, JSX.Element> = {
    FR: <ReactCountryFlag countryCode="FR" svg />,
    EN: <ReactCountryFlag countryCode="GB" svg />,
  };

  const handleChangeLanguage = async (language: string) => {
    const api = setupPrivateApi();

    try {
      if (user) {
        const updatedUser = await updateUser(
          user.id,
          { language: language.toUpperCase() },
          api
        );
        AccountStore.update((s) => {
          s.user = updatedUser;
        });
      }
      router.replace(router.asPath, router.asPath, { locale: language });
      showNotification({
        title: t('languageSelector.notifications.success.title'),
        message: t('languageSelector.notifications.success.message', {
          language: t(
            `languageSelector.languages.${String(language).toLowerCase()}`
          ),
        }),
        color: 'green',
      });
    } catch (err) {
      console.log(err);
      showNotification({
        title: t('languageSelector.notifications.error.title'),
        message: t('languageSelector.notifications.error.message', {
          language: t(
            `languageSelector.languages.${String(language).toLowerCase()}`
          ),
        }),
        color: 'red',
      });
    }
  };

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Button
          variant="light"
          leftSection={
            user?.language ? (
              languageDict[user.language]
            ) : (
              <IconWorld size={14} />
            )
          }
        >
          {t('languageSelector.title')}
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>{t('languageSelector.label')}</Menu.Label>
        <Menu.Item
          leftSection={<ReactCountryFlag countryCode="FR" svg />}
          onClick={() => handleChangeLanguage('fr')}
        >
          {t('languageSelector.languages.fr')}
        </Menu.Item>
        <Menu.Item
          leftSection={<ReactCountryFlag countryCode="GB" svg />}
          onClick={() => handleChangeLanguage('en')}
        >
          {t('languageSelector.languages.en')}
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
