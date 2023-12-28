import { AuthenticatedAppLayout } from '@/common/AuthenticatedAppLayout';
import { getUserInfo } from '@/features/accounts/helper';
import { getTokens } from '@/features/authentication/tokens.helper';
import { PullStateInstance, PullstateCore } from '@/pullstate.core';
import { Flex, Image, Title } from '@mantine/core';
import type { GetServerSidePropsContext, NextPage } from 'next';
import { useTranslations } from 'next-intl';
import Head from 'next/head';
import { setupPrivateApi } from '../api';

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const stateInstance = PullstateCore.instantiate({ ssr: true });
  const api = setupPrivateApi(ctx);

  try {
    const authTokens = getTokens(ctx);
    if (authTokens?.access) {
      await getUserInfo(stateInstance, api);
    }
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
    console.error(e);
  }
};

interface ExchangeProps {
  snapshot: PullStateInstance;
}

const Exchange: NextPage<ExchangeProps> = ({ snapshot }) => {
  const instance = PullstateCore.instantiate({ hydrateSnapshot: snapshot });
  const t = useTranslations();

  return (
    <AuthenticatedAppLayout instance={instance}>
      <Head>
        <title>
          {t('header.navigation.homepage')} | {t('appName')}
        </title>
        <meta name="description" content="Aouis Homepage" />
      </Head>
      <Flex direction={'column'} align={'center'} gap={'xl'} p={'xl'}>
        <Title ta={'center'}>Page en construction, revenez plus tard...</Title>
        <Image mt={'xl'} src="assets/exchange.svg" w={'80%'} maw={700} />
      </Flex>
    </AuthenticatedAppLayout>
  );
};

export default Exchange;
