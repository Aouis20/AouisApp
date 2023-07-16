import { setupPrivateApi } from "@/src/api";
import { getProducts } from "@/src/api/product.api";
import { AuthenticatedAppLayout } from "@/src/common/AuthenticatedAppLayout";
import { getUserInfo } from "@/src/features/accounts/account.helper";
import { redirectToLoginProps } from "@/src/features/authentication/redirect.helper";
import ProductList from "@/src/features/products/ProductList";
import { PullStateInstance, PullstateCore } from "@/src/pullstate.core";
import { Box, Container, Divider, Flex, Grid, Text, Title } from "@mantine/core";
import { IconAdjustments } from "@tabler/icons-react";
import { HTTPError } from "ky-universal";
import { GetServerSidePropsContext, NextPage } from "next";
import Head from "next/head";
import { useTranslation } from "react-i18next";



export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const stateInstance = PullstateCore.instantiate({ ssr: true });
  const api = setupPrivateApi(ctx)

  try {
    await getUserInfo(stateInstance, api);
    const productList = await getProducts(api)
    stateInstance.stores.ProductStore.update((s) => {
      s.productList = productList;
    });

    return { props: { snapshot: stateInstance.getPullstateSnapshot() } };
  } catch (e) {
    const error = e as HTTPError;
    if (error.response.status === 401) {
      return redirectToLoginProps();
    }

    return { props: {} };
  }
};

type ProductsPageProps = {
  snapshot: PullStateInstance;
};

const Products: NextPage<ProductsPageProps> = ({ snapshot }) => {
  const { t } = useTranslation("common");
  const instance = PullstateCore.instantiate({ hydrateSnapshot: snapshot });
  const productList = instance.stores.ProductStore.useState((s) => s.productList)

  return (
    <AuthenticatedAppLayout instance={instance}>
      <Head>
        <title>{t("navigation.products")} | {t("appName")}</title>
        <meta name="description" content="test" />
      </Head>

      {/* TODO: Ajouter un visualiseur de la route actuelle () */}
      {/* https://www.lacentrale.fr/occasion-voiture-marque-audi.html */}
      {/* (Accueil/Voiture Audi occasion/Annonces voiture AUDI d'occasion) */}
      
      <ProductList productList={productList} />
    </AuthenticatedAppLayout>
  );
};

export default Products;
