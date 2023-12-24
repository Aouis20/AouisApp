import { LanguageSelector } from '@/common/LanguageSelector';
import { useTranslation } from 'react-i18next';
import { LeftPanel } from './LeftPanel';
import { RegisterForm } from './RegisterForm';
import { Flex } from '@mantine/core';

const RegisterPage = () => {
  const { t } = useTranslation('account');
  return (
    <div className="container min-h-screen relative flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      {/* Left Panel */}
      <LeftPanel />

      {/* Right Panel */}
      <Flex direction={'column'} align={'center'} gap={'lg'}>
        <LanguageSelector />
        <RegisterForm />
      </Flex>
    </div>
  );
};

export default RegisterPage;
