import { BackLinkButton } from '@/common/BackLinkButton';
import { DisplayName } from '@/common/DisplayName';
import { Carousel } from '@mantine/carousel';
import {
  Anchor,
  Avatar,
  Badge,
  Box,
  Button,
  Flex,
  Group,
  Image,
  Paper,
  Rating,
  Text,
  Title,
} from '@mantine/core';
import { useHover, useMediaQuery } from '@mantine/hooks';
import { IconMail, IconPhone } from '@tabler/icons-react';
import { ProductStore } from '../store';
import { PaymentType } from '../types/Product';
import { conditionIcon } from '../variables/Conditions';
import { paymentType } from '../variables/PaymentType';
import { LikeButton } from './LikeButton';

export const ProductDetailsPage = () => {
  const product = ProductStore.useState((s) => s.product);
  const { hovered, ref } = useHover();
  const matches = useMediaQuery('(min-width: 1160px)');
  const matchesMD = useMediaQuery('(min-width: 900px)');
  const matchesSM = useMediaQuery('(min-width: 700px)');

  if (!product) {
    return <Text fs={'italic'}>Produit indisponible</Text>;
  }

  return (
    <>
      <Box ml={'xl'}>
        <BackLinkButton />
      </Box>
      <Group align="start" p={32} wrap={'wrap'}>
        {/* Product Overview */}
        <Paper
          shadow="sm"
          radius="md"
          withBorder
          w={matches ? '68%' : 'auto'}
          pos={'relative'}
          ref={ref}
          style={{ overflow: 'hidden' }}
        >
          <>
            <Carousel
              withIndicators
              height={400}
              align="start"
              slideSize={
                product.images.length >= 3
                  ? matchesMD
                    ? '33.333333%'
                    : matchesSM
                    ? '50%'
                    : '100%'
                  : '50%'
              }
              slideGap="md"
              loop
              slidesToScroll={
                product.images.length >= 3
                  ? matchesMD
                    ? 3
                    : matchesSM
                    ? 2
                    : 1
                  : 1
              }
              controlSize={32}
              style={{ backgroundColor: '#F6F6F6' }}
            >
              {product.images.map((image, index) => (
                <Carousel.Slide key={index}>
                  <Image
                    src={image.image}
                    height={400}
                    radius="sm"
                    alt={product.title + '-image' + index}
                  />
                </Carousel.Slide>
              ))}
            </Carousel>
            <LikeButton product={product} hovered={hovered} />
          </>

          <Flex w={'100%'} p={20} direction={'column'} gap={'xl'}>
            {/* Badges */}
            <Group style={{ justifyContent: 'end' }}>
              <Badge color="yellow" fz={'md'}>
                Others
              </Badge>
              <Badge
                color="secondary.4"
                fz={14}
                rightSection={conditionIcon[product.condition]}
              >
                {product.condition}
              </Badge>
              <Badge fz={'md'}>
                {product.price}€
                {product.payment_type != PaymentType.UNIQ &&
                  paymentType[product.payment_type]}
              </Badge>
            </Group>
            <Group justify="space-between">
              <Title order={2}>{product.title}</Title>
            </Group>
            <Box>
              <Title order={2}>Description</Title>
              <Text>
                {product.description
                  ? product.description
                  : "Aucune description n'a été renseigné"}
              </Text>
            </Box>
          </Flex>
        </Paper>

        <Flex direction={'column'} gap={'xl'}>
          {/* Owner preview */}
          <Paper shadow="sm" radius="md" p="lg" withBorder>
            <Group>
              <Avatar size={'3.5rem'} radius="xl" />
              <Flex direction={'column'} gap={4}>
                <>
                  <Title order={3}>
                    <DisplayName user={product.owner} />
                  </Title>
                  <Anchor>6 annonces</Anchor>
                </>
              </Flex>
            </Group>
            <Rating
              w={'100%'}
              mt={'sm'}
              style={{ justifyContent: 'end' }}
              size={'md'}
              value={2.5}
              fractions={3}
              readOnly
            />
            <Group mt={20}>
              <Button leftSection={<IconPhone />} radius={'md'}>
                Téléphone
              </Button>
              <Button leftSection={<IconMail />} radius={'md'}>
                Message
              </Button>
            </Group>
          </Paper>

          {/* Localization */}
          <Paper shadow="sm" radius="md" p="lg" withBorder>
            95
            {/* TODO add map preview and distance */}
          </Paper>
        </Flex>
      </Group>
    </>
  );
};
