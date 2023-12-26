import theme from '@/theme';
import '@mantine/carousel/styles.css';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { Notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';
import { NextIntlClientProvider } from 'next-intl';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import 'tailwindcss/tailwind.css';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Aouis</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <NextIntlClientProvider
        locale={router.locale}
        timeZone="Europe/Paris"
        messages={pageProps.messages}
      >
        <MantineProvider theme={theme}>
          <Notifications />
          <Component {...pageProps} />
        </MantineProvider>
      </NextIntlClientProvider>
    </>
  );
}
