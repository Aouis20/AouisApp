import { AppShell, Title } from "@mantine/core";
import { PullstateProvider } from "pullstate";
import { HeaderSection } from "./Header";
import { PullStateInstance } from "../pullstate.core";

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
      <AppShell header={<HeaderSection />}>{children}</AppShell>
    </PullstateProvider>
  );
};
