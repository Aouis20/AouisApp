import { setupPrivateApi } from '@/api';
import { getProductById } from '@/api/product.api';
import { AuthenticatedAppLayout } from '@/common/AuthenticatedAppLayout';
import { getUserInfo } from '@/features/accounts/account.helper';
import { redirectToLoginProps } from '@/features/authentication/redirect.helper';
import ProductDetailsPage from '@/features/products/components/ProductDetailsPage';
import { PullStateInstance, PullstateCore } from '@/pullstate.core';
import { HTTPError } from 'ky-universal';
import { GetServerSidePropsContext, NextPage } from 'next';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation('common');
  const instance = PullstateCore.instantiate({ hydrateSnapshot: snapshot });

  return (
    <AuthenticatedAppLayout instance={instance}>
      <Head>
        <title>
          {t('navigation.products')} | {t('appName')}
        </title>
        <meta name="description" content="test" />
      </Head>

      <ProductDetailsPage />
    </AuthenticatedAppLayout>
  );
};
export default ProductDetails;
