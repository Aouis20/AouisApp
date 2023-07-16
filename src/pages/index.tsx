import { Container, Text } from "@mantine/core";
import { HTTPError } from 'ky-universal';
import type { GetServerSidePropsContext, NextPage } from 'next';
import Head from 'next/head';
import { HeaderSection } from "../common/Header";
import { redirectToLoginProps } from '../features/authentication/redirect.helper';
import { AuthenticatedAppLayout } from '../common/AuthenticatedAppLayout';
import { setupPrivateApi } from '../features/api';
import { PullStateInstance, PullstateCore } from '../pullstate.core';
import { getUserInfo } from "../features/accounts/account.helper";
import { User } from "../features/api/account.api";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const stateInstance = PullstateCore.instantiate({ ssr: true });
  const api = setupPrivateApi(ctx);

  try {
    await getUserInfo(stateInstance, api);

    return { props: { snapshot: stateInstance.getPullstateSnapshot() } };
  } catch (e) {
    const error = e as HTTPError;
    if (error.response?.status === 401) {
      return redirectToLoginProps();
    }

    return { props: {} };
  }
};

interface HomePageProps {
  snapshot: PullStateInstance;
}

const Home: NextPage<HomePageProps> = ({ snapshot }) => {
  const instance = PullstateCore.instantiate({ hydrateSnapshot: snapshot });
  const user = instance?.stores?.AccountStore.useState((s) => s.user) as User;
  console.log(user)

  return (
    <AuthenticatedAppLayout instance={instance}>
      <Head>
        <title>Aouis oui</title>
        <meta name="description" content="Aouis content" />
      </Head>

      <>
        <Container size={"2xl"}>
          <Text>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reprehenderit, iste asperiores! Placeat repudiandae, incidunt laborum quae amet dignissimos quod illum ullam odit eos veritatis nesciunt perferendis eveniet ea animi ipsa.
            Beatae quia sint facilis molestias expedita rem harum mollitia, tempore ex nesciunt perspiciatis dicta sapiente quibusdam error unde corrupti aspernatur nostrum hic perferendis ab exercitationem reiciendis magni? Obcaecati, dicta enim?
          </Text>
        </Container>
      </>
    </AuthenticatedAppLayout>
  );
};

export default Home;
