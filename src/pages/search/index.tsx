import { AuthenticatedAppLayout } from '@/common/AuthenticatedAppLayout';
import { getUserInfo } from '@/features/accounts/helper';
import { getCategories } from '@/features/categories/api';
import { SearchPage } from '@/features/search/components/SearchPage';
import { setupPrivateApi } from '@/pages/api';
import { PullStateInstance, PullstateCore } from '@/pullstate.core';
import type { GetServerSidePropsContext, NextPage } from 'next';
import { useTranslations } from 'next-intl';
import Head from 'next/head';

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const stateInstance = PullstateCore.instantiate({ ssr: true });
  const api = setupPrivateApi(ctx);

  try {
    await getUserInfo(stateInstance, api);
    const categoryList = await getCategories(api);
    stateInstance.stores.CategoryStore.update((s) => {
      s.categoryList = categoryList;
    });
  } catch (e) {
    console.error(e);
  } finally {
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
  }
};

interface SearchPageProps {
  snapshot: PullStateInstance;
}

const Search: NextPage<SearchPageProps> = ({ snapshot }) => {
  const instance = PullstateCore.instantiate({ hydrateSnapshot: snapshot });
  const t = useTranslations();

  return (
    <AuthenticatedAppLayout instance={instance}>
      <Head>
        <title>
          {t('header.navigation.search')} | {t('appName')}
        </title>
        <meta name="description" content="Aouis Search" />
      </Head>

      <SearchPage />
    </AuthenticatedAppLayout>
  );
};

export default Search;
