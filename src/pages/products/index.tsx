import { setupPrivateApi } from "@/api";
import { getProducts } from "@/api/product.api";
import { AuthenticatedAppLayout } from "@/common/AuthenticatedAppLayout";
import { getUserInfo } from "@/features/accounts/account.helper";
import { redirectToLoginProps } from "@/features/authentication/redirect.helper";
import ProductList from "@/features/products/components/ProductList";
import { PullStateInstance, PullstateCore } from "@/pullstate.core";
import { HTTPError } from "ky-universal";
import { GetServerSidePropsContext, NextPage } from "next";
import Head from "next/head";
import { useTranslation } from "react-i18next";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const stateInstance = PullstateCore.instantiate({ ssr: true });
  const api = setupPrivateApi(ctx);

  try {
    await getUserInfo(stateInstance, api)
    
    const products = await getProducts(api);
    stateInstance.stores.ProductStore.update((s) => {
      s.productList = products;
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

type ProductsProps = {
  snapshot: PullStateInstance;
};

const Products: NextPage<ProductsProps> = ({ snapshot }) => {
  const { t } = useTranslation("common");
  const instance = PullstateCore.instantiate({ hydrateSnapshot: snapshot });

  return (
    <AuthenticatedAppLayout instance={instance}>
      <Head>
        <title>{t("navigation.products")} | {t("appName")}</title>
        <meta name="description" content="test" />
      </Head>

      {/* TODO: Ajouter un visualiseur de la route actuelle () */}
      {/* https://www.lacentrale.fr/occasion-voiture-marque-audi.html */}
      {/* (Accueil/Voiture Audi occasion/Annonces voiture AUDI d'occasion) */}
      
      <ProductList />
    </AuthenticatedAppLayout>
  );
};
export default Products;
