import { updateUser } from '@/features/accounts/api';
import { AccountStore } from '@/features/accounts/store';
import { setupPrivateApi } from '@/pages/api';
import { Button, Menu } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IconWorld } from '@tabler/icons-react';
import i18next from 'i18next';
import ReactCountryFlag from 'react-country-flag';
import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
  const { t } = useTranslation('account');
  const user = AccountStore.useState((s) => s.user);
  const languageDict: Record<string, JSX.Element> = {
    FR: <ReactCountryFlag countryCode="FR" svg />,
    EN: <ReactCountryFlag countryCode="GB" svg />,
  };

  const handleChangeLanguage = async (language: string) => {
    if (!user) {
      return;
    }
    const api = setupPrivateApi();

    try {
      const updatedUser = await updateUser(
        user.id,
        { language: language },
        api
      );
      i18next.changeLanguage(language);
      AccountStore.update((s) => {
        s.user = updatedUser;
      });
      i18next.reloadResources();
      showNotification({
        title: t('language.notification.successTitle'),
        message: t('language.notification.successMessage', {
          language: t(`language.languages.${String(language)}`),
        }),
        color: 'green',
      });
    } catch (err) {
      showNotification({
        title: t('language.notification.errorTitle'),
        message: t('language.notification.errorMessage', {
          language: t(`language.languages.${String(language)}`),
        }),
        color: 'red',
      });
    }
  };

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Button
          variant="outline"
          leftIcon={
            user?.language ? (
              languageDict[user.language]
            ) : (
              <IconWorld size={14} />
            )
          }
        >
          {t('language.title')}
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>{t('language.label')}</Menu.Label>
        <Menu.Item
          icon={<ReactCountryFlag countryCode="FR" svg />}
          onClick={() => handleChangeLanguage('FR')}
        >
          {t('language.languages.fr')}
        </Menu.Item>
        <Menu.Item
          icon={<ReactCountryFlag countryCode="GB" svg />}
          onClick={() => handleChangeLanguage('EN')}
        >
          {t('language.languages.en')}
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default LanguageSelector;
