import { AuthenticatedAppLayout } from "@/src/common/AuthenticatedAppLayout";
import { getUserInfo } from "@/src/features/accounts/account.helper";
import { setupPrivateApi } from "@/src/features/api";
import { getCategories } from "@/src/features/api/category.api";
import { redirectToLoginProps } from "@/src/features/authentication/redirect.helper";
import Categories from "@/src/features/categories/Categories";
import { PullStateInstance, PullstateCore } from "@/src/pullstate.core";
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
    const categories = await getCategories(api);
    stateInstance.stores.CategoryStore.update((s) => {
      s.categories = categories;
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

type CategoriesPageProps = {
  snapshot: PullStateInstance;
};

const CategoriesPage: NextPage<CategoriesPageProps> = ({ snapshot }) => {
  const { t } = useTranslation("common");
  const { classes } = useStyles();
  const instance = PullstateCore.instantiate({ hydrateSnapshot: snapshot });

  return (
    <AuthenticatedAppLayout instance={instance}>
      <Head>
        <title>{t("navigation.categories")} | {t("appName")}</title>
        <meta name="description" content="test" />
      </Head>

      <Box className={classes.container}>
        <Categories />
      </Box>
    </AuthenticatedAppLayout>
  );
};

export default CategoriesPage;
