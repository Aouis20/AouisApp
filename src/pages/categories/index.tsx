import { AuthenticatedAppLayout } from '@/common/AuthenticatedAppLayout';
import { getUserInfo } from '@/features/accounts/helper';
import { redirectToLoginProps } from '@/features/authentication/redirect.helper';
import { getCategories } from '@/features/categories/api';
import CategoryPage from '@/features/categories/components/CategoryPage';
import { setupPrivateApi } from '@/pages/api';
import { PullStateInstance, PullstateCore } from '@/pullstate.core';
import { HTTPError } from 'ky-universal';
import { GetServerSidePropsContext, NextPage } from 'next';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const stateInstance = PullstateCore.instantiate({ ssr: true });
  const api = setupPrivateApi(ctx);

  try {
    await getUserInfo(stateInstance, api);

    const categoryList = await getCategories(api);
    stateInstance.stores.CategoryStore.update((s) => {
      s.categoryList = categoryList;
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
  const { t } = useTranslation('content');
  const instance = PullstateCore.instantiate({ hydrateSnapshot: snapshot });

  return (
    <AuthenticatedAppLayout instance={instance}>
      <Head>
        <title>
          {t('header.navigation.categories')} | {t('common:appName')}
        </title>
        <meta name="description" content="Aouis Categories" />
      </Head>

      <CategoryPage />
    </AuthenticatedAppLayout>
  );
};

export default CategoriesPage;
