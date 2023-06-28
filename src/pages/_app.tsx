import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider, createEmotionCache } from "@mantine/core";
import "../i18n";
import '../styles/globals.css'
import theme from "../theme";
import { Notifications } from "@mantine/notifications";


export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  const emotionCache = createEmotionCache({
    key: 'mantine',
    prepend: false
  });

  return (
    <>
      <Head>
        <title>Page title</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={theme}
        emotionCache={emotionCache}
      >
        <Notifications />
        <Component {...pageProps} />
      </MantineProvider>
    </>
  );
}

