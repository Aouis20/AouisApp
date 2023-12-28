import { AuthenticatedAppLayout } from '@/common/AuthenticatedAppLayout';
import { getUserInfo } from '@/features/accounts/helper';
import { redirectToLoginProps } from '@/features/authentication/redirect.helper';
import { getTokens } from '@/features/authentication/tokens.helper';
import { getProducts } from '@/features/products/api';
import { ProductPage } from '@/features/products/components/ProductPage';
import { setupPrivateApi } from '@/pages/api';
import { PullStateInstance, PullstateCore } from '@/pullstate.core';
import { HTTPError } from 'ky-universal';
import { GetServerSidePropsContext, NextPage } from 'next';
import { useTranslations } from 'next-intl';
import Head from 'next/head';

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const stateInstance = PullstateCore.instantiate({ ssr: true });
  const api = setupPrivateApi(ctx);

  try {
    const authTokens = getTokens(ctx);
    if (authTokens?.access) {
      await getUserInfo(stateInstance, api);
    }

    const products = await getProducts(1, {}, api);
    stateInstance.stores.ProductStore.update((s) => {
      s.productList = products;
    });

    return {
      props: {
        snapshot: stateInstance.getPullstateSnapshot(),
        messages: {
          ...(await import(`public/locales/${ctx.locale}/common.json`)).default,
          ...(await import(`public/locales/${ctx.locale}/content.json`))
            .default,
        },
      },
    };
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
  const t = useTranslations();
  const instance = PullstateCore.instantiate({ hydrateSnapshot: snapshot });

  return (
    <AuthenticatedAppLayout instance={instance}>
      <Head>
        <title>
          {t('header.navigation.products')} | {t('appName')}
        </title>
        <meta name="description" content="Aouis Products" />
      </Head>

      <ProductPage />
    </AuthenticatedAppLayout>
  );
};
export default Products;
