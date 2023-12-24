import { BackLinkButton } from '@/common/BackLinkButton';
import DisplayName from '@/common/DisplayName';
import { Carousel } from '@mantine/carousel';
import {
  ActionIcon,
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
import { IconHeart, IconMail, IconPhone } from '@tabler/icons-react';
import classes from '../carousel.module.css';
import { ProductStore } from '../store';
import { PaymentType } from '../types/Product';
import { conditionIcon } from '../variables/Conditions';
import { paymentType } from '../variables/PaymentType';

export const ProductDetailsPage = () => {
  const product = ProductStore.useState((s) => s.product);

  if (!product) {
    return <Text fs={'italic'}>Produit indisponible</Text>;
  }

  const handleLike = () => {
    // TODO hande like
  };

  return (
    <>
      <BackLinkButton />
      <Group align="start" p={32}>
        {/* Product Overview */}
        <Paper
          shadow="sm"
          radius="md"
          withBorder
          w={'70%'}
          style={{ overflow: 'hidden' }}
        >
          <Carousel
            classNames={classes}
            withIndicators
            height={400}
            slideGap="md"
            align="start"
            breakpoints={[
              { maxWidth: 'md', slideSize: '50%' },
              { maxWidth: 'sm', slideSize: '100%', slideGap: 0 },
            ]}
          >
            {product.images.map((image, index) => (
              <>
                <Carousel.Slide key={index}>
                  {/* TODO Aspect Ratio */}
                  <Image
                    src={image}
                    height={400}
                    radius="sm"
                    alt={product.title + '-image' + index}
                  />
                </Carousel.Slide>
                <ActionIcon
                  bg={'white'}
                  pos={'absolute'}
                  w={40}
                  h={40}
                  top={10}
                  right={28}
                  p={4}
                  style={{
                    borderRadius: '50%',
                    transition: 'color 0.3s ease',
                    '&:hover': { color: 'red', animation: 'enlarge 0.3s ease' },
                  }}
                  onClick={handleLike}
                >
                  <IconHeart />
                </ActionIcon>
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
