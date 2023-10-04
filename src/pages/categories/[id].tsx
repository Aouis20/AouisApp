import { AuthenticatedAppLayout } from '@/common/AuthenticatedAppLayout';
import { getUserInfo } from '@/features/accounts/helper';
import { redirectToLoginProps } from '@/features/authentication/redirect.helper';
import { getCategoryById } from '@/features/categories/api';
import CategoryDetailsPage from '@/features/categories/components/CategoryDetailsPage';
import { getProducts } from '@/features/products/api';
import { setupPrivateApi } from '@/pages/api';
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

    const category = await getCategoryById(id, api);
    stateInstance.stores.CategoryStore.update((s) => {
      s.category = category;
    });

    const products = await getProducts(1, {}, api);
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

type CategoryDetailsProps = {
  snapshot: PullStateInstance;
};

const CategoryDetails: NextPage<CategoryDetailsProps> = ({ snapshot }) => {
  const { t } = useTranslation('common');
  const instance = PullstateCore.instantiate({ hydrateSnapshot: snapshot });

  return (
    <AuthenticatedAppLayout instance={instance}>
      <Head>
        <title>
          {t('content:header.navigation.categories')} | {t('appName')}
        </title>
        <meta name="description" content="test" />
      </Head>

      <CategoryDetailsPage />
    </AuthenticatedAppLayout>
  );
};
export default CategoryDetails;
