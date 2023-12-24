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
import { useHover } from '@mantine/hooks';
import { IconMail, IconPhone } from '@tabler/icons-react';
import { ProductStore } from '../store';
import { PaymentType } from '../types/Product';
import { conditionIcon } from '../variables/Conditions';
import { paymentType } from '../variables/PaymentType';
import { LikeButton } from './LikeButton';

export const ProductDetailsPage = () => {
  const product = ProductStore.useState((s) => s.product);
  const { hovered, ref } = useHover();

  if (!product) {
    return <Text fs={'italic'}>Produit indisponible</Text>;
  }

  return (
    <>
      <Box ml={'xl'}>
        <BackLinkButton />
      </Box>
      <Group align="start" p={32}>
        {/* Product Overview */}
        <Paper
          shadow="sm"
          radius="md"
          withBorder
          w={'70%'}
          style={{ overflow: 'hidden' }}
        >
          <Carousel withIndicators height={400} slideGap="md" align="start">
            {product.images.map((image, index) => (
              <>
                <Carousel.Slide key={index} ref={ref}>
                  {/* TODO Aspect Ratio */}
                  <Image
                    src={image}
                    height={400}
                    radius="sm"
                    alt={product.title + '-image' + index}
                  />
                </Carousel.Slide>
                <LikeButton product={product} hovered={hovered} />
              </>
            ))}
          </Carousel>

          <Flex w={'100%'} p={20} direction={'column'} gap={20}>
            <>
              <Group style={{ justifyContent: 'end' }}>
                <Badge color="yellow">Others</Badge>
                <Badge color="pink" fz={12}>
                  <Group>
                    {product.condition} {conditionIcon[product.condition]}
                  </Group>
                </Badge>
                <Badge fz={'md'}>
                  {product.price}€
                  {product.payment_type != PaymentType.UNIQ &&
                    paymentType[product.payment_type]}
                </Badge>
              </Group>
              <Group justify="space-between">
                <Title>{product.title}</Title>
              </Group>
            </>
            <Box>
              <Text c={'gray'}>Description</Text>
              <Text>{product.description}</Text>
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
