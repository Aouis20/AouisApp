import { AuthenticatedAppLayout } from '@/common/AuthenticatedAppLayout';
import { getUserInfo } from '@/features/accounts/helper';
import { getTokens } from '@/features/authentication/tokens.helper';
import { getCategoryById } from '@/features/categories/api';
import { CategoryDetailsPage } from '@/features/categories/components/CategoryDetailsPage';
import { getProducts } from '@/features/products/api';
import { setupPrivateApi } from '@/pages/api';
import { PullStateInstance, PullstateCore } from '@/pullstate.core';
import { GetServerSidePropsContext, NextPage } from 'next';
import { useTranslations } from 'next-intl';
import Head from 'next/head';

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const stateInstance = PullstateCore.instantiate({ ssr: true });
  const api = setupPrivateApi(ctx);
  const id = Number(ctx.params?.id);

  try {
    const authTokens = getTokens(ctx);
    if (authTokens?.access) {
      await getUserInfo(stateInstance, api);
    }

    const category = await getCategoryById(id, api);
    stateInstance.stores.CategoryStore.update((s) => {
      s.category = category;
    });

    const products = await getProducts(1, { category_id: id }, api);
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
    return { props: {} };
  }
};

type CategoriesDetailsProps = {
  snapshot: PullStateInstance;
};

const CategoriesDetails: NextPage<CategoriesDetailsProps> = ({ snapshot }) => {
  const t = useTranslations();
  const instance = PullstateCore.instantiate({ hydrateSnapshot: snapshot });

  return (
    <AuthenticatedAppLayout instance={instance}>
      <Head>
        <title>
          {t('header.navigation.categories')} | {t('appName')}
        </title>
        <meta name="description" content="Aouis Categories" />
      </Head>

      <CategoryDetailsPage />
    </AuthenticatedAppLayout>
  );
};

export default CategoriesDetails;
