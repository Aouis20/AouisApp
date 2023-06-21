import { AuthenticatedAppLayout } from "@/src/common/AuthenticatedAppLayout";
import ProductList from "@/src/features/products/ProductList";
import { PullStateInstance, PullstateCore } from "@/src/pullstate.core";
import { Box, Divider, Text, Title, createStyles } from "@mantine/core";
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

  try {
    // await getUserAndTenantInfo(stateInstance, api);

    return { props: { snapshot: stateInstance.getPullstateSnapshot() } };
  } catch (e) {
    const error = e as HTTPError;
    if (error.response.status === 401) {
      //   return redirectToLoginProps();
    }

    return { props: {} };
  }
};

type ProductsPageProps = {
  snapshot: PullStateInstance;
};

const Products: NextPage<ProductsPageProps> = ({ snapshot }) => {
  const { t } = useTranslation("common");
  const { classes } = useStyles();
  const instance = PullstateCore.instantiate({ hydrateSnapshot: snapshot });

  return (
    <AuthenticatedAppLayout instance={instance}>
      <Head>
        <title>
          {t("appName")} | {t("navigation.products")}
        </title>
        <meta name="description" content="test" />
      </Head>

      <Box className={classes.container}>
        <Box className={classes.boxTitle}>
          <Title order={1}>Liste des produits :</Title>
          <Text>Retrouvez ici différents produits</Text>
        </Box>
        <Divider />

        <ProductList />
      </Box>
    </AuthenticatedAppLayout>
  );
};

export default Products;
