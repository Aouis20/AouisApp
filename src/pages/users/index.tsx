import { setupPrivateApi } from "@/api";
import { getUserList } from "@/api/account.api";
import { AuthenticatedAppLayout } from "@/common/AuthenticatedAppLayout";
import { getUserInfo } from "@/features/accounts/account.helper";
import AccountList from "@/features/accounts/components/AccountList";
import { redirectToLoginProps } from "@/features/authentication/redirect.helper";
import { PullStateInstance, PullstateCore } from "@/pullstate.core";
import { Box, createStyles } from "@mantine/core";
import { HTTPError } from "ky-universal";
import { GetServerSidePropsContext, NextPage } from "next";
import Head from "next/head";
import { useTranslation } from "react-i18next";

const useStyles = createStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    height: "calc(100vh - 64px)",
    paddingTop: "32px",
  },
  boxTitle: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "16px",
    margin: "0 0 32px 0",
  },
}));

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const stateInstance = PullstateCore.instantiate({ ssr: true });
  const api = setupPrivateApi(ctx);

  try {
    await getUserInfo(stateInstance, api);
    const userList = await getUserList(api);
    stateInstance.stores.AccountStore.update((s) => {
      s.userList = userList;
    });

    return { props: { snapshot: stateInstance.getPullstateSnapshot() } };
  } catch (e) {
    const error = e as HTTPError;
    if (error?.response?.status === 401) {
      return redirectToLoginProps();
    }

    return { props: {} };
  }
};

type UsersPageProps = {
  snapshot: PullStateInstance;
};

const UsersPage: NextPage<UsersPageProps> = ({ snapshot }) => {
  const { t } = useTranslation("common");
  const { classes } = useStyles();
  const instance = PullstateCore.instantiate({ hydrateSnapshot: snapshot });

  return (
    <AuthenticatedAppLayout instance={instance}>
      <Head>
        <title>
          {t("appName")} | {t("navigation.users")}
        </title>
        <meta name="description" content="test" />
      </Head>

      <Box className={classes.container}>
        <AccountList />
      </Box>
    </AuthenticatedAppLayout>
  );
};

export default UsersPage;
