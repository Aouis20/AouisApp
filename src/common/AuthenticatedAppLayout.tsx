import { AppShell } from '@mantine/core';
import { PullstateProvider } from 'pullstate';
import { PullStateInstance } from '../pullstate.core';
import { HeaderSection } from './Header';
import FooterSection from './Footer';

type AppLayoutProps = {
  children?: React.ReactNode;
  instance: PullStateInstance;
};

export const AuthenticatedAppLayout = ({
  children,
  instance,
}: AppLayoutProps) => {
  return (
    <PullstateProvider instance={instance}>
      <AppShell header={<HeaderSection />} footer={<FooterSection />}>
        {children}
      </AppShell>
    </PullstateProvider>
  );
};
