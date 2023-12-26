import { AuthenticatedAppLayout } from '@/common/AuthenticatedAppLayout';
import { getUserInfo } from '@/features/accounts/helper';
import { redirectToLoginProps } from '@/features/authentication/redirect.helper';
import { getProductById } from '@/features/products/api';
import { ProductDetailsPage } from '@/features/products/components/ProductDetailsPage';
import { setupPrivateApi } from '@/pages/api';
import { PullStateInstance, PullstateCore } from '@/pullstate.core';
import { HTTPError } from 'ky-universal';
import { GetServerSidePropsContext, NextPage } from 'next';
import { useTranslations } from 'next-intl';
import Head from 'next/head';

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const stateInstance = PullstateCore.instantiate({ ssr: true });
  const api = setupPrivateApi(ctx);
  const id = Number(ctx.params?.id);

  try {
    await getUserInfo(stateInstance, api);

    const product = await getProductById(id, api);
    stateInstance.stores.ProductStore.update((s) => {
      s.product = product;
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

type ProductDetailsProps = {
  snapshot: PullStateInstance;
};

const ProductDetails: NextPage<ProductDetailsProps> = ({ snapshot }) => {
  const t = useTranslations();
  const instance = PullstateCore.instantiate({ hydrateSnapshot: snapshot });

  return (
    <AuthenticatedAppLayout instance={instance}>
      <Head>
        <title>
          {t('header.navigation.products')} | {t('appName')}
        </title>
        <meta name="description" content="test" />
      </Head>

      <ProductDetailsPage />
    </AuthenticatedAppLayout>
  );
};
export default ProductDetails;
