import { ColorSchemeScript } from '@mantine/core';
import Document, { Head, Html, Main, NextScript } from 'next/document';

export default class _Document extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:400,700|Work+Sans:400,600,700&display=swap"
          />
          <ColorSchemeScript defaultColorScheme="light" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
