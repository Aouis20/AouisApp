import { Carousel } from '@mantine/carousel';
import { Blockquote, Image, createStyles, getStylesRef } from '@mantine/core';
import Autoplay from 'embla-carousel-autoplay';
import router from 'next/router';
import { useRef } from 'react';

const useStyles = createStyles(() => ({
  controls: {
    ref: getStylesRef('controls'),
    transition: 'opacity 150ms ease',
    opacity: 0,
  },
}));

const LeftPanel = () => {
  const autoplay = useRef(Autoplay({ delay: 5000 }));
  const { classes } = useStyles();

  return (
    <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
      <div className="absolute inset-0 bg-indigo-600" />
      <Image
        sx={{ cursor: 'pointer' }}
        alt={'logo'}
        src={'/logo.png'}
        width={150}
        onClick={() => router.reload()}
      />
      <Image src={'/assets/aouis-pros.svg'} />
      <div className="relative z-20 mt-auto">
        <Carousel loop classNames={classes} plugins={[autoplay.current]}>
          <Carousel.Slide>
            <Blockquote c={'white'} cite="– Juliet Schor">
              En échangeant, nous comblons les lacunes de nos possessions et
              élargissons nos horizons
            </Blockquote>
          </Carousel.Slide>
          <Carousel.Slide>
            <Blockquote c={'white'} cite="– Michael Phillips">
              Dans l'échange, chaque partie trouve de la valeur dans ce qu'elle
              reçoit et dans ce qu'elle donne.
            </Blockquote>
          </Carousel.Slide>
          <Carousel.Slide>
            <Blockquote c={'white'} cite="– Lailah Gifty Akita">
              L'échange mutuel conduit à l'enrichissement mutuel.
            </Blockquote>
          </Carousel.Slide>
        </Carousel>
      </div>
    </div>
  );
};

export default LeftPanel;
