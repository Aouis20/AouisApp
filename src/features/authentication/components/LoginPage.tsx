import { LanguageSelector } from '@/common/LanguageSelector';
import { Flex } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { LeftPanel } from './LeftPanel';
import { LoginForm } from './LoginForm';

export const LoginPage = () => {
  const { t } = useTranslation('account');

  return (
    <div className="container min-h-screen relative flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      {/* Left Panel */}
      <LeftPanel />

      {/* Right Panel */}
      <Flex direction={'column'} align={'center'} gap={'lg'}>
        <LanguageSelector />
        <LoginForm />
      </Flex>
    </div>
  );
};
