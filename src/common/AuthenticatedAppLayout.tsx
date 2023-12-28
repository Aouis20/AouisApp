import { AppShell } from '@mantine/core';
import { PullstateProvider } from 'pullstate';
import { PullStateInstance } from '../pullstate.core';
import { HeaderSection } from './Header';
import { FooterSection } from './Footer';

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
      <AppShell>
        <AppShell.Header>
          <HeaderSection />
        </AppShell.Header>

        <AppShell.Main mt={100}>{children}</AppShell.Main>

        <FooterSection />
      </AppShell>
    </PullstateProvider>
  );
};
