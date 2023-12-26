import { LanguageSelector } from '@/common/LanguageSelector';
import { Flex } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { LeftPanel } from './LeftPanel';
import { RegisterForm } from './RegisterForm';

const RegisterPage = () => {
  const t = useTranslations();
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
